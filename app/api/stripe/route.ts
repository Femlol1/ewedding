import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { OrderService } from "../../../services/orderService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-07-30.basil",
});

export async function POST(request: NextRequest) {
	try {
		const { orderId, amount, currency = "ngn" } = await request.json();

		if (!orderId || !amount) {
			return NextResponse.json(
				{ error: "Order ID and amount are required" },
				{ status: 400 }
			);
		}

		// Create payment intent with Stripe
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100), // Convert to kobo (smallest currency unit)
			currency: currency.toLowerCase(),
			automatic_payment_methods: {
				enabled: true,
			},
			metadata: {
				orderId: orderId,
			},
		});

		return NextResponse.json({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id,
		});
	} catch (error) {
		console.error("Stripe payment intent creation error:", error);
		return NextResponse.json(
			{ error: "Failed to create payment intent" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const { paymentIntentId, orderId, status } = await request.json();

		if (!paymentIntentId || !orderId || !status) {
			return NextResponse.json(
				{ error: "Payment intent ID, order ID, and status are required" },
				{ status: 400 }
			);
		}

		// Update order payment status in Firebase
		await OrderService.updatePaymentStatus(
			orderId,
			status === "succeeded" ? "completed" : "failed",
			paymentIntentId
		);

		// If payment succeeded, update order status to confirmed
		if (status === "succeeded") {
			await OrderService.updateOrderStatus(orderId, "confirmed");
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Payment status update error:", error);
		return NextResponse.json(
			{ error: "Failed to update payment status" },
			{ status: 500 }
		);
	}
}
