import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Gallery uploader - allows images for the wedding gallery
	galleryUploader: f({ image: { maxFileSize: "128MB", maxFileCount: 10 } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			// You can add authentication here if needed
			return { uploadedBy: "gallery" };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for gallery:", metadata.uploadedBy);
			console.log("File URL:", file.url);

			// Automatically save to Firestore
			try {
				const response = await fetch(
					`${
						process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
					}/api/gallery/uploadthing`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							url: file.url,
							name: file.name,
							size: file.size,
						}),
					}
				);

				if (!response.ok) {
					console.error("Failed to save image to Firestore");
				} else {
					console.log("Image saved to Firestore successfully");
				}
			} catch (error) {
				console.error("Error saving image to Firestore:", error);
			}

			return { url: file.url, uploadedBy: metadata.uploadedBy };
		}),

	// Header images uploader - allows images for page headers
	headerUploader: f({ image: { maxFileSize: "32MB", maxFileCount: 1 } })
		.middleware(async ({ req }) => {
			return { uploadedBy: "headers" };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for header:", metadata.uploadedBy);
			console.log("File URL:", file.url);

			// Note: We don't automatically save header images to Firestore here
			// The admin page will handle the saving with the correct pageId
			return { url: file.url, uploadedBy: metadata.uploadedBy };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
