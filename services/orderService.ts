import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	Timestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { CustomerInfo, Order, OrderItem } from "../types/order";

const ORDERS_COLLECTION = "orders";

export class OrderService {
	// Create a new order
	static async createOrder(
		customerInfo: CustomerInfo,
		items: OrderItem[],
		paymentMethod: "stripe" | "paypal"
	): Promise<string> {
		try {
			const totalAmount = items.reduce(
				(sum, item) => sum + item.priceNumber * item.quantity,
				0
			);
			const orderId = `ORD-${Date.now()}-${Math.random()
				.toString(36)
				.substr(2, 9)}`;

			const order: Omit<Order, "id"> = {
				orderId,
				customerInfo,
				items,
				totalAmount,
				currency: "NGN",
				paymentMethod,
				paymentStatus: "pending",
				orderStatus: "pending",
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
				...order,
				createdAt: Timestamp.fromDate(order.createdAt),
				updatedAt: Timestamp.fromDate(order.updatedAt),
			});

			return docRef.id;
		} catch (error) {
			console.error("Error creating order:", error);
			throw new Error("Failed to create order");
		}
	}

	// Update order payment status
	static async updatePaymentStatus(
		orderId: string,
		paymentStatus: Order["paymentStatus"],
		paymentId?: string
	): Promise<void> {
		try {
			const orderRef = doc(db, ORDERS_COLLECTION, orderId);
			await updateDoc(orderRef, {
				paymentStatus,
				paymentId: paymentId || null,
				updatedAt: Timestamp.fromDate(new Date()),
			});
		} catch (error) {
			console.error("Error updating payment status:", error);
			throw new Error("Failed to update payment status");
		}
	}

	// Update order status
	static async updateOrderStatus(
		orderId: string,
		orderStatus: Order["orderStatus"]
	): Promise<void> {
		try {
			const orderRef = doc(db, ORDERS_COLLECTION, orderId);
			await updateDoc(orderRef, {
				orderStatus,
				updatedAt: Timestamp.fromDate(new Date()),
			});
		} catch (error) {
			console.error("Error updating order status:", error);
			throw new Error("Failed to update order status");
		}
	}

	// Get order by ID
	static async getOrder(orderId: string): Promise<Order | null> {
		try {
			const orderRef = doc(db, ORDERS_COLLECTION, orderId);
			const orderSnap = await getDoc(orderRef);

			if (orderSnap.exists()) {
				const data = orderSnap.data();
				return {
					id: orderSnap.id,
					...data,
					createdAt: data.createdAt.toDate(),
					updatedAt: data.updatedAt.toDate(),
				} as Order;
			}
			return null;
		} catch (error) {
			console.error("Error getting order:", error);
			throw new Error("Failed to get order");
		}
	}

	// Get orders by customer email
	static async getOrdersByEmail(email: string): Promise<Order[]> {
		try {
			const q = query(
				collection(db, ORDERS_COLLECTION),
				where("customerInfo.email", "==", email),
				orderBy("createdAt", "desc")
			);

			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				createdAt: doc.data().createdAt.toDate(),
				updatedAt: doc.data().updatedAt.toDate(),
			})) as Order[];
		} catch (error) {
			console.error("Error getting orders by email:", error);
			throw new Error("Failed to get orders");
		}
	}

	// Get all orders (admin function)
	static async getAllOrders(limitCount: number = 50): Promise<Order[]> {
		try {
			const q = query(
				collection(db, ORDERS_COLLECTION),
				orderBy("createdAt", "desc"),
				limit(limitCount)
			);

			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				createdAt: doc.data().createdAt.toDate(),
				updatedAt: doc.data().updatedAt.toDate(),
			})) as Order[];
		} catch (error) {
			console.error("Error getting all orders:", error);
			throw new Error("Failed to get orders");
		}
	}

	// Get pending orders
	static async getPendingOrders(): Promise<Order[]> {
		try {
			const q = query(
				collection(db, ORDERS_COLLECTION),
				where("orderStatus", "==", "pending"),
				orderBy("createdAt", "desc")
			);

			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				createdAt: doc.data().createdAt.toDate(),
				updatedAt: doc.data().updatedAt.toDate(),
			})) as Order[];
		} catch (error) {
			console.error("Error getting pending orders:", error);
			throw new Error("Failed to get pending orders");
		}
	}

	// Add notes to order
	static async addOrderNotes(orderId: string, notes: string): Promise<void> {
		try {
			const orderRef = doc(db, ORDERS_COLLECTION, orderId);
			await updateDoc(orderRef, {
				notes,
				updatedAt: Timestamp.fromDate(new Date()),
			});
		} catch (error) {
			console.error("Error adding order notes:", error);
			throw new Error("Failed to add order notes");
		}
	}
}
