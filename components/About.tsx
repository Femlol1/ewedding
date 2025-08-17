export default function About() {
	return (
		<section
			id="about"
			className="py-20 bg-gradient-to-br from-warm-white via-cream to-warm-beige"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl sm:text-5xl font-bold text-forest-green mb-4">
						Our Love Story
					</h2>
					<p className="text-xl text-sage-green max-w-3xl mx-auto">
						Every love story is beautiful, but ours is our favorite
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					{/* Story Content */}
					<div className="space-y-12">
						<div className="prose prose-lg max-w-none">
							<h3 className="text-2xl font-bold text-forest-green mb-6 border-l-4 border-champagne-gold pl-6">
								How We Met
							</h3>
							<p className="text-charcoal leading-relaxed text-lg mb-8">
								We met on a sunny afternoon at the local coffee shop where B was
								reading his favorite book and A was working on her laptop. A
								spilled latte led to our first conversation, and the rest is
								history. What started as an accidental encounter became the most
								beautiful journey of our lives.
							</p>
						</div>

						<div className="prose prose-lg max-w-none">
							<h3 className="text-2xl font-bold text-forest-green mb-6 border-l-4 border-champagne-gold pl-6">
								The Proposal
							</h3>
							<p className="text-charcoal leading-relaxed text-lg mb-8">
								After three wonderful years together, B proposed during our
								anniversary trip to the mountains. Under a sky full of stars,
								with A completely surprised, he got down on one knee and asked
								the question that changed our lives forever. Of course, she said
								yes!
							</p>
						</div>

						<div className="prose prose-lg max-w-none">
							<h3 className="text-2xl font-bold text-forest-green mb-6 border-l-4 border-champagne-gold pl-6">
								Our Future
							</h3>
							<p className="text-charcoal leading-relaxed text-lg">
								We're excited to start this new chapter of our lives together.
								We love traveling, cooking together, and can't wait to build a
								home filled with love, laughter, and maybe a few pets. Thank you
								for being part of our journey!
							</p>
						</div>
					</div>

					{/* Photo Gallery */}
					<div className="relative">
						{/* Main large image */}
						<div className="mb-6">
							<img
								src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop&crop=faces"
								alt="Couple Portrait"
								className="w-full h-80 object-cover rounded-2xl shadow-lg"
							/>
						</div>

						{/* Three smaller images in a row */}
						<div className="grid grid-cols-3 gap-4">
							<img
								src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=200&fit=crop&crop=center"
								alt="Our First Date"
								className="w-full h-32 object-cover rounded-xl shadow-md"
							/>
							<img
								src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=200&fit=crop&crop=center"
								alt="The Proposal"
								className="w-full h-32 object-cover rounded-xl shadow-md"
							/>
							<img
								src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=200&fit=crop&crop=center"
								alt="Engagement Ring"
								className="w-full h-32 object-cover rounded-xl shadow-md"
							/>
						</div>
					</div>
				</div>

				{/* Quote */}
				<div className="text-center mt-16">
					<blockquote className="text-2xl sm:text-3xl font-light text-forest-green italic max-w-4xl mx-auto">
						"Being deeply loved by someone gives you strength, while loving
						someone deeply gives you courage."
					</blockquote>
					<p className="text-sage-green mt-4">- Lao Tzu</p>
				</div>
			</div>
		</section>
	);
}
