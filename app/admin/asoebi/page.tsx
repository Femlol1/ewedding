"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Calendar,
	Check,
	DollarSign,
	Eye,
	Mail,
	MapPin,
	Package,
	Phone,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AsoebiOrder {
	id: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	items: {
		itemId: string;
		itemName: string;
		quantity: number;
		size: string;
		color: string;
		price: number;
	}[];
	totalAmount: number;
	deliveryAddress: string;
	orderDate: string;
	status: "pending" | "confirmed" | "processing" | "delivered" | "cancelled";
	paymentStatus: "pending" | "paid" | "failed";
	notes?: string;
}

export default function AsoebiOrdersAdmin() {
	const [orders, setOrders] = useState<AsoebiOrder[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			const response = await fetch("/api/asoebi");
			if (response.ok) {
				const data = await response.json();
				setOrders(data);
			}
		} catch (error) {
			console.error("Failed to fetch orders:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateOrderStatus = async (
		orderId: string,
		status: string,
		paymentStatus?: string
	) => {
		try {
			const response = await fetch("/api/asoebi", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: orderId,
					status,
					...(paymentStatus && { paymentStatus }),
				}),
			});

			if (response.ok) {
				await fetchOrders();
			} else {
				alert("Failed to update order status");
			}
		} catch (error) {
			console.error("Failed to update order:", error);
			alert("Failed to update order status");
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-500";
			case "confirmed":
				return "bg-blue-500";
			case "processing":
				return "bg-purple-500";
			case "delivered":
				return "bg-green-500";
			case "cancelled":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const getPaymentStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-500";
			case "paid":
				return "bg-green-500";
			case "failed":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const filteredOrders =
		selectedStatus === "all"
			? orders
			: orders.filter((order) => order.status === selectedStatus);

	const getTotalOrderValue = () => {
		return orders.reduce((sum, order) => sum + order.totalAmount, 0);
	};

	const getOrderCountByStatus = (status: string) => {
		return orders.filter((order) => order.status === status).length;
	};

	if (loading) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center">Loading asoebi orders...</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Asoebi Orders Management</h1>
				<p className="text-gray-600">
					Manage all asoebi orders for the wedding
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<Package className="h-8 w-8 text-blue-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">
									Total Orders
								</p>
								<p className="text-2xl font-bold">{orders.length}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<DollarSign className="h-8 w-8 text-green-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Total Value</p>
								<p className="text-2xl font-bold">
									{formatPrice(getTotalOrderValue())}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<Check className="h-8 w-8 text-purple-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Confirmed</p>
								<p className="text-2xl font-bold">
									{getOrderCountByStatus("confirmed")}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<Calendar className="h-8 w-8 text-yellow-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Pending</p>
								<p className="text-2xl font-bold">
									{getOrderCountByStatus("pending")}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Status Filter */}
			<div className="flex gap-2 mb-6">
				{[
					"all",
					"pending",
					"confirmed",
					"processing",
					"delivered",
					"cancelled",
				].map((status) => (
					<Button
						key={status}
						variant={selectedStatus === status ? "default" : "outline"}
						onClick={() => setSelectedStatus(status)}
						className="capitalize"
					>
						{status === "all" ? "All Orders" : status}
						{status !== "all" && (
							<Badge variant="secondary" className="ml-2">
								{getOrderCountByStatus(status)}
							</Badge>
						)}
					</Button>
				))}
			</div>

			{/* Orders List */}
			<div className="space-y-4">
				{filteredOrders.length === 0 ? (
					<Card>
						<CardContent className="p-8 text-center">
							<Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<p className="text-gray-500">
								No orders found for the selected filter.
							</p>
						</CardContent>
					</Card>
				) : (
					filteredOrders.map((order) => (
						<Card key={order.id} className="border-l-4 border-l-purple-500">
							<CardHeader className="pb-3">
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="text-lg">
											Order #{order.id.slice(-8).toUpperCase()}
										</CardTitle>
										<p className="text-sm text-gray-600 mt-1">
											<Calendar className="w-4 h-4 inline mr-1" />
											{formatDate(order.orderDate)}
										</p>
									</div>
									<div className="flex gap-2">
										<Badge
											className={`${getStatusColor(order.status)} text-white`}
										>
											{order.status}
										</Badge>
										<Badge
											className={`${getPaymentStatusColor(
												order.paymentStatus
											)} text-white`}
										>
											{order.paymentStatus}
										</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
									<div>
										<h4 className="font-semibold mb-2">Customer Details</h4>
										<p className="text-sm">{order.customerName}</p>
										<p className="text-sm text-gray-600 flex items-center">
											<Mail className="w-3 h-3 mr-1" />
											{order.customerEmail}
										</p>
										<p className="text-sm text-gray-600 flex items-center">
											<Phone className="w-3 h-3 mr-1" />
											{order.customerPhone}
										</p>
									</div>

									<div>
										<h4 className="font-semibold mb-2">Delivery Address</h4>
										<p className="text-sm text-gray-600 flex items-start">
											<MapPin className="w-3 h-3 mr-1 mt-0.5" />
											{order.deliveryAddress}
										</p>
									</div>

									<div>
										<h4 className="font-semibold mb-2">Order Summary</h4>
										<p className="text-sm">Items: {order.items.length}</p>
										<p className="text-sm">
											Total:{" "}
											<span className="font-semibold text-purple-600">
												{formatPrice(order.totalAmount)}
											</span>
										</p>
									</div>
								</div>

								{/* Order Items */}
								<div className="mb-4">
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setExpandedOrder(
												expandedOrder === order.id ? null : order.id
											)
										}
										className="flex items-center gap-2"
									>
										<Eye className="w-4 h-4" />
										{expandedOrder === order.id ? "Hide" : "View"} Items
									</Button>

									{expandedOrder === order.id && (
										<div className="mt-3 bg-gray-50 rounded-lg p-4">
											<h5 className="font-semibold mb-3">Ordered Items:</h5>
											<div className="space-y-2">
												{order.items.map((item, index) => (
													<div
														key={index}
														className="flex justify-between items-center py-2 border-b last:border-b-0"
													>
														<div>
															<span className="font-medium">
																{item.itemName}
															</span>
															<div className="text-sm text-gray-600">
																Size: {item.size} | Color: {item.color} | Qty:{" "}
																{item.quantity}
															</div>
														</div>
														<span className="font-semibold">
															{formatPrice(item.price * item.quantity)}
														</span>
													</div>
												))}
											</div>
											{order.notes && (
												<div className="mt-3 pt-3 border-t">
													<h6 className="font-semibold text-sm">Notes:</h6>
													<p className="text-sm text-gray-600 mt-1">
														{order.notes}
													</p>
												</div>
											)}
										</div>
									)}
								</div>

								{/* Action Buttons */}
								<div className="flex flex-wrap gap-2">
									{order.status === "pending" && (
										<Button
											size="sm"
											className="bg-blue-600 hover:bg-blue-700"
											onClick={() => updateOrderStatus(order.id, "confirmed")}
										>
											<Check className="w-4 h-4 mr-1" />
											Confirm Order
										</Button>
									)}

									{order.status === "confirmed" && (
										<Button
											size="sm"
											className="bg-purple-600 hover:bg-purple-700"
											onClick={() => updateOrderStatus(order.id, "processing")}
										>
											Start Processing
										</Button>
									)}

									{order.status === "processing" && (
										<Button
											size="sm"
											className="bg-green-600 hover:bg-green-700"
											onClick={() => updateOrderStatus(order.id, "delivered")}
										>
											Mark as Delivered
										</Button>
									)}

									{order.paymentStatus === "pending" && (
										<Button
											size="sm"
											variant="outline"
											className="border-green-600 text-green-600 hover:bg-green-50"
											onClick={() =>
												updateOrderStatus(order.id, order.status, "paid")
											}
										>
											Mark as Paid
										</Button>
									)}

									{order.status !== "cancelled" &&
										order.status !== "delivered" && (
											<Button
												size="sm"
												variant="outline"
												className="border-red-600 text-red-600 hover:bg-red-50"
												onClick={() => updateOrderStatus(order.id, "cancelled")}
											>
												<X className="w-4 h-4 mr-1" />
												Cancel Order
											</Button>
										)}
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
