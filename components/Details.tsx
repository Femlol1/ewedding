"use client";

export default function Details() {
	return (
		<section
			id="details"
			className="py-20 bg-gradient-to-r from-cream to-warm-beige"
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Title */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green mb-4">
						Wedding Details
					</h2>
					<p className="text-lg md:text-xl text-sage-green max-w-3xl mx-auto">
						All the important information for our special day
					</p>
				</div>

				{/* Timeline Layout */}
				<div className="relative max-w-6xl mx-auto">
					{/* Vertical Timeline Line - Only show for first two items */}
					<div
						className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-champagne-gold via-bronze to-champagne-gold"
						style={{ height: "calc(100% - 250px)", top: "100px" }}
					></div>

					{/* Timeline Items */}
					<div className="space-y-12 md:space-y-20 lg:space-y-24">
						{/* Ceremony */}
						<div className="relative">
							{/* Desktop Layout */}
							<div className="hidden md:flex items-stretch min-h-[200px]">
								{/* Left Content */}
								<div className="w-5/12 flex justify-end pr-4 lg:pr-8 xl:pr-12">
									<div className="bg-warm-white p-6 lg:p-8 xl:p-10 rounded-2xl shadow-lg border border-champagne-gold/30 max-w-md w-full">
										<h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-forest-green mb-4">
											Ceremony
										</h3>
										<div className="space-y-3 text-sage-green text-sm lg:text-base">
											<p>
												<span className="font-semibold">Date:</span> June 15,
												2024
											</p>
											<p>
												<span className="font-semibold">Time:</span> 4:00 PM
											</p>
											<p>
												<span className="font-semibold">Location:</span> St.
												Mary's Cathedral
											</p>
											<p>
												<span className="font-semibold">Address:</span> 123
												Cathedral Lane, Downtown
											</p>
										</div>
									</div>
								</div>

								{/* Timeline Circle - No absolute positioning */}
								<div className="flex justify-center items-center px-4">
									<div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-champagne-gold to-bronze rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
										<svg
											className="w-8 h-8 lg:w-10 lg:h-10 text-warm-white"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M12 4C10.9 4 10 4.9 10 6s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 8V9.33C18 8.6 17.4 8 16.67 8H14V6c0-1.1-.9-2-2-2s-2 .9-2 2v2H7.33C6.6 8 6 8.6 6 9.33V12h2v8h8v-8h2z" />
										</svg>
									</div>
								</div>

								{/* Right Spacer */}
								<div className="w-5/12 pl-4 lg:pl-8 xl:pl-12">
									{/* Empty space for layout balance */}
								</div>
							</div>

							{/* Mobile Layout */}
							<div className="md:hidden flex items-start space-x-4">
								{/* Mobile Icon */}
								<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-champagne-gold to-bronze rounded-full flex items-center justify-center shadow-lg">
									<svg
										className="w-6 h-6 text-warm-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 4C10.9 4 10 4.9 10 6s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 8V9.33C18 8.6 17.4 8 16.67 8H14V6c0-1.1-.9-2-2-2s-2 .9-2 2v2H7.33C6.6 8 6 8.6 6 9.33V12h2v8h8v-8h2z" />
									</svg>
								</div>
								{/* Mobile Content */}
								<div className="flex-1">
									<div className="bg-warm-white p-6 rounded-2xl shadow-lg border border-champagne-gold/30">
										<h3 className="text-xl font-bold text-forest-green mb-3">
											Ceremony
										</h3>
										<div className="space-y-2 text-sage-green text-sm">
											<p>
												<span className="font-semibold">Date:</span> June 15,
												2024
											</p>
											<p>
												<span className="font-semibold">Time:</span> 4:00 PM
											</p>
											<p>
												<span className="font-semibold">Location:</span> St.
												Mary's Cathedral
											</p>
											<p>
												<span className="font-semibold">Address:</span> 123
												Cathedral Lane, Downtown
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Reception */}
						<div className="relative">
							{/* Desktop Layout */}
							<div className="hidden md:flex items-stretch min-h-[200px]">
								{/* Left Spacer */}
								<div className="w-5/12 pr-4 lg:pr-8 xl:pr-12">
									{/* Empty space for layout balance */}
								</div>

								{/* Timeline Circle - No absolute positioning */}
								<div className="flex justify-center items-center px-4">
									<div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-bronze to-champagne-gold rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
										<svg
											className="w-8 h-8 lg:w-10 lg:h-10 text-warm-white"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
										</svg>
									</div>
								</div>

								{/* Right Content */}
								<div className="w-5/12 flex justify-start pl-4 lg:pl-8 xl:pl-12">
									<div className="bg-warm-white p-6 lg:p-8 xl:p-10 rounded-2xl shadow-lg border border-champagne-gold/30 max-w-md w-full">
										<h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-forest-green mb-4">
											Reception
										</h3>
										<div className="space-y-3 text-sage-green text-sm lg:text-base">
											<p>
												<span className="font-semibold">Time:</span> 6:00 PM -
												12:00 AM
											</p>
											<p>
												<span className="font-semibold">Location:</span> Grand
												Ballroom
											</p>
											<p>
												<span className="font-semibold">Address:</span> 456
												Celebration Ave, Uptown
											</p>
											<p>
												<span className="font-semibold">Dress Code:</span>{" "}
												Semi-formal
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Mobile Layout */}
							<div className="md:hidden flex items-start space-x-4">
								{/* Mobile Icon */}
								<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-bronze to-champagne-gold rounded-full flex items-center justify-center shadow-lg">
									<svg
										className="w-6 h-6 text-warm-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
									</svg>
								</div>
								{/* Mobile Content */}
								<div className="flex-1">
									<div className="bg-warm-white p-6 rounded-2xl shadow-lg border border-champagne-gold/30">
										<h3 className="text-xl font-bold text-forest-green mb-3">
											Reception
										</h3>
										<div className="space-y-2 text-sage-green text-sm">
											<p>
												<span className="font-semibold">Time:</span> 6:00 PM -
												12:00 AM
											</p>
											<p>
												<span className="font-semibold">Location:</span> Grand
												Ballroom
											</p>
											<p>
												<span className="font-semibold">Address:</span> 456
												Celebration Ave, Uptown
											</p>
											<p>
												<span className="font-semibold">Dress Code:</span>{" "}
												Semi-formal
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Additional Information */}
						<div className="relative">
							{/* Desktop Layout */}
							<div className="hidden md:flex items-stretch min-h-[250px]">
								{/* Left Side - Empty for centering */}
								<div className="w-2/12"></div>

								{/* Center Content Area */}
								<div className="w-8/12 flex flex-col items-center">
									{/* Timeline Circle */}
									<div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-champagne-gold to-bronze rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mb-6">
										<svg
											className="w-8 h-8 lg:w-10 lg:h-10 text-warm-white"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M13 7H11V18H13V7Z" />
										</svg>
									</div>

									{/* Content */}
									<div className="w-full bg-warm-white p-6 lg:p-8 xl:p-10 rounded-2xl shadow-lg border border-champagne-gold/30 text-center">
										<h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-forest-green mb-6">
											Important Notes
										</h3>
										<div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 text-sage-green">
											<div className="xl:col-span-1">
												<h4 className="font-semibold mb-2 text-sm lg:text-base">
													Transportation
												</h4>
												<p className="text-xs lg:text-sm">
													Shuttle service will be provided between ceremony and
													reception venues.
												</p>
											</div>
											<div className="xl:col-span-1">
												<h4 className="font-semibold mb-2 text-sm lg:text-base">
													Accommodation
												</h4>
												<p className="text-xs lg:text-sm">
													Hotel blocks available at Downtown Marriott and
													Holiday Inn Express.
												</p>
											</div>
											<div className="xl:col-span-1">
												<h4 className="font-semibold mb-2 text-sm lg:text-base">
													Registry
												</h4>
												<p className="text-xs lg:text-sm">
													Find our wedding registry at Target, Amazon, and Bed
													Bath & Beyond.
												</p>
											</div>
											<div className="xl:col-span-1">
												<h4 className="font-semibold mb-2 text-sm lg:text-base">
													Contact
												</h4>
												<p className="text-xs lg:text-sm">
													Questions? Call Sarah at (555) 123-4567 or email us at
													hello@sarahjohn.com
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Right Side - Empty for centering */}
								<div className="w-2/12"></div>
							</div>

							{/* Mobile Layout */}
							<div className="md:hidden flex items-start space-x-4">
								{/* Mobile Icon */}
								<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-champagne-gold to-bronze rounded-full flex items-center justify-center shadow-lg">
									<svg
										className="w-6 h-6 text-warm-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M13 7H11V18H13V7Z" />
									</svg>
								</div>
								{/* Mobile Content */}
								<div className="flex-1">
									<div className="bg-warm-white p-6 rounded-2xl shadow-lg border border-champagne-gold/30">
										<h3 className="text-xl font-bold text-forest-green mb-4">
											Important Notes
										</h3>
										<div className="space-y-4 text-sage-green text-sm">
											<div>
												<h4 className="font-semibold mb-1">Transportation</h4>
												<p>
													Shuttle service will be provided between ceremony and
													reception venues.
												</p>
											</div>
											<div>
												<h4 className="font-semibold mb-1">Accommodation</h4>
												<p>
													Hotel blocks available at Downtown Marriott and
													Holiday Inn Express.
												</p>
											</div>
											<div>
												<h4 className="font-semibold mb-1">Registry</h4>
												<p>
													Find our wedding registry at Target, Amazon, and Bed
													Bath & Beyond.
												</p>
											</div>
											<div>
												<h4 className="font-semibold mb-1">Contact</h4>
												<p>
													Questions? Call Sarah at (555) 123-4567 or email us at
													hello@sarahjohn.com
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
