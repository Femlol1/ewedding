"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Truck, X } from "lucide-react";
import { useState } from "react";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	size: string;
	color: string;
	category: string;
}

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
	cartItems: CartItem[];
	onOrderSuccess: () => void;
}

export default function CheckoutModal({
	isOpen,
	onClose,
	cartItems,
	onOrderSuccess,
}: CheckoutModalProps) {
	const [formData, setFormData] = useState({
		customerName: "",
		customerEmail: "",
		customerPhone: "",
		deliveryAddress: "",
		notes: "",
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const totalAmount = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.customerName.trim()) {
			newErrors.customerName = "Name is required";
		}

		if (!formData.customerEmail.trim()) {
			newErrors.customerEmail = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
			newErrors.customerEmail = "Invalid email format";
		}

		if (!formData.customerPhone.trim()) {
			newErrors.customerPhone = "Phone number is required";
		} else if (formData.customerPhone.length < 10) {
			newErrors.customerPhone = "Phone number must be at least 10 digits";
		}

		if (!formData.deliveryAddress.trim()) {
			newErrors.deliveryAddress = "Delivery address is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);

		try {
			const orderData = {
				...formData,
				items: cartItems.map((item) => ({
					itemId: item.id,
					itemName: item.name,
					quantity: item.quantity,
					size: item.size,
					color: item.color,
					price: item.price,
				})),
				totalAmount,
			};

			const response = await fetch("/api/asoebi", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(orderData),
			});

			if (response.ok) {
				const result = await response.json();
				alert(
					"Order placed successfully! We will contact you soon to confirm your order."
				);
				onOrderSuccess();
				onClose();
			} else {
				const errorData = await response.json();
				alert(`Failed to place order: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Failed to place order:", error);
			alert("Failed to place order. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<Card className="border-0 shadow-2xl">
					<CardHeader className="flex flex-row items-center justify-between border-b">
						<CardTitle className="flex items-center gap-2">
							<ShoppingCart className="w-6 h-6" />
							Checkout - Asoebi Order
						</CardTitle>
						<Button variant="ghost" size="sm" onClick={onClose}>
							<X className="w-5 h-5" />
						</Button>
					</CardHeader>
					<CardContent className="p-6">
						{/* Order Summary */}
						<div className="mb-6">
							<h3 className="text-lg font-semibold mb-4">Order Summary</h3>
							<div className="bg-gray-50 rounded-lg p-4">
								{cartItems.map((item) => (
									<div
										key={`${item.id}-${item.size}-${item.color}`}
										className="flex justify-between items-center py-2 border-b last:border-b-0"
									>
										<div>
											<div className="font-medium">{item.name}</div>
											<div className="text-sm text-gray-600">
												Size: {item.size} | Color: {item.color} | Qty:{" "}
												{item.quantity}
											</div>
										</div>
										<div className="font-semibold">
											{formatPrice(item.price * item.quantity)}
										</div>
									</div>
								))}
								<div className="flex justify-between items-center pt-4 text-lg font-bold">
									<span>Total:</span>
									<span className="text-blush-500">
										{formatPrice(totalAmount)}
									</span>
								</div>
							</div>
						</div>

						{/* Customer Information Form */}
						<form onSubmit={handleSubmit}>
							<h3 className="text-lg font-semibold mb-4">
								Customer Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<Label htmlFor="customerName">Full Name *</Label>
									<Input
										id="customerName"
										name="customerName"
										value={formData.customerName}
										onChange={handleInputChange}
										className={errors.customerName ? "border-red-500" : ""}
										placeholder="Enter your full name"
									/>
									{errors.customerName && (
										<p className="text-red-500 text-sm mt-1">
											{errors.customerName}
										</p>
									)}
								</div>

								<div>
									<Label htmlFor="customerPhone">Phone Number *</Label>
									<Input
										id="customerPhone"
										name="customerPhone"
										value={formData.customerPhone}
										onChange={handleInputChange}
										className={errors.customerPhone ? "border-red-500" : ""}
										placeholder="+234 123 456 7890"
									/>
									{errors.customerPhone && (
										<p className="text-red-500 text-sm mt-1">
											{errors.customerPhone}
										</p>
									)}
								</div>
							</div>

							<div className="mb-4">
								<Label htmlFor="customerEmail">Email Address *</Label>
								<Input
									id="customerEmail"
									name="customerEmail"
									type="email"
									value={formData.customerEmail}
									onChange={handleInputChange}
									className={errors.customerEmail ? "border-red-500" : ""}
									placeholder="your.email@example.com"
								/>
								{errors.customerEmail && (
									<p className="text-red-500 text-sm mt-1">
										{errors.customerEmail}
									</p>
								)}
							</div>

							<div className="mb-4">
								<Label htmlFor="deliveryAddress">Delivery Address *</Label>
								<textarea
									id="deliveryAddress"
									name="deliveryAddress"
									value={formData.deliveryAddress}
									onChange={handleInputChange}
									className={`w-full p-2 border rounded-md ${
										errors.deliveryAddress
											? "border-red-500"
											: "border-gray-300"
									}`}
									rows={3}
									placeholder="Enter your complete delivery address"
								/>
								{errors.deliveryAddress && (
									<p className="text-red-500 text-sm mt-1">
										{errors.deliveryAddress}
									</p>
								)}
							</div>

							<div className="mb-6">
								<Label htmlFor="notes">Special Notes (Optional)</Label>
								<textarea
									id="notes"
									name="notes"
									value={formData.notes}
									onChange={handleInputChange}
									className="w-full p-2 border border-gray-300 rounded-md"
									rows={2}
									placeholder="Any special requirements or notes for your order"
								/>
							</div>

							{/* Delivery Info */}
							<div className="bg-blue-50 rounded-lg p-4 mb-6">
								<div className="flex items-center gap-2 mb-2">
									<Truck className="w-5 h-5 text-blue-600" />
									<span className="font-semibold text-blue-800">
										Delivery Information
									</span>
								</div>
								<ul className="text-sm text-blue-700 space-y-1">
									<li>
										• Free delivery within Lagos and Abuja for orders above
										₦20,000
									</li>
									<li>• Delivery time: 5-7 business days</li>
									<li>• We will contact you to confirm delivery details</li>
									<li>
										• Payment can be made on delivery or via bank transfer
									</li>
								</ul>
							</div>

							{/* Submit Button */}
							<div className="flex gap-4">
								<Button
									type="button"
									variant="outline"
									onClick={onClose}
									className="flex-1"
									disabled={loading}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="flex-1 bg-blush-500 hover:bg-blush-600"
									disabled={loading}
								>
									{loading ? "Placing Order..." : "Place Order"}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
