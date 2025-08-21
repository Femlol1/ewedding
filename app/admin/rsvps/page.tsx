"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RSVPRedirect() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the main admin RSVP page
		router.replace("/admin");
	}, [router]);

	return (
		<div className="flex justify-center items-center min-h-64">
			<div className="text-lg">Loading RSVP management...</div>
		</div>
	);
}
