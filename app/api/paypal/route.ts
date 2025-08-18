import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "../../../services/orderService";

const PAYPAL_BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://api-m.paypal.com"
		: "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken() {
	const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
	const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw new Error("PayPal credentials not configured");
	}

	const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

	const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${auth}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "grant_type=client_credentials",
	});

	if (!response.ok) {
		throw new Error("Failed to get PayPal access token");
	}

	const data = await response.json();
	return data.access_token;
}

export async function POST(request: NextRequest) {
	try {
		const { orderId, amount, currency = "USD" } = await request.json();

		if (!orderId || !amount) {
			return NextResponse.json(
				{ error: "Order ID and amount are required" },
				{ status: 400 }
			);
		}

		const accessToken = await getPayPalAccessToken();

		// Convert NGN to USD (approximate rate - you should use a real exchange rate API)
		const amountInUSD =
			currency === "NGN" ? (amount / 1500).toFixed(2) : amount.toFixed(2);

		const orderData = {
			intent: "CAPTURE",
			purchase_units: [
				{
					reference_id: orderId,
					amount: {
						currency_code: "USD",
						value: amountInUSD,
					},
					description: `Aso Ebi Order #${orderId}`,
				},
			],
			application_context: {
				return_url: `${request.nextUrl.origin}/payment/success`,
				cancel_url: `${request.nextUrl.origin}/payment/cancel`,
			},
		};

		const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderData),
		});

		if (!response.ok) {
			throw new Error("Failed to create PayPal order");
		}

		const order = await response.json();

		return NextResponse.json({
			orderID: order.id,
			approvalUrl: order.links.find((link: any) => link.rel === "approve")
				?.href,
		});
	} catch (error) {
		console.error("PayPal order creation error:", error);
		return NextResponse.json(
			{ error: "Failed to create PayPal order" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const { paypalOrderId, orderId, status } = await request.json();

		if (!paypalOrderId || !orderId || !status) {
			return NextResponse.json(
				{ error: "PayPal order ID, order ID, and status are required" },
				{ status: 400 }
			);
		}

		// Update order payment status in Firebase
		await OrderService.updatePaymentStatus(
			orderId,
			status === "COMPLETED" ? "completed" : "failed",
			paypalOrderId
		);

		// If payment succeeded, update order status to confirmed
		if (status === "COMPLETED") {
			await OrderService.updateOrderStatus(orderId, "confirmed");
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("PayPal payment status update error:", error);
		return NextResponse.json(
			{ error: "Failed to update payment status" },
			{ status: 500 }
		);
	}
}
