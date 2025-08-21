"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HeaderImageProps {
	pageId: string;
	alt: string;
	title: string;
	className?: string;
	fallbackSrc?: string;
}

interface HeaderImageData {
	id: string;
	url: string;
	name: string;
	pageId: string;
	isActive: boolean;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
	pageId,
	alt,
	title,
	className = "",
	fallbackSrc,
}) => {
	const [headerImage, setHeaderImage] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHeaderImage = async () => {
			try {
				const response = await fetch(`/api/headers?pageId=${pageId}`);
				if (response.ok) {
					const images: HeaderImageData[] = await response.json();
					const activeImage = images.find((img) => img.isActive);

					if (activeImage) {
						setHeaderImage(activeImage.url);
					} else if (fallbackSrc) {
						setHeaderImage(fallbackSrc);
					}
				} else if (fallbackSrc) {
					setHeaderImage(fallbackSrc);
				}
			} catch (error) {
				console.error("Failed to fetch header image:", error);
				if (fallbackSrc) {
					setHeaderImage(fallbackSrc);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchHeaderImage();
	}, [pageId, fallbackSrc]);

	if (loading) {
		return (
			<section
				className={`relative w-full h-64 bg-gray-200 animate-pulse ${className}`}
			>
				<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
					<h3 className="text-3xl md:text-5xl font-bold mt-2">{title}</h3>
				</div>
			</section>
		);
	}

	if (!headerImage) {
		return (
			<section
				className={`relative w-full h-64 bg-gradient-to-r from-purple-400 to-pink-400 ${className}`}
			>
				<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
					<h3 className="text-3xl md:text-5xl font-bold mt-2">{title}</h3>
				</div>
			</section>
		);
	}

	return (
		<section className={`relative w-full h-64 ${className}`}>
			<Image
				src={headerImage}
				alt={alt}
				fill
				style={{ objectFit: "cover" }}
				quality={100}
				className="z-0"
				priority
			/>
			<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
				<h3 className="text-3xl md:text-5xl font-bold mt-2">{title}</h3>
			</div>
		</section>
	);
};

export default HeaderImage;
