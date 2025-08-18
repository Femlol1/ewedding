"use client";

import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const { state, toggleCart } = useCart();

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		element?.scrollIntoView({ behavior: "smooth" });
		setIsOpen(false);
	};

	return (
		<nav className="fixed top-0 w-full bg-warm-white/95 backdrop-blur-md z-50 shadow-soft border-b border-champagne-gold/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0">
						<h1 className="text-2xl font-bold text-forest-green">Emmanuel</h1>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-8">
							<button
								onClick={() => scrollToSection("home")}
								className="text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Home
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Our Story
							</button>
							<button
								onClick={() => scrollToSection("details")}
								className="text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Details
							</button>
							<button
								onClick={() => scrollToSection("gallery")}
								className="text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Gallery
							</button>
							<button
								onClick={() => scrollToSection("aso-ebi")}
								className="text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Aso Ebi
							</button>
							<a
								href="/rsvp"
								className="text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								RSVP
							</a>
						</div>
					</div>

					{/* Cart and Mobile menu */}
					<div className="flex items-center space-x-4">
						{/* Cart Icon */}
						<button
							onClick={toggleCart}
							className="relative text-charcoal hover:text-sage-green transition-colors duration-200 p-2"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 5.2a2 2 0 01-1.9 1.8H3.2a2 2 0 01-2-1.8L1 7h2m4 6v6a2 2 0 002 2h4a2 2 0 002-2v-6m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v4"
								/>
							</svg>
							{state.totalItems > 0 && (
								<span className="absolute -top-1 -right-1 bg-champagne-gold text-forest-green text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
									{state.totalItems}
								</span>
							)}
						</button>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="text-charcoal hover:text-sage-green focus:outline-none focus:text-sage-green"
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
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-warm-white/95 backdrop-blur-sm border-t border-champagne-gold/20">
							<button
								onClick={() => scrollToSection("home")}
								className="block px-3 py-2 text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Home
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="block px-3 py-2 text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Our Story
							</button>
							<button
								onClick={() => scrollToSection("details")}
								className="block px-3 py-2 text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Details
							</button>
							<button
								onClick={() => scrollToSection("gallery")}
								className="block px-3 py-2 text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Gallery
							</button>
							<button
								onClick={() => scrollToSection("aso-ebi")}
								className="block px-3 py-2 text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								Aso Ebi
							</button>
							<a
								href="/rsvp"
								className="block px-3 py-2 text-charcoal hover:text-sage-green transition-colors duration-200 font-medium"
							>
								RSVP
							</a>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
