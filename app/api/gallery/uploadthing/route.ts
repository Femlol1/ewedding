import {
	addDoc,
	collection,
	db,
	deleteDoc,
	doc,
	getDocs,
} from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

interface GalleryImage {
	id: string;
	url: string;
	name: string;
	size: number;
	uploadedAt: number;
	createdAt: string;
}

// GET - Fetch all gallery images from Firestore
export async function GET() {
	try {
		const galleryCollection = collection(db, "gallery");
		const gallerySnapshot = await getDocs(galleryCollection);

		const images: GalleryImage[] = gallerySnapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<GalleryImage, "id">),
		}));

		// Sort by upload date (newest first)
		images.sort((a, b) => b.uploadedAt - a.uploadedAt);

		return NextResponse.json(images);
	} catch (error) {
		console.error("Failed to fetch gallery images:", error);
		return NextResponse.json(
			{ error: "Failed to fetch gallery images." },
			{ status: 500 }
		);
	}
}

// POST - Add a new gallery image to Firestore
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { url, name, size } = body;

		if (!url) {
			return NextResponse.json(
				{ error: "Image URL is required." },
				{ status: 400 }
			);
		}

		const galleryCollection = collection(db, "gallery");
		const docRef = await addDoc(galleryCollection, {
			url,
			name: name || "Untitled",
			size: size || 0,
			uploadedAt: Date.now(),
			createdAt: new Date().toISOString(),
		});

		return NextResponse.json({
			id: docRef.id,
			message: "Image added to gallery successfully.",
		});
	} catch (error) {
		console.error("Failed to add image to gallery:", error);
		return NextResponse.json(
			{ error: "Failed to add image to gallery." },
			{ status: 500 }
		);
	}
}

// DELETE - Remove an image from the gallery
export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Image ID is required." },
				{ status: 400 }
			);
		}

		const docRef = doc(db, "gallery", id);
		await deleteDoc(docRef);

		return NextResponse.json({
			message: "Image removed from gallery successfully.",
		});
	} catch (error) {
		console.error("Failed to remove image from gallery:", error);
		return NextResponse.json(
			{ error: "Failed to remove image from gallery." },
			{ status: 500 }
		);
	}
}
