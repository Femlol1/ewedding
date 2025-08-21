"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { UploadButton } from "@/lib/uploadthing";

interface GalleryImage {
	id: string;
	url: string;
	name: string;
	size: number;
	uploadedAt: number;
	createdAt: string;
}

const Gallery = () => {
	const [images, setImages] = useState<GalleryImage[]>([]);
	const [isCarouselOpen, setIsCarouselOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	const [showAdminToggle, setShowAdminToggle] = useState(false);

	// Simple admin toggle - you can replace this with your actual auth logic
	useEffect(() => {
		// Check if user clicked 5 times on the title to enable admin mode
		let clickCount = 0;
		const handleAdminToggle = () => {
			clickCount++;
			if (clickCount >= 5) {
				setShowAdminToggle(true);
				clickCount = 0;
			}
		};

		// Add event listener to the document for admin toggle
		const adminToggleElement = document.getElementById('gallery-title');
		adminToggleElement?.addEventListener('click', handleAdminToggle);

		return () => {
			adminToggleElement?.removeEventListener('click', handleAdminToggle);
		};
	}, []);

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

	const handleImageClick = (index: number): void => {
		setCurrentIndex(index);
		setIsCarouselOpen(true);
	};

	const closeCarousel = () => {
		setIsCarouselOpen(false);
	};

	const handleImageDelete = async (imageId: string) => {
		try {
			const res = await fetch(`/api/gallery/uploadthing?id=${imageId}`, {
				method: 'DELETE',
			});
			
			if (res.ok) {
				// Refresh the images list
				fetchImages();
			} else {
				console.error('Failed to delete image');
			}
		} catch (error) {
			console.error('Error deleting image:', error);
		}
	};

	interface OverlayClickEvent extends React.MouseEvent<HTMLDivElement> {
		currentTarget: EventTarget & HTMLDivElement;
	}

	const handleOverlayClick = (e: OverlayClickEvent): void => {
		if (e.target === e.currentTarget) {
			closeCarousel();
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-64">
				<div className="text-lg">Loading gallery...</div>
			</div>
		);
	}

	return (
		<div>
			{/* Admin Toggle */}
			{showAdminToggle && (
				<div className="mb-4 p-2 bg-gray-100 rounded">
					<label className="flex items-center">
						<input
							type="checkbox"
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
							className="mr-2"
						/>
						Admin Mode
					</label>
				</div>
			)}

			{/* Upload Section - Show only for admins */}
			{isAdmin && (
				<div className="mb-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
					<h3 className="text-lg font-semibold mb-4">Upload New Images</h3>
					<UploadButton
						endpoint="galleryUploader"
						onClientUploadComplete={(res) => {
							console.log("Files: ", res);
							// Refresh the gallery after upload
							fetchImages();
						}}
						onUploadError={(error: Error) => {
							alert(`ERROR! ${error.message}`);
						}}
						appearance={{
							button: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
							allowedContent: "text-sm text-gray-600",
						}}
					/>
				</div>
			)}

			{/* Image Grid */}
			{images.length === 0 ? (
				<div className="text-center py-8">
					<p className="text-gray-500">No images in the gallery yet.</p>
					{isAdmin && (
						<p className="text-sm text-gray-400 mt-2">
							Upload some images using the form above.
						</p>
					)}
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{images.map((image, index) => (
						<div
							key={image.id}
							className="relative w-full h-64 group"
						>
							<Image
								src={image.url}
								alt={image.name || `Gallery image ${index + 1}`}
								fill
								style={{ objectFit: "cover" }}
								className="rounded-lg cursor-pointer"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								onClick={() => handleImageClick(index)}
							/>
							{/* Delete button for admins */}
							{isAdmin && (
								<button
									onClick={(e) => {
										e.stopPropagation();
										if (confirm('Are you sure you want to delete this image?')) {
											handleImageDelete(image.id);
										}
									}}
									className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
									title="Delete image"
								>
									×
								</button>
							)}
						</div>
					))}
				</div>
			)}

			{/* Modal Overlay */}
			{isCarouselOpen && images.length > 0 && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-md"
					onClick={handleOverlayClick}
				>
					<div className="relative w-full max-w-4xl">
						<button
							className="absolute top-4 right-4 text-white text-2xl z-50"
							onClick={closeCarousel}
						>
							&times;
						</button>
						<ImageGallery
							items={images.map((image) => ({
								original: image.url,
								thumbnail: image.url,
							}))}
							startIndex={currentIndex}
							onSlide={(index) => setCurrentIndex(index)}
							showThumbnails
							showPlayButton
							showFullscreenButton
							thumbnailPosition="left"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Gallery;
