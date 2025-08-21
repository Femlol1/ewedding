import Link from "next/link";
import { ReactNode } from "react";

interface AdminLayoutProps {
	children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Admin Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<Link
							href="/admin/dashboard"
							className="text-2xl font-bold text-gray-900 hover:text-gray-700"
						>
							Wedding Admin Panel
						</Link>
						<nav className="flex space-x-1">
							<Link
								href="/admin/dashboard"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								Dashboard
							</Link>
							<Link
								href="/admin/gallery"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								Gallery
							</Link>
							<Link
								href="/admin/headers"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								Headers
							</Link>
							<Link
								href="/admin/table-groups"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								Tables
							</Link>
							<Link
								href="/admin/check-in"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								Check-In
							</Link>
							<Link
								href="/admin/stats"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								Statistics
							</Link>
							<Link
								href="/admin/comments"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								Comments
							</Link>
							<Link
								href="/admin/asoebi"
								className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								asoebi
							</Link>
							<Link
								href="/"
								className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
							>
								View Site
							</Link>
						</nav>
					</div>
				</div>
			</header>

			{/* Admin Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	);
}
