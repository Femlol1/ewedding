"use client";

import React, { useState } from "react";

export default function RSVP() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		guests: "1",
		attendance: "",
		dietary: "",
		message: "",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the data to your backend
		console.log("RSVP submitted:", formData);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<section
				id="rsvp"
				className="py-20 bg-gradient-to-br from-cream via-warm-beige to-light-sage"
			>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="bg-warm-white/95 backdrop-blur-sm rounded-3xl shadow-soft-green-green p-8 border border-champagne-gold/30">
						<div className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg
								className="w-8 h-8 text-forest-green"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h2 className="text-3xl font-bold text-forest-green mb-4">
							Thank You!
						</h2>
						<p className="text-sage-green mb-6">
							Your RSVP has been received. We can't wait to celebrate with you!
						</p>
						<button
							onClick={() => setIsSubmitted(false)}
							className="text-bronze hover:text-forest-green font-medium"
						>
							Submit Another RSVP
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="rsvp"
			className="py-20 bg-gradient-to-br from-cream via-warm-beige to-light-sage"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-4xl sm:text-5xl font-bold text-forest-green mb-4">
						RSVP
					</h2>
					<p className="text-xl text-sage-green max-w-3xl mx-auto">
						Please let us know if you'll be joining us for our special day
					</p>
				</div>

				<div className="bg-warm-white/95 backdrop-blur-sm rounded-3xl shadow-soft-green-green p-8 border border-champagne-gold/30">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Name */}
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-sage-green mb-2"
								>
									Full Name *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									value={formData.name}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-champagne-gold/30 rounded-xl focus:ring-2 focus:ring-sage-green focus:border-transparent bg-cream/80 text-forest-green"
									placeholder="Enter your full name"
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-sage-green mb-2"
								>
									Email Address *
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-champagne-gold/30 rounded-xl focus:ring-2 focus:ring-sage-green focus:border-transparent bg-cream/80 text-forest-green"
									placeholder="Enter your email"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Number of Guests */}
							<div>
								<label
									htmlFor="guests"
									className="block text-sm font-medium text-sage-green mb-2"
								>
									Number of Guests *
								</label>
								<select
									id="guests"
									name="guests"
									required
									value={formData.guests}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-champagne-gold/30 rounded-xl focus:ring-2 focus:ring-sage-green focus:border-transparent bg-cream/80 text-forest-green"
								>
									<option value="1">1 Guest</option>
									<option value="2">2 Guests</option>
									<option value="3">3 Guests</option>
									<option value="4">4 Guests</option>
								</select>
							</div>

							{/* Attendance */}
							<div>
								<label
									htmlFor="attendance"
									className="block text-sm font-medium text-sage-green mb-2"
								>
									Will you attend? *
								</label>
								<select
									id="attendance"
									name="attendance"
									required
									value={formData.attendance}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-champagne-gold/30 rounded-xl focus:ring-2 focus:ring-sage-green focus:border-transparent bg-cream/80 text-forest-green"
								>
									<option value="">Please select</option>
									<option value="yes">Yes, I'll be there!</option>
									<option value="no">Sorry, can't make it</option>
								</select>
							</div>
						</div>

						{/* Dietary Requirements */}
						<div>
							<label
								htmlFor="dietary"
								className="block text-sm font-medium text-sage-green mb-2"
							>
								Dietary Requirements
							</label>
							<input
								type="text"
								id="dietary"
								name="dietary"
								value={formData.dietary}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-champagne-gold/30 rounded-xl focus:ring-2 focus:ring-sage-green focus:border-transparent bg-cream/80 text-forest-green"
								placeholder="Any allergies or dietary restrictions?"
							/>
						</div>

						{/* Message */}
						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-sage-green mb-2"
							>
								Special Message
							</label>
							<textarea
								id="message"
								name="message"
								rows={4}
								value={formData.message}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-champagne-gold/30 rounded-xl focus:ring-2 focus:ring-sage-green focus:border-transparent bg-cream/80 text-forest-green"
								placeholder="Any special message for the couple?"
							/>
						</div>

						{/* Submit Button */}
						<div className="text-center pt-4">
							<button
								type="submit"
								className="bg-gradient-to-r from-forest-green to-sage-green hover:from-sage-green hover:to-forest-green text-warm-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-soft-green"
							>
								Send RSVP
							</button>
						</div>
					</form>
				</div>

				{/* Contact Info */}
				<div className="text-center mt-12">
					<p className="text-slate-500 mb-4">
						Having trouble with the form? Contact us directly:
					</p>
					<div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
						<a
							href="mailto:Emmanuel.wedding@email.com"
							className="flex items-center text-rose-400 hover:text-rose-500 transition-colors"
						>
							<svg
								className="w-5 h-5 mr-2"
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
							Emmanuel.wedding@email.com
						</a>
						<a
							href="tel:+447377788552"
							className="flex items-center text-rose-400 hover:text-rose-500 transition-colors"
						>
							<svg
								className="w-5 h-5 mr-2"
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
							(44) 7377788552
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
