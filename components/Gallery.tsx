"use client";

import { useState } from "react";

export default function Gallery() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);

	// Placeholder images - you can replace these with actual image URLs
	const images = [
		{ id: 1, title: "Engagement Shoot", category: "engagement" },
		{ id: 2, title: "Our First Date", category: "memories" },
		{ id: 3, title: "Beach Vacation", category: "travel" },
		{ id: 4, title: "The Proposal", category: "engagement" },
		{ id: 5, title: "Family Gathering", category: "memories" },
		{ id: 6, title: "Mountain Trip", category: "travel" },
		{ id: 7, title: "Anniversary Dinner", category: "memories" },
		{ id: 8, title: "Ring Close-up", category: "engagement" },
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

	return (
		<section id="gallery" className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
						Our Gallery
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Capturing moments of our journey together
					</p>
				</div>

				{/* Gallery Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{images.map((image, index) => (
						<div
							key={image.id}
							className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
							onClick={() => openModal(image.id)}
						>
							{/* Placeholder colored backgrounds instead of actual images */}
							<div
								className={`w-full h-full flex items-center justify-center text-white font-semibold
                ${
									index % 4 === 0
										? "bg-gradient-to-br from-rose-400 to-pink-500"
										: ""
								}
                ${
									index % 4 === 1
										? "bg-gradient-to-br from-blue-400 to-indigo-500"
										: ""
								}
                ${
									index % 4 === 2
										? "bg-gradient-to-br from-green-400 to-emerald-500"
										: ""
								}
                ${
									index % 4 === 3
										? "bg-gradient-to-br from-purple-400 to-pink-500"
										: ""
								}
              `}
							>
								<div className="text-center">
									<div className="text-sm opacity-90">{image.title}</div>
								</div>
							</div>

							{/* Hover overlay */}
							<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
								<svg
									className="w-8 h-8 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
									/>
								</svg>
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

							{/* Image */}
							<div className="w-full h-full flex items-center justify-center">
								{(() => {
									const imageIndex = images.findIndex(
										(img) => img.id === selectedImage
									);
									const image = images[imageIndex];
									return (
										<div
											className={`w-full max-w-2xl aspect-square rounded-lg flex items-center justify-center text-white text-2xl font-bold
                      ${
												imageIndex % 4 === 0
													? "bg-gradient-to-br from-rose-400 to-pink-500"
													: ""
											}
                      ${
												imageIndex % 4 === 1
													? "bg-gradient-to-br from-blue-400 to-indigo-500"
													: ""
											}
                      ${
												imageIndex % 4 === 2
													? "bg-gradient-to-br from-green-400 to-emerald-500"
													: ""
											}
                      ${
												imageIndex % 4 === 3
													? "bg-gradient-to-br from-purple-400 to-pink-500"
													: ""
											}
                    `}
										>
											{image.title}
										</div>
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
