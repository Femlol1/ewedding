export default function About() {
	return (
		<section
			id="about"
			className="py-20 bg-gradient-to-br from-cream via-warm-beige to-light-sage"
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

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Story Content */}
					<div className="space-y-8">
						<div className="bg-warm-white/80 p-8 rounded-3xl shadow-soft border border-champagne-gold/30">
							<h3 className="text-2xl font-bold text-forest-green mb-4">
								How We Met
							</h3>
							<p className="text-charcoal leading-relaxed">
								We met on a sunny afternoon at the local coffee shop where B was
								reading his favorite book and A was working on her laptop. A
								spilled latte led to our first conversation, and the rest is
								history. What started as an accidental encounter became the most
								beautiful journey of our lives.
							</p>
						</div>

						<div className="bg-warm-white/80 p-8 rounded-3xl shadow-soft border border-champagne-gold/30">
							<h3 className="text-2xl font-bold text-forest-green mb-4">
								The Proposal
							</h3>
							<p className="text-charcoal leading-relaxed">
								After three wonderful years together, B proposed during our
								anniversary trip to the mountains. Under a sky full of stars,
								with A completely surprised, he got down on one knee and asked
								the question that changed our lives forever. Of course, she said
								yes!
							</p>
						</div>

						<div className="bg-warm-white/80 p-8 rounded-3xl shadow-soft border border-champagne-gold/30">
							<h3 className="text-2xl font-bold text-forest-green mb-4">
								Our Future
							</h3>
							<p className="text-charcoal leading-relaxed">
								We're excited to start this new chapter of our lives together.
								We love traveling, cooking together, and can't wait to build a
								home filled with love, laughter, and maybe a few pets. Thank you
								for being part of our journey!
							</p>
						</div>
					</div>

					{/* Photo Gallery */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-4">
							<div className="aspect-square rounded-3xl overflow-hidden shadow-soft border border-champagne-gold/40">
								<img
									src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop&crop=center"
									alt="Our First Date"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft border border-champagne-gold/40">
								<img
									src="https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=500&fit=crop&crop=center"
									alt="Vacation Together"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
						<div className="space-y-4 pt-8">
							<div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft border border-champagne-gold/40">
								<img
									src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=500&fit=crop&crop=center"
									alt="The Proposal"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="aspect-square rounded-3xl overflow-hidden shadow-soft border border-champagne-gold/40">
								<img
									src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop&crop=center"
									alt="Engagement Ring"
									className="w-full h-full object-cover"
								/>
							</div>
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
