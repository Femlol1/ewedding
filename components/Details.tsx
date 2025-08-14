export default function Details() {
	return (
		<section
			id="details"
			className="py-20 bg-gradient-to-br from-rose-50 to-pink-50"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
						Wedding Details
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						All the important information for our special day
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
					{/* Ceremony Details */}
					<div className="bg-white rounded-2xl shadow-lg p-8">
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-rose-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-2">
								Ceremony
							</h3>
						</div>

						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<svg
										className="w-4 h-4 text-rose-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800">Time</h4>
									<p className="text-gray-600">4:00 PM - 5:00 PM</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<svg
										className="w-4 h-4 text-rose-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800">Location</h4>
									<p className="text-gray-600">Sunset Gardens Chapel</p>
									<p className="text-gray-600">123 Rose Avenue, California</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<svg
										className="w-4 h-4 text-rose-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800">Dress Code</h4>
									<p className="text-gray-600">Formal / Cocktail Attire</p>
								</div>
							</div>
						</div>
					</div>

					{/* Reception Details */}
					<div className="bg-white rounded-2xl shadow-lg p-8">
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-rose-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-2">
								Reception
							</h3>
						</div>

						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<svg
										className="w-4 h-4 text-rose-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800">Time</h4>
									<p className="text-gray-600">6:00 PM - 11:00 PM</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<svg
										className="w-4 h-4 text-rose-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800">Location</h4>
									<p className="text-gray-600">Grand Ballroom</p>
									<p className="text-gray-600">
										456 Celebration Blvd, California
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<svg
										className="w-4 h-4 text-rose-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
										/>
									</svg>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800">Dinner</h4>
									<p className="text-gray-600">3-Course Plated Dinner</p>
									<p className="text-gray-600">Open Bar Available</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Additional Information */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="text-center bg-white rounded-xl p-6 shadow-md">
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-6 h-6 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Accommodations</h4>
						<p className="text-gray-600 text-sm">
							Room blocks available at nearby hotels. Details in your
							invitation.
						</p>
					</div>

					<div className="text-center bg-white rounded-xl p-6 shadow-md">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-6 h-6 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
								/>
							</svg>
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Registry</h4>
						<p className="text-gray-600 text-sm">
							Your presence is the best present, but if you wish to give a
							gift...
						</p>
					</div>

					<div className="text-center bg-white rounded-xl p-6 shadow-md">
						<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-6 h-6 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<h4 className="font-semibold text-gray-800 mb-2">Contact</h4>
						<p className="text-gray-600 text-sm">
							Questions? Contact us at Emmanuel.wedding@email.com
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
