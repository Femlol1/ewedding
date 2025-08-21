import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
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

export async function GET(req: NextRequest) {
	try {
		// Directly fetch from Firestore instead of making internal API call
		const galleryCollection = collection(db, "gallery");
		const gallerySnapshot = await getDocs(galleryCollection);

		const images: GalleryImage[] = gallerySnapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<GalleryImage, "id">),
		}));

		// Sort by upload date (newest first)
		images.sort((a, b) => b.uploadedAt - a.uploadedAt);

		// Transform to URL array for backward compatibility
		const imageUrls = images.map((image) => image.url);

		return NextResponse.json(imageUrls);
	} catch (error) {
		console.error("Failed to fetch gallery images:", error);

		// Fallback to local images if Firestore fails
		try {
			const fs = require("fs");
			const path = require("path");
			const imagesDirectory = path.join(
				process.cwd(),
				"public/assets/images/wedding"
			);

			if (fs.existsSync(imagesDirectory)) {
				const filenames = fs.readdirSync(imagesDirectory);
				const images = filenames.map((name: string) =>
					encodeURI(`/assets/images/wedding/${name}`)
				);
				return NextResponse.json(images);
			} else {
				// Return empty array if no images found
				return NextResponse.json([]);
			}
		} catch (fallbackError) {
			console.error("Fallback also failed:", fallbackError);
			return NextResponse.json([]);
		}
	}
}
