"use client";

import { useState } from "react";
import { RSVP } from "../types/rsvp";

export default function RSVPForm() {
	const [formData, setFormData] = useState<Partial<RSVP>>({
		attendance: "attending",
		eventType: "both",
		numberOfGuests: 1,
		guests: [
			{
				name: "",
				email: "",
				phone: "",
				dietaryRestrictions: "",
				plusOne: false,
			},
		],
		primaryGuest: {
			name: "",
			email: "",
			phone: "",
			dietaryRestrictions: "",
			plusOne: false,
		},
		specialRequests: "",
		responded: false,
	});
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (
		field: string,
		value: any,
		guestIndex?: number
	) => {
		if (guestIndex !== undefined) {
			const guests = [...(formData.guests || [])];
			guests[guestIndex] = { ...guests[guestIndex], [field]: value };
			setFormData({ ...formData, guests });
		} else if (field.startsWith("primaryGuest.")) {
			const primaryField = field.split(".")[1];
			setFormData({
				...formData,
				primaryGuest: { ...formData.primaryGuest!, [primaryField]: value },
			});
		} else {
			setFormData({ ...formData, [field]: value });
		}
	};

	const addGuest = () => {
		const newGuests = [
			...(formData.guests || []),
			{
				name: "",
				email: "",
				phone: "",
				dietaryRestrictions: "",
				plusOne: false,
			},
		];
		setFormData({
			...formData,
			guests: newGuests,
			numberOfGuests: newGuests.length,
		});
	};

	const removeGuest = (index: number) => {
		const newGuests = formData.guests!.filter((_, i) => i !== index);
		setFormData({
			...formData,
			guests: newGuests,
			numberOfGuests: newGuests.length,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// Validate required fields
			if (!formData.primaryGuest?.name || !formData.primaryGuest?.email) {
				throw new Error("Please fill in your name and email address");
			}

			if (
				formData.attendance === "attending" &&
				!formData.guests?.every((guest) => guest.name)
			) {
				throw new Error("Please provide names for all guests");
			}

			const rsvpData = {
				...formData,
				responded: true,
				confirmedAt: new Date(),
			} as Omit<RSVP, "id">;

			const response = await fetch("/api/rsvp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ rsvp: rsvpData }),
			});

			if (!response.ok) {
				throw new Error("Failed to submit RSVP");
			}

			setSubmitted(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to submit RSVP");
		} finally {
			setLoading(false);
		}
	};

	if (submitted) {
		return (
			<div className="min-h-screen bg-cream flex items-center justify-center">
				<div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
					<div className="w-16 h-16 mx-auto mb-4 bg-forest-green rounded-full flex items-center justify-center">
						<svg
							className="w-8 h-8 text-white"
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
					<h2 className="text-2xl font-bold text-forest-green mb-4">
						Thank You!
					</h2>
					<p className="text-gray-600 mb-6">
						Your RSVP has been submitted successfully. We look forward to
						celebrating with you!
					</p>
					<button
						onClick={() => (window.location.href = "/")}
						className="bg-forest-green text-white px-6 py-2 rounded-lg hover:bg-sage-green transition-colors"
					>
						Return to Wedding Site
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-cream py-12">
			<div className="max-w-2xl mx-auto px-4">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h1 className="text-3xl font-bold text-forest-green text-center mb-8">
						Wedding RSVP
					</h1>

					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Primary Guest Information */}
						<div className="border-b border-gray-200 pb-6">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Your Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Full Name *
									</label>
									<input
										type="text"
										required
										value={formData.primaryGuest?.name || ""}
										onChange={(e) =>
											handleInputChange("primaryGuest.name", e.target.value)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Email Address *
									</label>
									<input
										type="email"
										required
										value={formData.primaryGuest?.email || ""}
										onChange={(e) =>
											handleInputChange("primaryGuest.email", e.target.value)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone Number
									</label>
									<input
										type="tel"
										value={formData.primaryGuest?.phone || ""}
										onChange={(e) =>
											handleInputChange("primaryGuest.phone", e.target.value)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Dietary Restrictions
									</label>
									<input
										type="text"
										value={formData.primaryGuest?.dietaryRestrictions || ""}
										onChange={(e) =>
											handleInputChange(
												"primaryGuest.dietaryRestrictions",
												e.target.value
											)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
									/>
								</div>
							</div>
						</div>

						{/* Attendance */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Will you be attending?
							</h3>
							<div className="space-y-3">
								{[
									{ value: "attending", label: "Yes, I'll be there!" },
									{ value: "not-attending", label: "Sorry, I can't make it" },
									{ value: "maybe", label: "I'm not sure yet" },
								].map((option) => (
									<label key={option.value} className="flex items-center">
										<input
											type="radio"
											value={option.value}
											checked={formData.attendance === option.value}
											onChange={(e) =>
												handleInputChange("attendance", e.target.value)
											}
											className="mr-3 text-forest-green focus:ring-forest-green"
										/>
										<span className="text-gray-700">{option.label}</span>
									</label>
								))}
							</div>
						</div>

						{/* Event Type */}
						{formData.attendance === "attending" && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Which events will you attend?
								</h3>
								<div className="space-y-3">
									{[
										{ value: "ceremony", label: "Ceremony only" },
										{ value: "reception", label: "Reception only" },
										{ value: "both", label: "Both ceremony and reception" },
									].map((option) => (
										<label key={option.value} className="flex items-center">
											<input
												type="radio"
												value={option.value}
												checked={formData.eventType === option.value}
												onChange={(e) =>
													handleInputChange("eventType", e.target.value)
												}
												className="mr-3 text-forest-green focus:ring-forest-green"
											/>
											<span className="text-gray-700">{option.label}</span>
										</label>
									))}
								</div>
							</div>
						)}

						{/* Additional Guests */}
						{formData.attendance === "attending" && (
							<div>
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold text-gray-900">
										Additional Guests
									</h3>
									<button
										type="button"
										onClick={addGuest}
										className="bg-forest-green text-white px-4 py-2 rounded-lg text-sm hover:bg-sage-green transition-colors"
									>
										Add Guest
									</button>
								</div>

								{formData.guests?.map((guest, index) => (
									<div
										key={index}
										className="border border-gray-200 rounded-lg p-4 mb-4"
									>
										<div className="flex justify-between items-center mb-3">
											<h4 className="font-medium text-gray-900">
												Guest {index + 1}
											</h4>
											{formData.guests!.length > 1 && (
												<button
													type="button"
													onClick={() => removeGuest(index)}
													className="text-red-600 hover:text-red-800"
												>
													Remove
												</button>
											)}
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Name *
												</label>
												<input
													type="text"
													required={formData.attendance === "attending"}
													value={guest.name}
													onChange={(e) =>
														handleInputChange("name", e.target.value, index)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Dietary Restrictions
												</label>
												<input
													type="text"
													value={guest.dietaryRestrictions || ""}
													onChange={(e) =>
														handleInputChange(
															"dietaryRestrictions",
															e.target.value,
															index
														)
													}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						)}

						{/* Special Requests */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Special Requests or Comments
							</label>
							<textarea
								rows={4}
								value={formData.specialRequests || ""}
								onChange={(e) =>
									handleInputChange("specialRequests", e.target.value)
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
								placeholder="Any special accommodations, song requests, or messages for the couple..."
							/>
						</div>

						{/* Submit Button */}
						<div className="text-center">
							<button
								type="submit"
								disabled={loading}
								className="bg-forest-green text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-sage-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? "Submitting..." : "Submit RSVP"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
