"use client";

import { useState } from "react";

export default function SendEmailsButton() {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSendEmails = async () => {
		setLoading(true);
		setMessage("");

		try {
			const response = await fetch("/api/sendRsvpEmails");
			const data = await response.json();

			if (response.ok) {
				setMessage("✅ Emails sent successfully!");
			} else {
				setMessage(`❌ Error: ${data.message}`);
			}
		} catch (error) {
			setMessage("❌ Failed to send emails. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center m-4">
			<button
				onClick={handleSendEmails}
				disabled={loading}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
			>
				{loading ? (
					"Sending Emails..."
				) : (
					<>
						Send <span className="text-red-500">ALL</span> RSVP Emails
					</>
				)}
				,
			</button>
			{message && <p className="mt-2 text-gray-700">{message}</p>}
		</div>
	);
}
