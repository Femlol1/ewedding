"use client";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiGrid, FiList, FiTrash2, FiUpload } from "react-icons/fi";

interface GalleryImage {
	id: string;
	url: string;
	name: string;
	size: number;
	uploadedAt: number;
	createdAt: string;
}

interface GalleryManagerProps {
	showUpload?: boolean;
	showBulkActions?: boolean;
	compact?: boolean;
}

export default function GalleryManager({
	showUpload = true,
	showBulkActions = true,
	compact = false,
}: GalleryManagerProps) {
	const [images, setImages] = useState<GalleryImage[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

	useEffect(() => {
		fetchImages();
	}, []);

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
		if (!confirm("Are you sure you want to delete this image?")) {
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

		if (!confirm(`Delete ${selectedImages.length} selected images?`)) {
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

	const sortedImages = [...images].sort((a, b) => {
		let comparison = 0;

		switch (sortBy) {
			case "name":
				comparison = a.name.localeCompare(b.name);
				break;
			case "size":
				comparison = a.size - b.size;
				break;
			case "date":
			default:
				comparison = a.uploadedAt - b.uploadedAt;
				break;
		}

		return sortOrder === "asc" ? comparison : -comparison;
	});

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
			<div className="flex justify-center items-center min-h-32">
				<div className="text-lg">Loading gallery...</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Upload Section */}
			{showUpload && (
				<div className="bg-gray-50 p-4 rounded-lg border">
					<h3 className="text-sm font-medium text-gray-900 mb-3">
						Upload Images
					</h3>
					<UploadButton
						endpoint="galleryUploader"
						onClientUploadComplete={(res) => {
							console.log("Files uploaded: ", res);
							fetchImages();
						}}
						onUploadError={(error: Error) => {
							alert(`Upload failed: ${error.message}`);
						}}
						appearance={{
							button: compact
								? "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
								: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md",
							allowedContent: "text-xs text-gray-600 mt-1",
						}}
					/>
				</div>
			)}

			{/* Controls */}
			<div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
				<div className="flex items-center space-x-4">
					{showBulkActions && (
						<>
							<button
								onClick={handleSelectAll}
								className="text-sm text-blue-600 hover:text-blue-700"
							>
								{selectedImages.length === images.length
									? "Deselect All"
									: "Select All"}
							</button>
							{selectedImages.length > 0 && (
								<button
									onClick={handleBulkDelete}
									className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center"
								>
									<FiTrash2 className="mr-1 w-3 h-3" />
									Delete ({selectedImages.length})
								</button>
							)}
						</>
					)}
				</div>

				<div className="flex items-center space-x-2">
					{/* Sort Controls */}
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as any)}
						className="text-sm border rounded px-2 py-1"
					>
						<option value="date">Sort by Date</option>
						<option value="name">Sort by Name</option>
						<option value="size">Sort by Size</option>
					</select>

					<button
						onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
						className="text-sm px-2 py-1 border rounded hover:bg-gray-50"
					>
						{sortOrder === "asc" ? "↑" : "↓"}
					</button>

					{/* View Mode */}
					<div className="flex border rounded">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-1 ${
								viewMode === "grid"
									? "bg-blue-600 text-white"
									: "hover:bg-gray-50"
							}`}
						>
							<FiGrid className="w-4 h-4" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-1 ${
								viewMode === "list"
									? "bg-blue-600 text-white"
									: "hover:bg-gray-50"
							}`}
						>
							<FiList className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Images Display */}
			{sortedImages.length === 0 ? (
				<div className="text-center py-8 bg-gray-50 rounded-lg border">
					<FiUpload className="mx-auto h-8 w-8 text-gray-400" />
					<p className="mt-2 text-sm text-gray-600">No images uploaded yet</p>
				</div>
			) : viewMode === "grid" ? (
				<div
					className={`grid gap-4 ${
						compact
							? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
							: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
					}`}
				>
					{sortedImages.map((image) => (
						<div
							key={image.id}
							className={`relative group border-2 rounded-lg overflow-hidden ${
								selectedImages.includes(image.id)
									? "border-blue-500 bg-blue-50"
									: "border-gray-200 hover:border-gray-300"
							}`}
						>
							{showBulkActions && (
								<div className="absolute top-2 left-2 z-10">
									<input
										type="checkbox"
										checked={selectedImages.includes(image.id)}
										onChange={() => handleSelectImage(image.id)}
										className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded"
									/>
								</div>
							)}

							<div className={`relative w-full ${compact ? "h-32" : "h-48"}`}>
								<Image
									src={image.url}
									alt={image.name}
									fill
									style={{ objectFit: "cover" }}
								/>
							</div>

							<div className="p-2 bg-white">
								<p className="text-xs font-medium text-gray-900 truncate">
									{image.name}
								</p>
								{!compact && (
									<>
										<p className="text-xs text-gray-500">
											{formatFileSize(image.size)}
										</p>
										<p className="text-xs text-gray-400">
											{formatDate(image.uploadedAt)}
										</p>
									</>
								)}
							</div>

							<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									onClick={() => handleImageDelete(image.id)}
									className="bg-white p-1 rounded shadow-sm hover:bg-gray-50"
									title="Delete"
								>
									<FiTrash2 className="w-3 h-3 text-red-600" />
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="bg-white rounded-lg border overflow-hidden">
					<div className="divide-y">
						{sortedImages.map((image) => (
							<div
								key={image.id}
								className={`flex items-center p-4 hover:bg-gray-50 ${
									selectedImages.includes(image.id) ? "bg-blue-50" : ""
								}`}
							>
								{showBulkActions && (
									<input
										type="checkbox"
										checked={selectedImages.includes(image.id)}
										onChange={() => handleSelectImage(image.id)}
										className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-4"
									/>
								)}

								<div className="relative w-16 h-16 flex-shrink-0">
									<Image
										src={image.url}
										alt={image.name}
										fill
										style={{ objectFit: "cover" }}
										className="rounded"
									/>
								</div>

								<div className="ml-4 flex-grow">
									<p className="font-medium text-gray-900">{image.name}</p>
									<p className="text-sm text-gray-500">
										{formatFileSize(image.size)} •{" "}
										{formatDate(image.uploadedAt)}
									</p>
								</div>

								<button
									onClick={() => handleImageDelete(image.id)}
									className="ml-4 text-red-600 hover:text-red-700 p-2"
									title="Delete"
								>
									<FiTrash2 className="w-4 h-4" />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
