"use client";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiDownload, FiEye, FiTrash2, FiUpload } from "react-icons/fi";

interface GalleryImage {
	id: string;
	url: string;
	name: string;
	size: number;
	uploadedAt: number;
	createdAt: string;
}

export default function GalleryAdminPage() {
	const [images, setImages] = useState<GalleryImage[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null);
	const [stats, setStats] = useState({
		totalImages: 0,
		totalSize: 0,
	});

	useEffect(() => {
		fetchImages();
	}, []);

	useEffect(() => {
		// Calculate stats whenever images change
		const totalSize = images.reduce((sum, image) => sum + image.size, 0);
		setStats({
			totalImages: images.length,
			totalSize,
		});
	}, [images]);

	const fetchImages = async () => {
		try {
			setIsLoading(true);
			const res = await fetch("/api/gallery/uploadthing");
			const images = await res.json();
			setImages(images);
		} catch (error) {
			console.error("Failed to fetch images:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageDelete = async (imageId: string) => {
		if (
			!confirm(
				"Are you sure you want to delete this image? This action cannot be undone."
			)
		) {
			return;
		}

		try {
			const res = await fetch(`/api/gallery/uploadthing?id=${imageId}`, {
				method: "DELETE",
			});

			if (res.ok) {
				setImages(images.filter((img) => img.id !== imageId));
				setSelectedImages(selectedImages.filter((id) => id !== imageId));
			} else {
				alert("Failed to delete image");
			}
		} catch (error) {
			console.error("Error deleting image:", error);
			alert("Error deleting image");
		}
	};

	const handleBulkDelete = async () => {
		if (selectedImages.length === 0) return;

		if (
			!confirm(
				`Are you sure you want to delete ${selectedImages.length} selected images? This action cannot be undone.`
			)
		) {
			return;
		}

		try {
			const deletePromises = selectedImages.map((imageId) =>
				fetch(`/api/gallery/uploadthing?id=${imageId}`, { method: "DELETE" })
			);

			await Promise.all(deletePromises);
			setImages(images.filter((img) => !selectedImages.includes(img.id)));
			setSelectedImages([]);
		} catch (error) {
			console.error("Error deleting images:", error);
			alert("Error deleting some images");
		}
	};

	const handleSelectImage = (imageId: string) => {
		setSelectedImages((prev) =>
			prev.includes(imageId)
				? prev.filter((id) => id !== imageId)
				: [...prev, imageId]
		);
	};

	const handleSelectAll = () => {
		if (selectedImages.length === images.length) {
			setSelectedImages([]);
		} else {
			setSelectedImages(images.map((img) => img.id));
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-64">
				<div className="text-lg">Loading gallery...</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Gallery Management
					</h1>
					<p className="text-gray-600 mt-1">
						Manage wedding photos and gallery content
					</p>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex items-center">
						<FiUpload className="h-8 w-8 text-blue-600" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Total Images</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.totalImages}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex items-center">
						<FiDownload className="h-8 w-8 text-green-600" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Total Size</p>
							<p className="text-2xl font-bold text-gray-900">
								{formatFileSize(stats.totalSize)}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex items-center">
						<FiEye className="h-8 w-8 text-purple-600" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Selected</p>
							<p className="text-2xl font-bold text-gray-900">
								{selectedImages.length}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Upload Section */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Upload New Images</h3>
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
					<UploadButton
						endpoint="galleryUploader"
						onClientUploadComplete={(res) => {
							console.log("Files uploaded: ", res);
							fetchImages(); // Refresh the gallery
						}}
						onUploadError={(error: Error) => {
							alert(`Upload failed: ${error.message}`);
						}}
						appearance={{
							button:
								"bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium",
							allowedContent: "text-sm text-gray-600 mt-2",
						}}
					/>
					<p className="text-sm text-gray-500 mt-2">
						Upload up to 10 images at once. Maximum file size: 4MB per image.
					</p>
				</div>
			</div>

			{/* Bulk Actions */}
			{images.length > 0 && (
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-4">
							<button
								onClick={handleSelectAll}
								className="text-sm text-blue-600 hover:text-blue-700 font-medium"
							>
								{selectedImages.length === images.length
									? "Deselect All"
									: "Select All"}
							</button>
							{selectedImages.length > 0 && (
								<span className="text-sm text-gray-600">
									{selectedImages.length} selected
								</span>
							)}
						</div>
						{selectedImages.length > 0 && (
							<button
								onClick={handleBulkDelete}
								className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
							>
								<FiTrash2 className="mr-2" />
								Delete Selected ({selectedImages.length})
							</button>
						)}
					</div>
				</div>
			)}

			{/* Images Grid */}
			{images.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-lg shadow-sm border">
					<FiUpload className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
					<p className="mt-1 text-sm text-gray-500">
						Upload some images to get started.
					</p>
				</div>
			) : (
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{images.map((image) => (
							<div
								key={image.id}
								className={`relative group border-2 rounded-lg overflow-hidden ${
									selectedImages.includes(image.id)
										? "border-blue-500 bg-blue-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
							>
								{/* Selection Checkbox */}
								<div className="absolute top-2 left-2 z-10">
									<input
										type="checkbox"
										checked={selectedImages.includes(image.id)}
										onChange={() => handleSelectImage(image.id)}
										className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
									/>
								</div>

								{/* Image */}
								<div className="relative w-full h-48">
									<Image
										src={image.url}
										alt={image.name}
										fill
										style={{ objectFit: "cover" }}
										className="cursor-pointer"
										onClick={() => setPreviewImage(image)}
									/>
								</div>

								{/* Image Info */}
								<div className="p-3 bg-white">
									<p className="text-sm font-medium text-gray-900 truncate">
										{image.name}
									</p>
									<p className="text-xs text-gray-500">
										{formatFileSize(image.size)}
									</p>
									<p className="text-xs text-gray-400">
										{formatDate(image.uploadedAt)}
									</p>
								</div>

								{/* Actions */}
								<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
									<div className="flex space-x-1">
										<button
											onClick={() => setPreviewImage(image)}
											className="bg-white p-1 rounded shadow-sm hover:bg-gray-50"
											title="Preview"
										>
											<FiEye className="w-4 h-4 text-gray-600" />
										</button>
										<button
											onClick={() => handleImageDelete(image.id)}
											className="bg-white p-1 rounded shadow-sm hover:bg-gray-50"
											title="Delete"
										>
											<FiTrash2 className="w-4 h-4 text-red-600" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Preview Modal */}
			{previewImage && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
					onClick={() => setPreviewImage(null)}
				>
					<div className="relative max-w-4xl max-h-full">
						<button
							onClick={() => setPreviewImage(null)}
							className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
						>
							×
						</button>
						<Image
							src={previewImage.url}
							alt={previewImage.name}
							width={800}
							height={600}
							style={{ objectFit: "contain" }}
							className="max-w-full max-h-full"
						/>
						<div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded">
							<p className="font-medium">{previewImage.name}</p>
							<p className="text-sm opacity-75">
								{formatFileSize(previewImage.size)} •{" "}
								{formatDate(previewImage.uploadedAt)}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
