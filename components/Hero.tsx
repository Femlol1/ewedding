"use client";

export default function Hero() {
	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
		>
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<img
					src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&crop=center"
					alt="Wedding background"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-forest-green/20"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/10 to-warm-white/30"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
				<div className="space-y-8">
					{/* Names */}
					<div className="space-y-4">
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-forest-green mb-4">
							A <span className="text-champagne-gold">&</span> B
						</h1>
						<p className="text-xl sm:text-2xl text-sage-green font-light">
							We're getting married!
						</p>
					</div>

					{/* Date */}
					<div className="bg-warm-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-soft inline-block border border-champagne-gold/20">
						<p className="text-lg sm:text-xl text-soft-gray mb-2">
							Save the Date
						</p>
						<p className="text-3xl sm:text-4xl font-bold text-forest-green mb-2">
							December 15, 2026
						</p>
						<p className="text-lg text-sage-green">
							Sunset Gardens, California
						</p>
					</div>

					{/* Countdown Timer */}
					<div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
						<div className="bg-warm-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-champagne-gold/30">
							<div className="text-2xl font-bold text-sage-green">120</div>
							<div className="text-sm text-soft-gray">Days</div>
						</div>
						<div className="bg-warm-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-champagne-gold/30">
							<div className="text-2xl font-bold text-sage-green">14</div>
							<div className="text-sm text-soft-gray">Hours</div>
						</div>
						<div className="bg-warm-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-champagne-gold/30">
							<div className="text-2xl font-bold text-sage-green">32</div>
							<div className="text-sm text-soft-gray">Minutes</div>
						</div>
						<div className="bg-warm-white/90 backdrop-blur-sm rounded-lg p-4 text-center border border-champagne-gold/30">
							<div className="text-2xl font-bold text-sage-green">18</div>
							<div className="text-sm text-soft-gray">Seconds</div>
						</div>
					</div>

					{/* CTA Button */}
					<div className="pt-4">
						<button
							onClick={() =>
								document
									.getElementById("rsvp")
									?.scrollIntoView({ behavior: "smooth" })
							}
							className="bg-gradient-to-r from-sage-green to-emerald hover:from-forest-green hover:to-sage-green text-warm-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-soft border border-champagne-gold/30"
						>
							RSVP Now
						</button>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<svg
					className="w-6 h-6 text-forest-green"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</div>
		</section>
	);
}
