"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRedirect() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to dashboard
		router.replace("/admin/dashboard");
	}, [router]);

	return (
		<div className="flex justify-center items-center min-h-64">
			<div className="text-lg">Redirecting to admin dashboard...</div>
		</div>
	);
}
