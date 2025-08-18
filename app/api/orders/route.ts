import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "../../../services/orderService";
import { CustomerInfo, OrderItem } from "../../../types/order";

export async function POST(request: NextRequest) {
	try {
		const { customerInfo, items, paymentMethod } = await request.json();

		// Validate required fields
		if (!customerInfo || !items || !paymentMethod) {
			return NextResponse.json(
				{ error: "Customer info, items, and payment method are required" },
				{ status: 400 }
			);
		}

		// Validate customer info
		const requiredCustomerFields = ["firstName", "lastName", "email", "phone"];
		for (const field of requiredCustomerFields) {
			if (!customerInfo[field]) {
				return NextResponse.json(
					{ error: `${field} is required in customer info` },
					{ status: 400 }
				);
			}
		}

		// Validate items
		if (!Array.isArray(items) || items.length === 0) {
			return NextResponse.json(
				{ error: "At least one item is required" },
				{ status: 400 }
			);
		}

		// Create order in Firebase
		const orderId = await OrderService.createOrder(
			customerInfo as CustomerInfo,
			items as OrderItem[],
			paymentMethod
		);

		return NextResponse.json({
			success: true,
			orderId,
			message: "Order created successfully",
		});
	} catch (error) {
		console.error("Order creation error:", error);
		return NextResponse.json(
			{ error: "Failed to create order" },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const orderId = searchParams.get("orderId");
		const email = searchParams.get("email");
		const getAllOrders = searchParams.get("all") === "true";

		if (orderId) {
			// Get specific order
			const order = await OrderService.getOrder(orderId);
			if (!order) {
				return NextResponse.json({ error: "Order not found" }, { status: 404 });
			}
			return NextResponse.json({ order });
		} else if (email) {
			// Get orders by email
			const orders = await OrderService.getOrdersByEmail(email);
			return NextResponse.json({ orders });
		} else if (getAllOrders) {
			// Get all orders (admin function)
			const orders = await OrderService.getAllOrders();
			return NextResponse.json({ orders });
		} else {
			// Get pending orders by default
			const orders = await OrderService.getPendingOrders();
			return NextResponse.json({ orders });
		}
	} catch (error) {
		console.error("Order retrieval error:", error);
		return NextResponse.json(
			{ error: "Failed to retrieve orders" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const { orderId, orderStatus, notes } = await request.json();

		if (!orderId) {
			return NextResponse.json(
				{ error: "Order ID is required" },
				{ status: 400 }
			);
		}

		if (orderStatus) {
			await OrderService.updateOrderStatus(orderId, orderStatus);
		}

		if (notes) {
			await OrderService.addOrderNotes(orderId, notes);
		}

		return NextResponse.json({
			success: true,
			message: "Order updated successfully",
		});
	} catch (error) {
		console.error("Order update error:", error);
		return NextResponse.json(
			{ error: "Failed to update order" },
			{ status: 500 }
		);
	}
}
