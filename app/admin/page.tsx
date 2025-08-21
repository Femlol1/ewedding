"use client";

import { useEffect, useState } from "react";
import VideoUpload from "../../components/VideoUpload";
import { Order } from "../../types/order";
import { RSVP, RSVPStats } from "../../types/rsvp";

type AdminTab = "overview" | "orders" | "rsvp" | "payments" | "videos";

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState<AdminTab>("overview");
	const [orders, setOrders] = useState<Order[]>([]);
	const [rsvps, setRSVPs] = useState<RSVP[]>([]);
	const [rsvpStats, setRSVPStats] = useState<RSVPStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [orderFilter, setOrderFilter] = useState<
		"all" | "pending" | "confirmed" | "shipped" | "delivered"
	>("all");
	const [rsvpFilter, setRSVPFilter] = useState<
		"all" | "attending" | "not-attending" | "maybe" | "responded" | "pending"
	>("all");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setLoading(true);
			await Promise.all([fetchOrders(), fetchRSVPs(), fetchRSVPStats()]);
		} catch (error) {
			console.error("Failed to fetch admin data:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchOrders = async () => {
		try {
			const response = await fetch("/api/orders?all=true");
			if (response.ok) {
				const { orders } = await response.json();
				setOrders(orders);
			}
		} catch (error) {
			console.error("Failed to fetch orders:", error);
		}
	};

	const fetchRSVPs = async () => {
		try {
			const response = await fetch("/api/rsvp");
			if (response.ok) {
				const { rsvps } = await response.json();
				setRSVPs(rsvps);
			}
		} catch (error) {
			console.error("Failed to fetch RSVPs:", error);
		}
	};

	const fetchRSVPStats = async () => {
		try {
			const response = await fetch("/api/rsvp?stats=true");
			if (response.ok) {
				const { stats } = await response.json();
				setRSVPStats(stats);
			}
		} catch (error) {
			console.error("Failed to fetch RSVP stats:", error);
		}
	};

	const updateOrderStatus = async (
		orderId: string,
		status: Order["orderStatus"]
	) => {
		try {
			const response = await fetch("/api/orders", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ orderId, orderStatus: status }),
			});

			if (response.ok) {
				setOrders(
					orders.map((order) =>
						order.id === orderId ? { ...order, orderStatus: status } : order
					)
				);
			}
		} catch (error) {
			console.error("Failed to update order status:", error);
		}
	};

	const updateRSVPStatus = async (rsvpId: string, updates: Partial<RSVP>) => {
		try {
			const response = await fetch("/api/rsvp", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: rsvpId, ...updates }),
			});

			if (response.ok) {
				setRSVPs(
					rsvps.map((rsvp) =>
						rsvp.id === rsvpId ? { ...rsvp, ...updates } : rsvp
					)
				);
			}
		} catch (error) {
			console.error("Failed to update RSVP:", error);
		}
	};

	const deleteRSVP = async (rsvpId: string) => {
		if (!confirm("Are you sure you want to delete this RSVP?")) return;

		try {
			const response = await fetch(`/api/rsvp?id=${rsvpId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setRSVPs(rsvps.filter((rsvp) => rsvp.id !== rsvpId));
				await fetchRSVPStats(); // Refresh stats
			}
		} catch (error) {
			console.error("Failed to delete RSVP:", error);
		}
	};

	const downloadRSVPs = async () => {
		try {
			const response = await fetch("/api/rsvp?download=csv");
			if (response.ok) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = `rsvps-${new Date().toISOString().split("T")[0]}.csv`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.error("Failed to download RSVPs:", error);
		}
	};

	const migrateRSVPIds = async () => {
		if (
			!confirm(
				"This will update all RSVP IDs to the new 8-digit format. Continue?"
			)
		)
			return;

		try {
			const response = await fetch("/api/rsvp?action=migrate-ids", {
				method: "PATCH",
			});

			if (response.ok) {
				const result = await response.json();
				alert(result.message);
				await fetchRSVPs(); // Refresh the data
			} else {
				throw new Error("Migration failed");
			}
		} catch (error) {
			console.error("Failed to migrate RSVP IDs:", error);
			alert("Failed to migrate RSVP IDs. Please try again.");
		}
	};

	const filteredOrders =
		orderFilter === "all"
			? orders
			: orders.filter((order) => order.orderStatus === orderFilter);

	const filteredRSVPs = (() => {
		let filtered;
		switch (rsvpFilter) {
			case "all":
				filtered = rsvps;
				break;
			case "responded":
				filtered = rsvps.filter((rsvp) => rsvp.responded);
				break;
			case "pending":
				filtered = rsvps.filter((rsvp) => !rsvp.responded);
				break;
			default:
				filtered = rsvps.filter((rsvp) => rsvp.attendance === rsvpFilter);
				break;
		}

		// Sort by surname (last name) alphabetically
		return filtered.sort((a, b) => {
			const getSurname = (name: string) => {
				const parts = name.trim().split(" ");
				return parts[parts.length - 1].toLowerCase();
			};

			const surnameA = getSurname(a.primaryGuest.name);
			const surnameB = getSurname(b.primaryGuest.name);

			return surnameA.localeCompare(surnameB);
		});
	})();

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	const getStatusColor = (status: Order["orderStatus"]) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "confirmed":
				return "bg-blue-100 text-blue-800";
			case "processing":
				return "bg-purple-100 text-purple-800";
			case "shipped":
				return "bg-indigo-100 text-indigo-800";
			case "delivered":
				return "bg-green-100 text-green-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "completed":
				return "bg-green-100 text-green-800";
			case "failed":
				return "bg-red-100 text-red-800";
			case "refunded":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getAttendanceColor = (attendance: RSVP["attendance"]) => {
		switch (attendance) {
			case "attending":
				return "bg-green-100 text-green-800";
			case "not-attending":
				return "bg-red-100 text-red-800";
			case "maybe":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-forest-green"></div>
					<p className="mt-4 text-lg text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Wedding Admin Dashboard
					</h1>
					<p className="mt-2 text-gray-600">
						Manage Aso Ebi orders, RSVP responses, and payments
					</p>
				</div>

				{/* Navigation Tabs */}
				<div className="mb-8">
					<nav className="flex space-x-8">
						{[
							{ id: "overview", label: "Overview" },
							{ id: "orders", label: "Orders" },
							{ id: "rsvp", label: "RSVP Management" },
							{ id: "payments", label: "Payment Tracking" },
							{ id: "videos", label: "Video Upload" },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as AdminTab)}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									activeTab === tab.id
										? "bg-forest-green text-white"
										: "bg-white text-gray-700 hover:bg-gray-100"
								}`}
							>
								{tab.label}
							</button>
						))}
					</nav>
				</div>

				{/* Overview Tab */}
				{activeTab === "overview" && (
					<div className="space-y-8">
						{/* Order Stats */}
						<div>
							<h2 className="text-xl font-bold text-gray-900 mb-4">
								Order Statistics
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
								<div className="bg-white p-6 rounded-lg shadow">
									<h3 className="text-sm font-medium text-gray-500">
										Total Orders
									</h3>
									<p className="text-2xl font-bold text-gray-900">
										{orders.length}
									</p>
								</div>
								<div className="bg-white p-6 rounded-lg shadow">
									<h3 className="text-sm font-medium text-gray-500">
										Pending Orders
									</h3>
									<p className="text-2xl font-bold text-yellow-600">
										{orders.filter((o) => o.orderStatus === "pending").length}
									</p>
								</div>
								<div className="bg-white p-6 rounded-lg shadow">
									<h3 className="text-sm font-medium text-gray-500">
										Completed Orders
									</h3>
									<p className="text-2xl font-bold text-green-600">
										{orders.filter((o) => o.orderStatus === "delivered").length}
									</p>
								</div>
								<div className="bg-white p-6 rounded-lg shadow">
									<h3 className="text-sm font-medium text-gray-500">
										Total Revenue
									</h3>
									<p className="text-2xl font-bold text-forest-green">
										{formatPrice(
											orders.reduce((sum, order) => sum + order.totalAmount, 0)
										)}
									</p>
								</div>
							</div>
						</div>

						{/* RSVP Stats */}
						{rsvpStats && (
							<div>
								<h2 className="text-xl font-bold text-gray-900 mb-4">
									RSVP Statistics
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
									<div className="bg-white p-6 rounded-lg shadow">
										<h3 className="text-sm font-medium text-gray-500">
											Total Invited
										</h3>
										<p className="text-2xl font-bold text-gray-900">
											{rsvpStats.totalInvited}
										</p>
									</div>
									<div className="bg-white p-6 rounded-lg shadow">
										<h3 className="text-sm font-medium text-gray-500">
											Responded
										</h3>
										<p className="text-2xl font-bold text-blue-600">
											{rsvpStats.totalResponded}
										</p>
									</div>
									<div className="bg-white p-6 rounded-lg shadow">
										<h3 className="text-sm font-medium text-gray-500">
											Attending
										</h3>
										<p className="text-2xl font-bold text-green-600">
											{rsvpStats.attending}
										</p>
									</div>
									<div className="bg-white p-6 rounded-lg shadow">
										<h3 className="text-sm font-medium text-gray-500">
											Total Guests
										</h3>
										<p className="text-2xl font-bold text-forest-green">
											{rsvpStats.totalGuestCount}
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Quick Actions */}
						<div>
							<h2 className="text-xl font-bold text-gray-900 mb-4">
								Quick Actions
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<button
									onClick={() => setActiveTab("orders")}
									className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
								>
									<h3 className="font-semibold text-gray-900">Manage Orders</h3>
									<p className="text-sm text-gray-600 mt-2">
										View and update order statuses
									</p>
								</button>
								<button
									onClick={() => setActiveTab("rsvp")}
									className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
								>
									<h3 className="font-semibold text-gray-900">
										RSVP Management
									</h3>
									<p className="text-sm text-gray-600 mt-2">
										Track guest responses and attendance
									</p>
								</button>
								<button
									onClick={() => setActiveTab("payments")}
									className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
								>
									<h3 className="font-semibold text-gray-900">
										Payment Tracking
									</h3>
									<p className="text-sm text-gray-600 mt-2">
										Monitor payment statuses and revenue
									</p>
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Orders Tab */}
				{activeTab === "orders" && (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-bold text-gray-900">
								Order Management
							</h2>
							<button
								onClick={fetchOrders}
								className="bg-forest-green text-white px-4 py-2 rounded-lg hover:bg-sage-green transition-colors"
							>
								Refresh Orders
							</button>
						</div>

						{/* Order Filters */}
						<div className="bg-white p-4 rounded-lg shadow">
							<div className="flex flex-wrap gap-2">
								{["all", "pending", "confirmed", "shipped", "delivered"].map(
									(status) => (
										<button
											key={status}
											onClick={() => setOrderFilter(status as any)}
											className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
												orderFilter === status
													? "bg-forest-green text-white"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											}`}
										>
											{status.charAt(0).toUpperCase() + status.slice(1)}
										</button>
									)
								)}
							</div>
						</div>

						{/* Orders Table */}
						<div className="bg-white shadow rounded-lg overflow-hidden">
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Order ID
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Customer
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Items
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Total
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Payment
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Status
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Date
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{filteredOrders.map((order) => (
											<tr key={order.id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{order.orderId}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div>
														<div className="text-sm font-medium text-gray-900">
															{order.customerInfo.firstName}{" "}
															{order.customerInfo.lastName}
														</div>
														<div className="text-sm text-gray-500">
															{order.customerInfo.email}
														</div>
														<div className="text-sm text-gray-500">
															{order.customerInfo.phone}
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm text-gray-900">
														{order.items.map((item, index) => (
															<div key={index} className="mb-1">
																{item.name} ({item.size}, {item.color}) ×{" "}
																{item.quantity}
															</div>
														))}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{formatPrice(order.totalAmount)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span
														className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(
															order.paymentStatus
														)}`}
													>
														{order.paymentStatus}
													</span>
													<div className="text-xs text-gray-500 mt-1">
														{order.paymentMethod}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span
														className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
															order.orderStatus
														)}`}
													>
														{order.orderStatus}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{new Date(order.createdAt).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
													<select
														value={order.orderStatus}
														onChange={(e) =>
															updateOrderStatus(
																order.id!,
																e.target.value as Order["orderStatus"]
															)
														}
														className="text-sm border-gray-300 rounded-md"
													>
														<option value="pending">Pending</option>
														<option value="confirmed">Confirmed</option>
														<option value="processing">Processing</option>
														<option value="shipped">Shipped</option>
														<option value="delivered">Delivered</option>
														<option value="cancelled">Cancelled</option>
													</select>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{filteredOrders.length === 0 && (
								<div className="text-center py-12">
									<p className="text-gray-500">
										No orders found for the selected filter.
									</p>
								</div>
							)}
						</div>
					</div>
				)}

				{/* RSVP Tab */}
				{activeTab === "rsvp" && (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-bold text-gray-900">
								RSVP Management
							</h2>
							<div className="flex gap-2">
								<button
									onClick={downloadRSVPs}
									className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									Download CSV
								</button>
								<button
									onClick={migrateRSVPIds}
									className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
									title="Update existing RSVP IDs to 8-digit format"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									Migrate IDs
								</button>
								<button
									onClick={fetchRSVPs}
									className="bg-forest-green text-white px-4 py-2 rounded-lg hover:bg-sage-green transition-colors"
								>
									Refresh RSVPs
								</button>
							</div>
						</div>

						{/* RSVP Stats Summary */}
						{rsvpStats && (
							<div className="bg-white p-6 rounded-lg shadow">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Response Summary
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
									<div>
										<p className="text-2xl font-bold text-green-600">
											{rsvpStats.attending}
										</p>
										<p className="text-sm text-gray-600">Attending</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-red-600">
											{rsvpStats.notAttending}
										</p>
										<p className="text-sm text-gray-600">Not Attending</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-yellow-600">
											{rsvpStats.maybe}
										</p>
										<p className="text-sm text-gray-600">Maybe</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-blue-600">
											{rsvpStats.both}
										</p>
										<p className="text-sm text-gray-600">Both Events</p>
									</div>
									<div>
										<p className="text-2xl font-bold text-forest-green">
											{rsvpStats.totalGuestCount}
										</p>
										<p className="text-sm text-gray-600">Total Guests</p>
									</div>
								</div>
							</div>
						)}

						{/* RSVP Filters */}
						<div className="bg-white p-4 rounded-lg shadow">
							<div className="flex flex-wrap gap-2">
								{[
									"all",
									"attending",
									"not-attending",
									"maybe",
									"responded",
									"pending",
								].map((status) => (
									<button
										key={status}
										onClick={() => setRSVPFilter(status as any)}
										className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
											rsvpFilter === status
												? "bg-forest-green text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
									>
										{status.charAt(0).toUpperCase() +
											status.slice(1).replace("-", " ")}
									</button>
								))}
							</div>
						</div>

						{/* RSVP Table */}
						<div className="bg-white shadow rounded-lg overflow-hidden">
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Guest Name
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Contact
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Attendance
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Event Type
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Guests
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Responded
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{filteredRSVPs.map((rsvp) => (
											<tr key={rsvp.id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm font-medium text-gray-900">
														{rsvp.primaryGuest.name}
													</div>
													{rsvp.primaryGuest.dietaryRestrictions && (
														<div className="text-xs text-gray-500">
															Dietary: {rsvp.primaryGuest.dietaryRestrictions}
														</div>
													)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900">
														{rsvp.primaryGuest.email}
													</div>
													<div className="text-sm text-gray-500">
														{rsvp.primaryGuest.phone}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span
														className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAttendanceColor(
															rsvp.attendance
														)}`}
													>
														{rsvp.attendance.replace("-", " ")}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{rsvp.eventType}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{rsvp.numberOfGuests}
													{rsvp.guests.length > 1 && (
														<div className="text-xs">
															{rsvp.guests.slice(1).map((guest, idx) => (
																<div key={idx}>{guest.name}</div>
															))}
														</div>
													)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span
														className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
															rsvp.responded
																? "bg-green-100 text-green-800"
																: "bg-red-100 text-red-800"
														}`}
													>
														{rsvp.responded ? "Yes" : "Pending"}
													</span>
													{rsvp.confirmedAt && (
														<div className="text-xs text-gray-500 mt-1">
															{new Date(rsvp.confirmedAt).toLocaleDateString()}
														</div>
													)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
													<select
														value={rsvp.attendance}
														onChange={(e) =>
															updateRSVPStatus(rsvp.id!, {
																attendance: e.target
																	.value as RSVP["attendance"],
															})
														}
														className="text-xs border-gray-300 rounded-md"
													>
														<option value="attending">Attending</option>
														<option value="not-attending">Not Attending</option>
														<option value="maybe">Maybe</option>
													</select>
													<button
														onClick={() => deleteRSVP(rsvp.id!)}
														className="text-red-600 hover:text-red-800 text-xs"
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{filteredRSVPs.length === 0 && (
								<div className="text-center py-12">
									<p className="text-gray-500">
										No RSVPs found for the selected filter.
									</p>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Payments Tab */}
				{activeTab === "payments" && (
					<div className="space-y-6">
						<h2 className="text-xl font-bold text-gray-900">
							Payment Tracking
						</h2>

						{/* Payment Stats */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<div className="bg-white p-6 rounded-lg shadow">
								<h3 className="text-sm font-medium text-gray-500">
									Total Revenue
								</h3>
								<p className="text-2xl font-bold text-forest-green">
									{formatPrice(
										orders.reduce((sum, order) => sum + order.totalAmount, 0)
									)}
								</p>
							</div>
							<div className="bg-white p-6 rounded-lg shadow">
								<h3 className="text-sm font-medium text-gray-500">
									Completed Payments
								</h3>
								<p className="text-2xl font-bold text-green-600">
									{formatPrice(
										orders
											.filter((o) => o.paymentStatus === "completed")
											.reduce((sum, order) => sum + order.totalAmount, 0)
									)}
								</p>
							</div>
							<div className="bg-white p-6 rounded-lg shadow">
								<h3 className="text-sm font-medium text-gray-500">
									Pending Payments
								</h3>
								<p className="text-2xl font-bold text-yellow-600">
									{formatPrice(
										orders
											.filter((o) => o.paymentStatus === "pending")
											.reduce((sum, order) => sum + order.totalAmount, 0)
									)}
								</p>
							</div>
							<div className="bg-white p-6 rounded-lg shadow">
								<h3 className="text-sm font-medium text-gray-500">
									Failed Payments
								</h3>
								<p className="text-2xl font-bold text-red-600">
									{formatPrice(
										orders
											.filter((o) => o.paymentStatus === "failed")
											.reduce((sum, order) => sum + order.totalAmount, 0)
									)}
								</p>
							</div>
						</div>

						{/* Payment Methods Breakdown */}
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								Payment Methods
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="text-center">
									<p className="text-2xl font-bold text-blue-600">
										{orders.filter((o) => o.paymentMethod === "stripe").length}
									</p>
									<p className="text-sm text-gray-600">Stripe Payments</p>
									<p className="text-lg font-semibold text-gray-900 mt-2">
										{formatPrice(
											orders
												.filter((o) => o.paymentMethod === "stripe")
												.reduce((sum, order) => sum + order.totalAmount, 0)
										)}
									</p>
								</div>
								<div className="text-center">
									<p className="text-2xl font-bold text-yellow-600">
										{orders.filter((o) => o.paymentMethod === "paypal").length}
									</p>
									<p className="text-sm text-gray-600">PayPal Payments</p>
									<p className="text-lg font-semibold text-gray-900 mt-2">
										{formatPrice(
											orders
												.filter((o) => o.paymentMethod === "paypal")
												.reduce((sum, order) => sum + order.totalAmount, 0)
										)}
									</p>
								</div>
							</div>
						</div>

						{/* Recent Payments */}
						<div className="bg-white shadow rounded-lg overflow-hidden">
							<div className="px-6 py-4 border-b border-gray-200">
								<h3 className="text-lg font-semibold text-gray-900">
									Recent Payments
								</h3>
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Order ID
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Customer
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Amount
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Method
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Status
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Date
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Payment ID
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{orders
											.sort(
												(a, b) =>
													new Date(b.createdAt).getTime() -
													new Date(a.createdAt).getTime()
											)
											.slice(0, 10)
											.map((order) => (
												<tr key={order.id} className="hover:bg-gray-50">
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
														{order.orderId}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
														{order.customerInfo.firstName}{" "}
														{order.customerInfo.lastName}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
														{formatPrice(order.totalAmount)}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{order.paymentMethod.toUpperCase()}
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<span
															className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(
																order.paymentStatus
															)}`}
														>
															{order.paymentStatus}
														</span>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{new Date(order.createdAt).toLocaleDateString()}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
														{order.paymentId || "N/A"}
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}

				{/* Videos Tab */}
				{activeTab === "videos" && (
					<div className="space-y-6">
						<VideoUpload />
					</div>
				)}
			</div>
		</div>
	);
}
