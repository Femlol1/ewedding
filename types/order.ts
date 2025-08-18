export interface OrderItem {
	id: number;
	name: string;
	price: string;
	priceNumber: number;
	quantity: number;
	size: string;
	color: string;
	image: string;
	category: string;
}

export interface CustomerInfo {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
}

export interface Order {
	id?: string;
	orderId: string;
	customerInfo: CustomerInfo;
	items: OrderItem[];
	totalAmount: number;
	currency: string;
	paymentMethod: "stripe" | "paypal";
	paymentStatus: "pending" | "completed" | "failed" | "refunded";
	orderStatus:
		| "pending"
		| "confirmed"
		| "processing"
		| "shipped"
		| "delivered"
		| "cancelled";
	createdAt: Date;
	updatedAt: Date;
	paymentId?: string;
	notes?: string;
}

export interface PaymentResult {
	success: boolean;
	paymentId?: string;
	orderId?: string;
	error?: string;
}
