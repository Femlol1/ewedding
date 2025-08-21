"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

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
			{/* Image Grid */}
			{images.length === 0 ? (
				<div className="text-center py-8">
					<p className="text-gray-500">No images in the gallery yet.</p>
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{images.map((image, index) => (
						<div key={image.id} className="relative w-full h-64 group">
							<Image
								src={image.url}
								alt={image.name || `Gallery image ${index + 1}`}
								fill
								style={{ objectFit: "cover" }}
								className="rounded-lg cursor-pointer"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								onClick={() => handleImageClick(index)}
							/>
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
