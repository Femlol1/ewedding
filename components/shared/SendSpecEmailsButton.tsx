"use client";

import { useState } from "react";

export default function SendSpecEmailsButton() {
	const [emails, setEmails] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSendEmails = async () => {
		setLoading(true);
		setMessage("");

		// Convert input text to an array of emails
		const emailList = emails
			.split(",")
			.map((email) => email.trim())
			.filter((email) => email !== "");

		if (emailList.length === 0) {
			setMessage("❌ Please enter at least one email.");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/sendSpecRsvpEmails", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ emails: emailList }),
			});

			const data = await response.json();
			if (response.ok) {
				setMessage(`✅ Emails sent to ${emailList.length} recipients.`);
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
		<div className="flex flex-col items-center">
			<textarea
				value={emails}
				onChange={(e) => setEmails(e.target.value)}
				placeholder="Enter emails separated by commas"
				className="border p-2 w-full max-w-lg"
				rows={3}
			></textarea>
			<button
				onClick={handleSendEmails}
				disabled={loading}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-50"
			>
				{loading ? "Sending Emails..." : "Send RSVP Emails from above List"}
			</button>
			{message && <p className="mt-2 text-gray-700">{message}</p>}
		</div>
	);
}
