"use client";
import GalleryManager from "@/components/shared/GalleryManager";
import { collection, db, getDocs } from "@/lib/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCalendar, FiImage, FiSettings, FiUsers } from "react-icons/fi";

interface DashboardStats {
	totalRSVPs: number;
	checkedIn: number;
	totalImages: number;
	churchAttendees: number;
	receptionAttendees: number;
}

export default function AdminDashboard() {
	const [stats, setStats] = useState<DashboardStats>({
		totalRSVPs: 0,
		checkedIn: 0,
		totalImages: 0,
		churchAttendees: 0,
		receptionAttendees: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		try {
			setIsLoading(true);

			// Fetch RSVP stats
			const rsvpCollection = collection(db, "rsvps");
			const rsvpSnapshot = await getDocs(rsvpCollection);
			const rsvps = rsvpSnapshot.docs.map((doc) => doc.data());

			// Fetch Gallery stats
			const galleryRes = await fetch("/api/gallery/uploadthing");
			const galleryData = await galleryRes.json();

			setStats({
				totalRSVPs: rsvps.length,
				checkedIn: rsvps.filter((rsvp: any) => rsvp.checkedIn).length,
				totalImages: Array.isArray(galleryData) ? galleryData.length : 0,
				churchAttendees: rsvps.filter((rsvp: any) => rsvp.church === "yes")
					.length,
				receptionAttendees: rsvps.filter(
					(rsvp: any) => rsvp.reception === "yes"
				).length,
			});
		} catch (error) {
			console.error("Failed to fetch stats:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-64">
				<div className="text-lg">Loading dashboard...</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Wedding Dashboard</h1>
				<p className="text-gray-600 mt-1">
					Overview of your wedding management system
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex items-center">
						<FiUsers className="h-8 w-8 text-blue-600" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Total RSVPs</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.totalRSVPs}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex items-center">
						<FiCalendar className="h-8 w-8 text-green-600" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Checked In</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.checkedIn}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex items-center">
						<FiImage className="h-8 w-8 text-purple-600" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">
								Gallery Images
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.totalImages}
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="flex items-center">
						<FiSettings className="h-8 w-8 text-orange-600" />
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">
								Church Attendees
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.churchAttendees}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Link href="/admin/table-groups" className="group">
					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									Table Management
								</h3>
								<p className="text-gray-600 text-sm">
									Organize seating arrangements
								</p>
							</div>
							<FiUsers className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
						</div>
					</div>
				</Link>

				<Link href="/admin/gallery" className="group">
					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									Manage Gallery
								</h3>
								<p className="text-gray-600 text-sm">
									Upload and organize wedding photos
								</p>
							</div>
							<FiImage className="h-6 w-6 text-purple-600 group-hover:text-purple-700" />
						</div>
					</div>
				</Link>

				<Link href="/admin/check-in" className="group">
					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									Guest Check-In
								</h3>
								<p className="text-gray-600 text-sm">
									Manage guest arrivals and departures
								</p>
							</div>
							<FiCalendar className="h-6 w-6 text-green-600 group-hover:text-green-700" />
						</div>
					</div>
				</Link>

				<Link href="/admin/stats" className="group">
					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									Statistics
								</h3>
								<p className="text-gray-600 text-sm">
									View detailed analytics and charts
								</p>
							</div>
							<FiSettings className="h-6 w-6 text-orange-600 group-hover:text-orange-700" />
						</div>
					</div>
				</Link>

				<Link href="/admin/comments" className="group">
					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									Comments
								</h3>
								<p className="text-gray-600 text-sm">Moderate guest messages</p>
							</div>
							<FiUsers className="h-6 w-6 text-red-600 group-hover:text-red-700" />
						</div>
					</div>
				</Link>

				<Link href="/" className="group">
					<div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									View Website
								</h3>
								<p className="text-gray-600 text-sm">
									See your wedding website as guests do
								</p>
							</div>
							<FiCalendar className="h-6 w-6 text-gray-600 group-hover:text-gray-700" />
						</div>
					</div>
				</Link>
			</div>

			{/* Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* RSVP Summary */}
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						RSVP Summary
					</h3>
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-gray-600">Church Service</span>
							<span className="font-medium">
								{stats.churchAttendees} attending
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Reception</span>
							<span className="font-medium">
								{stats.receptionAttendees} attending
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Check-in Rate</span>
							<span className="font-medium">
								{stats.totalRSVPs > 0
									? Math.round((stats.checkedIn / stats.totalRSVPs) * 100)
									: 0}
								%
							</span>
						</div>
					</div>
				</div>

				{/* Quick Gallery Manager */}
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Quick Gallery Upload
					</h3>
					<GalleryManager
						showUpload={true}
						showBulkActions={false}
						compact={true}
					/>
				</div>
			</div>
		</div>
	);
}
