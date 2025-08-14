"use client";

export default function Hero() {
	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
		>
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<div className="w-full h-full bg-gradient-to-br from-rose-200 via-pink-100 to-rose-100"></div>
				{/* You can replace this with an actual background image */}
				{/* <Image
          src="/hero-bg.jpg"
          alt="Wedding background"
          fill
          className="object-cover"
          priority
        /> */}
				<div className="absolute inset-0 bg-black/20"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
				<div className="space-y-8">
					{/* Names */}
					<div className="space-y-4">
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-4">
							Sarah <span className="text-rose-600">&</span> John
						</h1>
						<p className="text-xl sm:text-2xl text-gray-700 font-light">
							We're getting married!
						</p>
					</div>

					{/* Date */}
					<div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-lg inline-block">
						<p className="text-lg sm:text-xl text-gray-600 mb-2">
							Save the Date
						</p>
						<p className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
							December 15, 2026
						</p>
						<p className="text-lg text-gray-600">Sunset Gardens, California</p>
					</div>

					{/* Countdown Timer */}
					<div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
						<div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-rose-600">120</div>
							<div className="text-sm text-gray-600">Days</div>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-rose-600">14</div>
							<div className="text-sm text-gray-600">Hours</div>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-rose-600">32</div>
							<div className="text-sm text-gray-600">Minutes</div>
						</div>
						<div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-rose-600">18</div>
							<div className="text-sm text-gray-600">Seconds</div>
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
							className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
						>
							RSVP Now
						</button>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<svg
					className="w-6 h-6 text-gray-700"
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
