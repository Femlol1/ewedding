import { db } from "@/lib/firebase";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

interface AsoebiOrder {
	id?: string;
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

// GET - Fetch all asoebi orders
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const status = searchParams.get("status");

		const ordersCollection = collection(db, "asoebi_orders");
		const ordersSnapshot = await getDocs(ordersCollection);

		let orders: AsoebiOrder[] = ordersSnapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<AsoebiOrder, "id">),
		}));

		// Filter by status if provided
		if (status) {
			orders = orders.filter((order) => order.status === status);
		}

		// Sort by order date (newest first)
		orders.sort(
			(a, b) =>
				new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
		);

		return NextResponse.json(orders);
	} catch (error) {
		console.error("Failed to fetch asoebi orders:", error);
		return NextResponse.json(
			{ error: "Failed to fetch asoebi orders." },
			{ status: 500 }
		);
	}
}

// POST - Create a new asoebi order
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			customerName,
			customerEmail,
			customerPhone,
			items,
			totalAmount,
			deliveryAddress,
			notes,
		} = body;

		// Validate required fields
		if (
			!customerName ||
			!customerEmail ||
			!customerPhone ||
			!items ||
			items.length === 0 ||
			!totalAmount ||
			!deliveryAddress
		) {
			return NextResponse.json(
				{
					error:
						"Missing required fields: customerName, customerEmail, customerPhone, items, totalAmount, deliveryAddress",
				},
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(customerEmail)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 }
			);
		}

		// Validate phone number (basic validation)
		if (customerPhone.length < 10) {
			return NextResponse.json(
				{ error: "Invalid phone number" },
				{ status: 400 }
			);
		}

		const asoebiOrder: Omit<AsoebiOrder, "id"> = {
			customerName,
			customerEmail,
			customerPhone,
			items,
			totalAmount,
			deliveryAddress,
			orderDate: new Date().toISOString(),
			status: "pending",
			paymentStatus: "pending",
			notes: notes || "",
		};

		const ordersCollection = collection(db, "asoebi_orders");
		const docRef = await addDoc(ordersCollection, asoebiOrder);

		// Return the created order with ID
		const createdOrder: AsoebiOrder = {
			id: docRef.id,
			...asoebiOrder,
		};

		return NextResponse.json({
			success: true,
			order: createdOrder,
			message:
				"Order placed successfully! We will contact you soon to confirm your order.",
		});
	} catch (error) {
		console.error("Failed to create asoebi order:", error);
		return NextResponse.json(
			{ error: "Failed to create asoebi order." },
			{ status: 500 }
		);
	}
}

// PUT - Update asoebi order status
export async function PUT(req: NextRequest) {
	try {
		const body = await req.json();
		const { id, status, paymentStatus, notes } = body;

		if (!id) {
			return NextResponse.json(
				{ error: "Order ID is required" },
				{ status: 400 }
			);
		}

		const updateData: Partial<AsoebiOrder> = {};

		if (status) updateData.status = status;
		if (paymentStatus) updateData.paymentStatus = paymentStatus;
		if (notes !== undefined) updateData.notes = notes;

		if (Object.keys(updateData).length === 0) {
			return NextResponse.json(
				{ error: "No valid fields to update" },
				{ status: 400 }
			);
		}

		const orderRef = doc(db, "asoebi_orders", id);
		await updateDoc(orderRef, updateData);

		return NextResponse.json({
			success: true,
			message: "Order updated successfully",
		});
	} catch (error) {
		console.error("Failed to update asoebi order:", error);
		return NextResponse.json(
			{ error: "Failed to update asoebi order." },
			{ status: 500 }
		);
	}
}
