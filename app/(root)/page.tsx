"use client";

import { Button } from "@/components/ui/button";
import { animated, useTransition } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const WelcomePage: React.FC = () => {
	const [galleryImages, setGalleryImages] = useState<string[]>([]);
	const [currentBackground, setCurrentBackground] = useState<string>("");
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		const fetchImages = async () => {
			const res = await fetch("/api/gallery");
			const images = await res.json();
			setGalleryImages(images);
			if (images.length > 0) {
				setCurrentBackground(images[0]);
				setLoaded(true);
				let index = 0;
				setInterval(() => {
					index = (index + 1) % images.length;
					setCurrentBackground(images[index]);
					setCurrentIndex(index);
				}, 5000); // 5 seconds
			}
		};
		fetchImages();
	}, []);

	const transitions = useTransition(currentBackground, {
		from: { opacity: 0, transform: "translateX(100%)" },
		enter: { opacity: 1, transform: "translateX(0%)" },
		leave: { opacity: 0, transform: "translateX(-100%)" },
		config: { duration: 2000 },
	});

	return (
		<div className="min-h-screen flex flex-col justify-between pt-16 pb-16 relative overflow-hidden">
			<section>
				{transitions(
					(style, item) =>
						loaded && (
							<animated.div
								key={currentIndex}
								className="absolute inset-0"
								style={{
									...style,
									backgroundImage: `url(${item})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							/>
						)
				)}
			</section>
			<section className="flex items-center justify-center flex-grow relative z-10">
				<div className="bg-black bg-opacity-10 p-4 flex flex-col items-center justify-center">
					<h1 className="text-3xl font-bold text-center text-white">
						Temitope <span className="text-sm">and</span> Tobiloba
					</h1>
					<p className="text-center text-white mt-4">
						Welcome to our wedding Website <br />
						We’re getting married ! <br />
						December 17th and 19th 2026
					</p>
					<div className="text-center mt-8">
						<Link href="/gifts">
							<Button className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200">
								Gifts
							</Button>
						</Link>
					</div>
				</div>
			</section>
			<section className="fixed bottom-4 right-4 z-20">
				<Link href="/home">
					<Button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
						<FiChevronRight className="text-6xl text-white" />
					</Button>
				</Link>
			</section>
		</div>
	);
};

export default WelcomePage;
