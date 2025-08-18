"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { CustomerInfo } from "../types/order";

// Initialize Stripe
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutProps {
	isOpen: boolean;
	onClose: () => void;
}

function CheckoutForm({
	customerInfo,
	onPaymentSuccess,
}: {
	customerInfo: CustomerInfo;
	onPaymentSuccess: (orderId: string) => void;
}) {
	const stripe = useStripe();
	const elements = useElements();
	const { state } = useCart();
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentError, setPaymentError] = useState<string | null>(null);

	const handleStripeSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessing(true);
		setPaymentError(null);

		try {
			// Create order in database first
			const orderResponse = await fetch("/api/orders", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					customerInfo,
					items: state.items,
					paymentMethod: "stripe",
				}),
			});

			if (!orderResponse.ok) {
				throw new Error("Failed to create order");
			}

			const { orderId } = await orderResponse.json();

			// Create payment intent
			const paymentResponse = await fetch("/api/stripe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					orderId,
					amount: state.totalAmount,
					currency: "ngn",
				}),
			});

			if (!paymentResponse.ok) {
				throw new Error("Failed to create payment intent");
			}

			const { clientSecret } = await paymentResponse.json();

			// Confirm payment
			const cardElement = elements.getElement(CardElement);
			if (!cardElement) throw new Error("Card element not found");

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement,
					billing_details: {
						name: `${customerInfo.firstName} ${customerInfo.lastName}`,
						email: customerInfo.email,
						phone: customerInfo.phone,
					},
				},
			});

			if (result.error) {
				setPaymentError(result.error.message || "Payment failed");
			} else {
				// Update payment status
				await fetch("/api/stripe", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						paymentIntentId: result.paymentIntent.id,
						orderId,
						status: result.paymentIntent.status,
					}),
				});

				onPaymentSuccess(orderId);
			}
		} catch (error) {
			console.error("Payment error:", error);
			setPaymentError(
				error instanceof Error ? error.message : "Payment failed"
			);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handleStripeSubmit} className="space-y-4">
			<div className="p-4 border border-champagne-gold/30 rounded-xl bg-warm-white">
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#1a4741",
								"::placeholder": {
									color: "#6b7280",
								},
							},
						},
					}}
				/>
			</div>

			{paymentError && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
					{paymentError}
				</div>
			)}

			<button
				type="submit"
				disabled={!stripe || isProcessing}
				className="w-full bg-gradient-to-r from-forest-green to-sage-green hover:from-sage-green hover:to-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isProcessing
					? "Processing..."
					: `Pay ₦${state.totalAmount.toLocaleString()}`}
			</button>
		</form>
	);
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
	const { state, clearCart } = useCart();
	const [currentStep, setCurrentStep] = useState(1);
	const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: {
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "Nigeria",
		},
	});
	const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">(
		"stripe"
	);
	const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

	useEffect(() => {
		const handleOpenCheckout = () => {
			if (state.items.length > 0) {
				setCurrentStep(1);
			}
		};

		window.addEventListener("openCheckout", handleOpenCheckout);
		return () => window.removeEventListener("openCheckout", handleOpenCheckout);
	}, [state.items.length]);

	if (!isOpen && !orderSuccess) return null;

	const handlePayPalSuccess = async (orderId: string) => {
		setOrderSuccess(orderId);
		clearCart();
	};

	const handleStripeSuccess = async (orderId: string) => {
		setOrderSuccess(orderId);
		clearCart();
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	const isCustomerInfoValid = () => {
		return (
			customerInfo.firstName &&
			customerInfo.lastName &&
			customerInfo.email &&
			customerInfo.phone &&
			customerInfo.address.street &&
			customerInfo.address.city &&
			customerInfo.address.state
		);
	};

	if (orderSuccess) {
		return (
			<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
				<div className="bg-warm-white rounded-3xl max-w-md w-full p-8 text-center">
					<div className="text-6xl mb-4">🎉</div>
					<h3 className="text-2xl font-bold text-forest-green mb-4">
						Order Successful!
					</h3>
					<p className="text-sage-green mb-4">
						Thank you for your order! Your order ID is:
					</p>
					<p className="font-mono text-sm bg-cream p-3 rounded-xl text-forest-green mb-6">
						{orderSuccess}
					</p>
					<p className="text-sage-green text-sm mb-6">
						You will receive a confirmation email shortly with your order
						details and tracking information.
					</p>
					<button
						onClick={() => {
							setOrderSuccess(null);
							onClose();
							setCurrentStep(1);
						}}
						className="w-full bg-gradient-to-r from-forest-green to-sage-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
					>
						Continue Shopping
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
			<div className="bg-warm-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
				{/* Header */}
				<div className="sticky top-0 bg-warm-white rounded-t-3xl p-6 border-b border-champagne-gold/30 flex justify-between items-center">
					<h3 className="text-2xl font-bold text-forest-green">Checkout</h3>
					<button
						onClick={onClose}
						className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center text-warm-white hover:bg-forest-green transition-colors"
					>
						×
					</button>
				</div>

				{/* Steps Indicator */}
				<div className="px-6 py-4 bg-cream">
					<div className="flex items-center justify-center space-x-4">
						{[1, 2, 3].map((step) => (
							<div key={step} className="flex items-center">
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
										currentStep >= step
											? "bg-forest-green text-warm-white"
											: "bg-sage-green/30 text-sage-green"
									}`}
								>
									{step}
								</div>
								{step < 3 && (
									<div
										className={`w-12 h-1 mx-2 ${
											currentStep > step
												? "bg-forest-green"
												: "bg-sage-green/30"
										}`}
									/>
								)}
							</div>
						))}
					</div>
					<div className="flex justify-between text-xs text-sage-green mt-2">
						<span>Customer Info</span>
						<span>Payment Method</span>
						<span>Payment</span>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
					<div className="grid lg:grid-cols-3 gap-6">
						{/* Checkout Form */}
						<div className="lg:col-span-2">
							{currentStep === 1 && (
								<div className="space-y-4">
									<h4 className="text-lg font-semibold text-forest-green mb-4">
										Customer Information
									</h4>

									<div className="grid md:grid-cols-2 gap-4">
										<input
											type="text"
											placeholder="First Name"
											value={customerInfo.firstName}
											onChange={(e) =>
												setCustomerInfo((prev) => ({
													...prev,
													firstName: e.target.value,
												}))
											}
											className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
										/>
										<input
											type="text"
											placeholder="Last Name"
											value={customerInfo.lastName}
											onChange={(e) =>
												setCustomerInfo((prev) => ({
													...prev,
													lastName: e.target.value,
												}))
											}
											className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
										/>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<input
											type="email"
											placeholder="Email Address"
											value={customerInfo.email}
											onChange={(e) =>
												setCustomerInfo((prev) => ({
													...prev,
													email: e.target.value,
												}))
											}
											className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
										/>
										<input
											type="tel"
											placeholder="Phone Number"
											value={customerInfo.phone}
											onChange={(e) =>
												setCustomerInfo((prev) => ({
													...prev,
													phone: e.target.value,
												}))
											}
											className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
										/>
									</div>

									<input
										type="text"
										placeholder="Street Address"
										value={customerInfo.address.street}
										onChange={(e) =>
											setCustomerInfo((prev) => ({
												...prev,
												address: { ...prev.address, street: e.target.value },
											}))
										}
										className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
									/>

									<div className="grid md:grid-cols-3 gap-4">
										<input
											type="text"
											placeholder="City"
											value={customerInfo.address.city}
											onChange={(e) =>
												setCustomerInfo((prev) => ({
													...prev,
													address: { ...prev.address, city: e.target.value },
												}))
											}
											className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
										/>
										<input
											type="text"
											placeholder="State"
											value={customerInfo.address.state}
											onChange={(e) =>
												setCustomerInfo((prev) => ({
													...prev,
													address: { ...prev.address, state: e.target.value },
												}))
											}
											className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
										/>
										<input
											type="text"
											placeholder="ZIP Code"
											value={customerInfo.address.zipCode}
											onChange={(e) =>
												setCustomerInfo((prev) => ({
													...prev,
													address: { ...prev.address, zipCode: e.target.value },
												}))
											}
											className="w-full p-3 border border-champagne-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green"
										/>
									</div>

									<button
										onClick={() => setCurrentStep(2)}
										disabled={!isCustomerInfoValid()}
										className="w-full bg-gradient-to-r from-forest-green to-sage-green hover:from-sage-green hover:to-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Continue to Payment Method
									</button>
								</div>
							)}

							{currentStep === 2 && (
								<div className="space-y-4">
									<h4 className="text-lg font-semibold text-forest-green mb-4">
										Payment Method
									</h4>

									<div className="space-y-3">
										<label className="flex items-center space-x-3 p-4 border border-champagne-gold/30 rounded-xl cursor-pointer hover:bg-cream/50">
											<input
												type="radio"
												name="paymentMethod"
												value="stripe"
												checked={paymentMethod === "stripe"}
												onChange={(e) =>
													setPaymentMethod(e.target.value as "stripe")
												}
												className="text-forest-green"
											/>
											<div className="flex items-center space-x-2">
												<span className="font-semibold text-forest-green">
													Credit/Debit Card
												</span>
												<span className="text-xs text-sage-green">
													(Stripe)
												</span>
											</div>
										</label>

										<label className="flex items-center space-x-3 p-4 border border-champagne-gold/30 rounded-xl cursor-pointer hover:bg-cream/50">
											<input
												type="radio"
												name="paymentMethod"
												value="paypal"
												checked={paymentMethod === "paypal"}
												onChange={(e) =>
													setPaymentMethod(e.target.value as "paypal")
												}
												className="text-forest-green"
											/>
											<div className="flex items-center space-x-2">
												<span className="font-semibold text-forest-green">
													PayPal
												</span>
												<span className="text-xs text-sage-green">
													(International)
												</span>
											</div>
										</label>
									</div>

									<div className="flex gap-3">
										<button
											onClick={() => setCurrentStep(1)}
											className="flex-1 bg-sage-green hover:bg-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-colors"
										>
											Back
										</button>
										<button
											onClick={() => setCurrentStep(3)}
											className="flex-1 bg-gradient-to-r from-forest-green to-sage-green hover:from-sage-green hover:to-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
										>
											Continue to Payment
										</button>
									</div>
								</div>
							)}

							{currentStep === 3 && (
								<div className="space-y-4">
									<h4 className="text-lg font-semibold text-forest-green mb-4">
										Payment
									</h4>

									{paymentMethod === "stripe" ? (
										<Elements stripe={stripePromise}>
											<CheckoutForm
												customerInfo={customerInfo}
												onPaymentSuccess={handleStripeSuccess}
											/>
										</Elements>
									) : (
										<PayPalScriptProvider
											options={{
												clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
												currency: "USD",
											}}
										>
											<PayPalButtons
												style={{ layout: "vertical" }}
												createOrder={async () => {
													// Create order in database first
													const orderResponse = await fetch("/api/orders", {
														method: "POST",
														headers: { "Content-Type": "application/json" },
														body: JSON.stringify({
															customerInfo,
															items: state.items,
															paymentMethod: "paypal",
														}),
													});

													const { orderId } = await orderResponse.json();

													// Create PayPal order
													const paypalResponse = await fetch("/api/paypal", {
														method: "POST",
														headers: { "Content-Type": "application/json" },
														body: JSON.stringify({
															orderId,
															amount: state.totalAmount,
															currency: "NGN",
														}),
													});

													const { orderID } = await paypalResponse.json();
													return orderID;
												}}
												onApprove={async (data) => {
													// Handle successful payment
													handlePayPalSuccess(data.orderID!);
												}}
											/>
										</PayPalScriptProvider>
									)}

									<button
										onClick={() => setCurrentStep(2)}
										className="w-full bg-sage-green hover:bg-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-colors"
									>
										Back to Payment Method
									</button>
								</div>
							)}
						</div>

						{/* Order Summary */}
						<div className="lg:col-span-1">
							<div className="bg-cream rounded-2xl p-6 sticky top-0">
								<h4 className="text-lg font-semibold text-forest-green mb-4">
									Order Summary
								</h4>

								<div className="space-y-3 mb-4">
									{state.items.map((item) => (
										<div
											key={item.cartId}
											className="flex justify-between items-start text-sm"
										>
											<div className="flex-1">
												<p className="font-semibold text-forest-green">
													{item.name}
												</p>
												<p className="text-sage-green text-xs">
													{item.size} | {item.color} | Qty: {item.quantity}
												</p>
											</div>
											<p className="font-semibold text-champagne-gold ml-2">
												{formatPrice(item.priceNumber * item.quantity)}
											</p>
										</div>
									))}
								</div>

								<div className="border-t border-champagne-gold/30 pt-4">
									<div className="flex justify-between items-center text-lg font-bold">
										<span className="text-forest-green">Total:</span>
										<span className="text-champagne-gold">
											{formatPrice(state.totalAmount)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
