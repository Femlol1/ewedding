"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import { Check, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeaderImage {
	id: string;
	url: string;
	name: string;
	size: number;
	pageId: string;
	isActive: boolean;
	uploadedAt: number;
	createdAt: string;
}

const pageOptions = [
	{ id: "home", label: "Home Page" },
	{ id: "guest", label: "Guest Page" },
	{ id: "faq", label: "FAQ Page" },
	{ id: "events", label: "Events Page" },
	{ id: "gallery", label: "Gallery Page" },
	{ id: "story", label: "Story Page" },
	{ id: "gifts", label: "Gifts Page" },
	{ id: "travel", label: "Travel Page" },
	{ id: "rsvp", label: "RSVP Page" },
];

export default function HeadersAdmin() {
	const [headerImages, setHeaderImages] = useState<HeaderImage[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedPage, setSelectedPage] = useState<string>("home");
	const [uploadingPage, setUploadingPage] = useState<string>("");
	const [uploadPageContext, setUploadPageContext] = useState<string>("");

	useEffect(() => {
		fetchHeaderImages();
	}, []);

	const fetchHeaderImages = async () => {
		try {
			const response = await fetch("/api/headers");
			if (response.ok) {
				const images = await response.json();
				setHeaderImages(images);
			}
		} catch (error) {
			console.error("Failed to fetch header images:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSetActive = async (imageId: string, pageId: string) => {
		try {
			const response = await fetch("/api/headers", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: imageId,
					pageId: pageId,
					isActive: true,
				}),
			});

			if (response.ok) {
				await fetchHeaderImages();
			}
		} catch (error) {
			console.error("Failed to set active image:", error);
		}
	};

	const handleDelete = async (imageId: string) => {
		if (!confirm("Are you sure you want to delete this header image?")) {
			return;
		}

		try {
			const response = await fetch(`/api/headers?id=${imageId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				await fetchHeaderImages();
			}
		} catch (error) {
			console.error("Failed to delete image:", error);
		}
	};

	const handleUploadComplete = async (res: any, pageId: string) => {
		console.log("Upload complete with result:", res);
		console.log("Received pageId parameter:", pageId);
		console.log("Current uploadingPage:", uploadingPage);
		console.log("Current uploadPageContext:", uploadPageContext);
		console.log("Full response object:", JSON.stringify(res, null, 2));

		// Use the passed pageId as the primary source of truth
		const finalPageId = pageId || uploadPageContext || uploadingPage;

		// The upload is handled by UploadThing core, but we need to update the pageId
		if (res && res[0]) {
			try {
				const file = res[0];
				console.log("Processing file:", JSON.stringify(file, null, 2));

				const uploadData = {
					url: file.ufsUrl || file.url || file.fileUrl,
					name: file.name || file.fileName || "Header Image",
					size: file.size || file.fileSize || 0,
					pageId: finalPageId,
					isActive: false,
				};

				console.log("Sending to API:", uploadData);
				console.log("Required fields check:");
				console.log("- url:", uploadData.url);
				console.log("- name:", uploadData.name);
				console.log("- size:", uploadData.size);
				console.log("- pageId:", uploadData.pageId);

				// Validate required fields
				if (!uploadData.url) {
					console.error("Missing URL in upload data");
					alert("Upload failed: Missing file URL");
					return;
				}
				if (!uploadData.pageId) {
					console.error("Missing pageId in upload data");
					alert("Upload failed: Missing page ID");
					return;
				}

				// Update the uploaded image with the correct pageId
				const response = await fetch("/api/headers", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(uploadData),
				});

				if (response.ok) {
					console.log("Successfully saved to headers API");
					await fetchHeaderImages();
					// Set the new image as active
					const newImageResponse = await response.json();
					await handleSetActive(newImageResponse.id, finalPageId);
				} else {
					const errorData = await response.text();
					console.error("API Error:", response.status, errorData);
					alert(`Failed to save header image: ${errorData}`);
				}
			} catch (error) {
				console.error("Failed to process uploaded image:", error);
				alert(`Failed to process uploaded image: ${error}`);
			} finally {
				setUploadingPage("");
				setUploadPageContext("");
			}
		} else {
			console.error("No upload result received:", res);
			setUploadingPage("");
			setUploadPageContext("");
		}
	};

	const getImagesForPage = (pageId: string) => {
		return headerImages.filter((img) => img.pageId === pageId);
	};

	const getActiveImageForPage = (pageId: string) => {
		return headerImages.find((img) => img.pageId === pageId && img.isActive);
	};

	if (loading) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center">Loading header images...</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Header Images Management</h1>
				<p className="text-gray-600">
					Manage header images for different pages
				</p>
			</div>

			<div className="grid gap-6">
				{pageOptions.map((page) => {
					const pageImages = getImagesForPage(page.id);
					const activeImage = getActiveImageForPage(page.id);

					return (
						<Card key={page.id} className="w-full">
							<CardHeader>
								<div className="flex justify-between items-center">
									<div>
										<CardTitle className="flex items-center gap-2">
											{page.label}
											{activeImage && (
												<Badge variant="default" className="bg-green-500">
													Active
												</Badge>
											)}
										</CardTitle>
										<p className="text-sm text-gray-500 mt-1">
											{pageImages.length} image(s) uploaded
										</p>
									</div>
									<div className="flex flex-col gap-2">
										{/* Primary UploadThing Button */}
										<div className="upload-button-container">
											<UploadButton
												endpoint="headerUploader"
												onClientUploadComplete={(res) => {
													console.log("Header upload complete:", res);
													handleUploadComplete(res, page.id);
												}}
												onUploadError={(error: Error) => {
													console.error("Upload error:", error);
													alert(`Upload failed: ${error.message}`);
													setUploadingPage("");
													setUploadPageContext("");
												}}
												onUploadBegin={() => {
													console.log("Upload started for page:", page.id);
													setUploadingPage(page.id);
													setUploadPageContext(page.id);
												}}
												appearance={{
													button:
														"bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm min-w-[120px] cursor-pointer",
													allowedContent: "text-xs text-gray-500 mt-1",
												}}
												content={{
													button:
														uploadingPage === page.id
															? "Uploading..."
															: "📷 Upload Header",
													allowedContent: "JPG, PNG up to 32MB",
												}}
											/>
										</div>

										{uploadingPage === page.id && (
											<div className="text-xs text-blue-600 animate-pulse">
												⏳ Uploading header for {page.label}...
											</div>
										)}

										{/* Debug info */}
										<div className="text-xs text-gray-400">
											Endpoint: headerUploader | Page: {page.id}
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								{activeImage && (
									<div className="mb-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
										<p className="text-sm font-medium text-green-800 mb-2">
											Current Active Header:
										</p>
										<div className="relative w-full h-32 rounded-lg overflow-hidden">
											<Image
												src={activeImage.url}
												alt={`Active header for ${page.label}`}
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
										<p className="text-xs text-green-700 mt-2">
											{activeImage.name}
										</p>
									</div>
								)}

								{pageImages.length === 0 ? (
									<p className="text-gray-500 text-center py-4">
										No header images uploaded for this page yet.
									</p>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{pageImages.map((image) => (
											<div
												key={image.id}
												className={`relative border rounded-lg overflow-hidden ${
													image.isActive
														? "border-green-500 border-2"
														: "border-gray-200"
												}`}
											>
												<div className="relative w-full h-32">
													<Image
														src={image.url}
														alt={image.name}
														fill
														style={{ objectFit: "cover" }}
													/>
													{image.isActive && (
														<div className="absolute top-2 right-2">
															<Badge variant="default" className="bg-green-500">
																<Check className="w-3 h-3" />
															</Badge>
														</div>
													)}
												</div>
												<div className="p-3">
													<p
														className="text-sm font-medium truncate"
														title={image.name}
													>
														{image.name}
													</p>
													<p className="text-xs text-gray-500">
														{(image.size / 1024 / 1024).toFixed(2)} MB
													</p>
													<div className="flex gap-2 mt-2">
														{!image.isActive && (
															<Button
																size="sm"
																variant="outline"
																onClick={() =>
																	handleSetActive(image.id, page.id)
																}
																className="text-xs"
															>
																<Check className="w-3 h-3 mr-1" />
																Set Active
															</Button>
														)}
														<Button
															size="sm"
															variant="destructive"
															onClick={() => handleDelete(image.id)}
															className="text-xs"
														>
															<Trash2 className="w-3 h-3 mr-1" />
															Delete
														</Button>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
