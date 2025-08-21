import { db } from "@/lib/firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

interface HeaderImage {
	id: string;
	url: string;
	name: string;
	size: number;
	pageId: string; // e.g., 'home', 'guest', 'faq', 'events', etc.
	isActive: boolean;
	uploadedAt: number;
	createdAt: string;
}

// GET - Fetch all header images from Firestore
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const pageId = searchParams.get("pageId");

		const headersCollection = collection(db, "headers");
		const headersSnapshot = await getDocs(headersCollection);

		let images: HeaderImage[] = headersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<HeaderImage, "id">),
		}));

		// Filter by pageId if provided
		if (pageId) {
			images = images.filter((img) => img.pageId === pageId);
		}

		// Sort by upload date (newest first)
		images.sort((a, b) => b.uploadedAt - a.uploadedAt);

		return NextResponse.json(images);
	} catch (error) {
		console.error("Failed to fetch header images:", error);
		return NextResponse.json(
			{ error: "Failed to fetch header images." },
			{ status: 500 }
		);
	}
}

// POST - Add a new header image to Firestore
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { url, name, size, pageId, isActive = false } = body;

		if (!url || !name || !pageId) {
			return NextResponse.json(
				{ error: "Missing required fields: url, name, pageId" },
				{ status: 400 }
			);
		}

		const headerImage: Omit<HeaderImage, "id"> = {
			url,
			name,
			size: size || 0,
			pageId,
			isActive,
			uploadedAt: Date.now(),
			createdAt: new Date().toISOString(),
		};

		const headersCollection = collection(db, "headers");
		const docRef = await addDoc(headersCollection, headerImage);

		return NextResponse.json({
			id: docRef.id,
			...headerImage,
		});
	} catch (error) {
		console.error("Failed to add header image:", error);
		return NextResponse.json(
			{ error: "Failed to add header image." },
			{ status: 500 }
		);
	}
}

// PUT - Update header image (mainly for setting active status)
export async function PUT(req: NextRequest) {
	try {
		const body = await req.json();
		const { id, pageId, isActive } = body;

		if (!id || !pageId || typeof isActive !== "boolean") {
			return NextResponse.json(
				{ error: "Missing required fields: id, pageId, isActive" },
				{ status: 400 }
			);
		}

		// If setting this image as active, deactivate all other images for this page
		if (isActive) {
			const headersCollection = collection(db, "headers");
			const headersSnapshot = await getDocs(headersCollection);

			const updatePromises = headersSnapshot.docs
				.filter((doc) => {
					const data = doc.data();
					return data.pageId === pageId && doc.id !== id && data.isActive;
				})
				.map((doc) => updateDoc(doc.ref, { isActive: false }));

			await Promise.all(updatePromises);
		}

		// Update the selected image
		const imageRef = doc(db, "headers", id);
		await updateDoc(imageRef, { isActive });

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to update header image:", error);
		return NextResponse.json(
			{ error: "Failed to update header image." },
			{ status: 500 }
		);
	}
}

// DELETE - Remove a header image from Firestore
export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "Missing image ID" }, { status: 400 });
		}

		await deleteDoc(doc(db, "headers", id));
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to delete header image:", error);
		return NextResponse.json(
			{ error: "Failed to delete header image." },
			{ status: 500 }
		);
	}
}
