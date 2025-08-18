"use client";

import { useEffect, useState } from "react";
import { Order } from "../../types/order";

export default function AdminDashboard() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState<
		"all" | "pending" | "confirmed" | "shipped" | "delivered"
	>("all");

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/orders?all=true");
			if (response.ok) {
				const { orders } = await response.json();
				setOrders(orders);
			}
		} catch (error) {
			console.error("Failed to fetch orders:", error);
		} finally {
			setLoading(false);
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

	const filteredOrders =
		filter === "all"
			? orders
			: orders.filter((order) => order.orderStatus === filter);

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

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-forest-green"></div>
					<p className="mt-4 text-lg text-gray-600">Loading orders...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
					<p className="mt-2 text-gray-600">
						Manage Aso Ebi orders and customer information
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
						<p className="text-2xl font-bold text-gray-900">{orders.length}</p>
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
						<h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
						<p className="text-2xl font-bold text-forest-green">
							{formatPrice(
								orders.reduce((sum, order) => sum + order.totalAmount, 0)
							)}
						</p>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white p-4 rounded-lg shadow mb-6">
					<div className="flex flex-wrap gap-2">
						{["all", "pending", "confirmed", "shipped", "delivered"].map(
							(status) => (
								<button
									key={status}
									onClick={() => setFilter(status as any)}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
										filter === status
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
		</div>
	);
}
