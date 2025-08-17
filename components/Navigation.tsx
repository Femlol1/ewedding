"use client";

import { useState } from "react";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		element?.scrollIntoView({ behavior: "smooth" });
		setIsOpen(false);
	};

	return (
		<nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-soft border-b border-rose-100/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0">
						<h1 className="text-2xl font-bold text-rose-400">Emmanuel</h1>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-8">
							<button
								onClick={() => scrollToSection("home")}
								className="text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Home
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Our Story
							</button>
							<button
								onClick={() => scrollToSection("details")}
								className="text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Details
							</button>
							<button
								onClick={() => scrollToSection("gallery")}
								className="text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Gallery
							</button>
							<button
								onClick={() => scrollToSection("rsvp")}
								className="text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								RSVP
							</button>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-slate-600 hover:text-rose-400 focus:outline-none focus:text-rose-400"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t border-rose-100/30">
							<button
								onClick={() => scrollToSection("home")}
								className="block px-3 py-2 text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Home
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="block px-3 py-2 text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Our Story
							</button>
							<button
								onClick={() => scrollToSection("details")}
								className="block px-3 py-2 text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Details
							</button>
							<button
								onClick={() => scrollToSection("gallery")}
								className="block px-3 py-2 text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								Gallery
							</button>
							<button
								onClick={() => scrollToSection("rsvp")}
								className="block px-3 py-2 text-slate-600 hover:text-rose-400 transition-colors duration-200 font-medium"
							>
								RSVP
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
