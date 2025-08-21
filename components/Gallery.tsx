"use client";

import { useState } from "react";

interface GalleryItem {
	id: number;
	title: string;
	category: string;
	url: string;
	isVideo?: boolean;
}

export default function Gallery() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [activeFilter, setActiveFilter] = useState<string>("all");

	// Our actual wedding and engagement photos and videos
	const images: GalleryItem[] = [
		{
			id: 1,
			title: "Beautiful Moments",
			category: "engagement",
			url: "/photos/1 (1).JPG",
		},
		{
			id: 2,
			title: "Our Love Story",
			category: "memories",
			url: "/photos/1 (2).JPG",
		},
		{
			id: 3,
			title: "Together Forever",
			category: "engagement",
			url: "/photos/1 (3).jpg",
		},
		{
			id: 4,
			title: "Perfect Day",
			category: "memories",
			url: "/photos/1 (4).jpg",
		},
		{
			id: 5,
			title: "Sweet Memories",
			category: "memories",
			url: "/photos/1 (5).JPG",
		},
		{
			id: 6,
			title: "Happy Times",
			category: "engagement",
			url: "/photos/1 (6).JPG",
		},
		{
			id: 7,
			title: "Precious Moments",
			category: "memories",
			url: "/photos/1 (7).JPG",
		},
		{
			id: 8,
			title: "Love & Joy",
			category: "engagement",
			url: "/photos/1 (8).JPG",
		},
		{
			id: 9,
			title: "Celebration",
			category: "memories",
			url: "/photos/1 (9).JPG",
		},
		{
			id: 10,
			title: "Blissful Day",
			category: "engagement",
			url: "/photos/1 (10).JPG",
		},
		{
			id: 11,
			title: "Special Moments",
			category: "memories",
			url: "/photos/1 (11).jpg",
		},
		{
			id: 12,
			title: "Pure Happiness",
			category: "engagement",
			url: "/photos/1 (12).jpg",
		},
		{
			id: 13,
			title: "Cherished Times",
			category: "memories",
			url: "/photos/1 (13).jpg",
		},
		{
			id: 14,
			title: "Wedding Dreams",
			category: "engagement",
			url: "/photos/1 (14).JPG",
		},
		{
			id: 15,
			title: "Forever Love",
			category: "memories",
			url: "/photos/1 (15).JPG",
		},
		{
			id: 16,
			title: "Romantic Moments",
			category: "engagement",
			url: "/photos/1 (16).jpg",
		},
		{
			id: 17,
			title: "Beautiful Memories",
			category: "memories",
			url: "/photos/1 (17).JPG",
		},
		{
			id: 18,
			title: "Wedding Journey",
			category: "engagement",
			url: "/photos/1 (18).jpg",
		},
		{
			id: 19,
			title: "Love Story",
			category: "memories",
			url: "/photos/1 (19).jpg",
		},
		{
			id: 20,
			title: "Beautiful Memories Video",
			category: "videos",
			url: "/videos/1 (2).MOV",
			isVideo: true,
		},
		{
			id: 21,
			title: "Special Moments Video",
			category: "videos",
			url: "/videos/1 (1).MOV",
			isVideo: true,
		},
	];

	const openModal = (imageId: number) => {
		setSelectedImage(imageId);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	const nextImage = () => {
		if (selectedImage) {
			const currentIndex = images.findIndex((img) => img.id === selectedImage);
			const nextIndex = (currentIndex + 1) % images.length;
			setSelectedImage(images[nextIndex].id);
		}
	};

	const prevImage = () => {
		if (selectedImage) {
			const currentIndex = images.findIndex((img) => img.id === selectedImage);
			const prevIndex = (currentIndex - 1 + images.length) % images.length;
			setSelectedImage(images[prevIndex].id);
		}
	};

	const filteredImages =
		activeFilter === "all"
			? images
			: images.filter((image) => image.category === activeFilter);

	return (
		<section
			id="gallery"
			className="py-20 bg-gradient-to-br from-light-sage via-cream to-warm-beige"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl sm:text-5xl font-bold text-forest-green mb-4">
						Our Gallery
					</h2>
					<p className="text-xl text-sage-green max-w-3xl mx-auto mb-8">
						Capturing moments of our journey together
					</p>

					{/* Filter Buttons */}
					<div className="flex flex-wrap justify-center gap-4 mb-8">
						{["all", "engagement", "memories", "videos"].map((filter) => (
							<button
								key={filter}
								onClick={() => setActiveFilter(filter)}
								className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									activeFilter === filter
										? "bg-forest-green text-white shadow-lg"
										: "bg-white text-sage-green hover:bg-light-sage border border-sage-green"
								}`}
							>
								{filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						))}
					</div>
				</div>

				{/* Masonry-style Gallery Grid */}
				<div className="columns-2 md:columns-3 lg:columns-4 gap-6">
					{filteredImages.map((image, index) => (
						<div
							key={image.id}
							className={`relative mb-6 break-inside-avoid cursor-pointer group ${
								index % 7 === 0 || index % 7 === 3
									? "aspect-[3/4]"
									: index % 7 === 1 || index % 7 === 5
									? "aspect-square"
									: "aspect-[4/3]"
							}`}
							onClick={() => openModal(image.id)}
						>
							{/* Display image or video thumbnail */}
							{image.isVideo ? (
								<video
									src={image.url}
									className="w-full h-full object-cover rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105"
									muted
									playsInline
									poster={`${image.url}#t=0.1`}
								/>
							) : (
								<img
									src={image.url}
									alt={image.title}
									className="w-full h-full object-cover rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105"
								/>
							)}

							{/* Video play icon overlay */}
							{image.isVideo && (
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="bg-white/80 rounded-full p-3 shadow-lg">
										<svg
											className="w-8 h-8 text-forest-green"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M8 5v14l11-7z" />
										</svg>
									</div>
								</div>
							)}

							{/* Subtle overlay on hover */}
							<div className="absolute inset-0 bg-forest-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
								<div className="text-warm-white text-center">
									<svg
										className="w-8 h-8 mx-auto mb-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d={
												image.isVideo
													? "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1"
													: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											}
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
									<p className="text-sm font-medium">{image.title}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Modal */}
				{selectedImage && (
					<div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
						<div className="relative max-w-4xl max-h-[90vh] w-full">
							{/* Close button */}
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>

							{/* Navigation buttons */}
							<button
								onClick={prevImage}
								className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>

							<button
								onClick={nextImage}
								className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>

							{/* Image or Video */}
							<div className="w-full h-full flex items-center justify-center">
								{(() => {
									const imageIndex = images.findIndex(
										(img) => img.id === selectedImage
									);
									const image = images[imageIndex];
									return image.isVideo ? (
										<video
											src={image.url}
											controls
											className="w-full max-w-4xl max-h-[80vh] object-contain rounded-lg shadow-soft-green"
											autoPlay
											muted
										/>
									) : (
										<img
											src={image.url}
											alt={image.title}
											className="w-full max-w-4xl max-h-[80vh] object-contain rounded-lg shadow-soft-green"
										/>
									);
								})()}
							</div>

							{/* Image title */}
							<div className="absolute bottom-4 left-4 right-4 text-center">
								<h3 className="text-white text-xl font-semibold">
									{images.find((img) => img.id === selectedImage)?.title}
								</h3>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
