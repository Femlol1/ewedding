"use client";

import { useState } from "react";

export default function Gallery() {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);

	// Stock wedding images from Unsplash
	const images = [
		{ 
			id: 1, 
			title: "Engagement Shoot", 
			category: "engagement",
			url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop&crop=faces"
		},
		{ 
			id: 2, 
			title: "Our First Date", 
			category: "memories",
			url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=500&fit=crop&crop=center"
		},
		{ 
			id: 3, 
			title: "Beach Vacation", 
			category: "travel",
			url: "https://images.unsplash.com/photo-1516627145497-ae2af99fcd24?w=500&h=500&fit=crop&crop=center"
		},
		{ 
			id: 4, 
			title: "The Proposal", 
			category: "engagement",
			url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&h=500&fit=crop&crop=center"
		},
		{ 
			id: 5, 
			title: "Family Gathering", 
			category: "memories",
			url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=500&fit=crop&crop=center"
		},
		{ 
			id: 6, 
			title: "Mountain Trip", 
			category: "travel",
			url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=500&fit=crop&crop=center"
		},
		{ 
			id: 7, 
			title: "Anniversary Dinner", 
			category: "memories",
			url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&h=500&fit=crop&crop=center"
		},
		{ 
			id: 8, 
			title: "Ring Close-up", 
			category: "engagement",
			url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=500&fit=crop&crop=center"
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
					<p className="text-xl text-sage-green max-w-3xl mx-auto">
						Capturing moments of our journey together
					</p>
				</div>

				{/* Gallery Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{images.map((image, index) => (
						<div
							key={image.id}
							className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group shadow-soft-green border border-champagne-gold/30"
							onClick={() => openModal(image.id)}
						>
							{/* Actual stock images */}
							<img
								src={image.url}
								alt={image.title}
								className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
							/>
							
							{/* Image title overlay */}
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-green/80 to-transparent p-4">
								<div className="text-center">
									<div className="text-sm text-warm-white font-medium">{image.title}</div>
								</div>
							</div>

							{/* Hover overlay */}
							<div className="absolute inset-0 bg-forest-green/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
