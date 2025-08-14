export default function About() {
	return (
		<section id="about" className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
						Our Love Story
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Every love story is beautiful, but ours is our favorite
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Story Content */}
					<div className="space-y-8">
						<div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl">
							<h3 className="text-2xl font-bold text-gray-800 mb-4">
								How We Met
							</h3>
							<p className="text-gray-600 leading-relaxed">
								We met on a sunny afternoon at the local coffee shop where John
								was reading his favorite book and Sarah was working on her
								laptop. A spilled latte led to our first conversation, and the
								rest is history. What started as an accidental encounter became
								the most beautiful journey of our lives.
							</p>
						</div>

						<div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
							<h3 className="text-2xl font-bold text-gray-800 mb-4">
								The Proposal
							</h3>
							<p className="text-gray-600 leading-relaxed">
								After three wonderful years together, John proposed during our
								anniversary trip to the mountains. Under a sky full of stars,
								with Sarah completely surprised, he got down on one knee and
								asked the question that changed our lives forever. Of course,
								she said yes!
							</p>
						</div>

						<div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
							<h3 className="text-2xl font-bold text-gray-800 mb-4">
								Our Future
							</h3>
							<p className="text-gray-600 leading-relaxed">
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
							<div className="bg-gradient-to-br from-rose-200 to-pink-200 aspect-square rounded-2xl flex items-center justify-center">
								<span className="text-gray-600 text-center">
									Photo 1<br />
									Our First Date
								</span>
							</div>
							<div className="bg-gradient-to-br from-blue-200 to-indigo-200 aspect-[4/5] rounded-2xl flex items-center justify-center">
								<span className="text-gray-600 text-center">
									Photo 2<br />
									Vacation Together
								</span>
							</div>
						</div>
						<div className="space-y-4 pt-8">
							<div className="bg-gradient-to-br from-green-200 to-emerald-200 aspect-[4/5] rounded-2xl flex items-center justify-center">
								<span className="text-gray-600 text-center">
									Photo 3<br />
									The Proposal
								</span>
							</div>
							<div className="bg-gradient-to-br from-purple-200 to-pink-200 aspect-square rounded-2xl flex items-center justify-center">
								<span className="text-gray-600 text-center">
									Photo 4<br />
									Engagement
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Quote */}
				<div className="text-center mt-16">
					<blockquote className="text-2xl sm:text-3xl font-light text-gray-700 italic max-w-4xl mx-auto">
						"Being deeply loved by someone gives you strength, while loving
						someone deeply gives you courage."
					</blockquote>
					<p className="text-gray-500 mt-4">- Lao Tzu</p>
				</div>
			</div>
		</section>
	);
}
