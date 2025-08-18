"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { OrderItem } from "../types/order";

interface CartItem extends OrderItem {
	cartId: string;
}

interface CartState {
	items: CartItem[];
	isOpen: boolean;
	totalAmount: number;
	totalItems: number;
}

type CartAction =
	| { type: "ADD_ITEM"; payload: Omit<CartItem, "cartId"> }
	| { type: "REMOVE_ITEM"; payload: string }
	| { type: "UPDATE_QUANTITY"; payload: { cartId: string; quantity: number } }
	| { type: "CLEAR_CART" }
	| { type: "TOGGLE_CART" }
	| { type: "OPEN_CART" }
	| { type: "CLOSE_CART" };

const initialState: CartState = {
	items: [],
	isOpen: false,
	totalAmount: 0,
	totalItems: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_ITEM": {
			const newItem: CartItem = {
				...action.payload,
				cartId: `${action.payload.id}-${action.payload.size}-${
					action.payload.color
				}-${Date.now()}`,
			};

			const updatedItems = [...state.items, newItem];
			const totalAmount = updatedItems.reduce(
				(sum, item) => sum + item.priceNumber * item.quantity,
				0
			);
			const totalItems = updatedItems.reduce(
				(sum, item) => sum + item.quantity,
				0
			);

			return {
				...state,
				items: updatedItems,
				totalAmount,
				totalItems,
			};
		}

		case "REMOVE_ITEM": {
			const updatedItems = state.items.filter(
				(item) => item.cartId !== action.payload
			);
			const totalAmount = updatedItems.reduce(
				(sum, item) => sum + item.priceNumber * item.quantity,
				0
			);
			const totalItems = updatedItems.reduce(
				(sum, item) => sum + item.quantity,
				0
			);

			return {
				...state,
				items: updatedItems,
				totalAmount,
				totalItems,
			};
		}

		case "UPDATE_QUANTITY": {
			const updatedItems = state.items.map((item) =>
				item.cartId === action.payload.cartId
					? { ...item, quantity: Math.max(1, action.payload.quantity) }
					: item
			);
			const totalAmount = updatedItems.reduce(
				(sum, item) => sum + item.priceNumber * item.quantity,
				0
			);
			const totalItems = updatedItems.reduce(
				(sum, item) => sum + item.quantity,
				0
			);

			return {
				...state,
				items: updatedItems,
				totalAmount,
				totalItems,
			};
		}

		case "CLEAR_CART":
			return {
				...state,
				items: [],
				totalAmount: 0,
				totalItems: 0,
			};

		case "TOGGLE_CART":
			return {
				...state,
				isOpen: !state.isOpen,
			};

		case "OPEN_CART":
			return {
				...state,
				isOpen: true,
			};

		case "CLOSE_CART":
			return {
				...state,
				isOpen: false,
			};

		default:
			return state;
	}
}

interface CartContextType {
	state: CartState;
	addItem: (item: Omit<CartItem, "cartId">) => void;
	removeItem: (cartId: string) => void;
	updateQuantity: (cartId: string, quantity: number) => void;
	clearCart: () => void;
	toggleCart: () => void;
	openCart: () => void;
	closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addItem = (item: Omit<CartItem, "cartId">) => {
		dispatch({ type: "ADD_ITEM", payload: item });
	};

	const removeItem = (cartId: string) => {
		dispatch({ type: "REMOVE_ITEM", payload: cartId });
	};

	const updateQuantity = (cartId: string, quantity: number) => {
		dispatch({ type: "UPDATE_QUANTITY", payload: { cartId, quantity } });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	const toggleCart = () => {
		dispatch({ type: "TOGGLE_CART" });
	};

	const openCart = () => {
		dispatch({ type: "OPEN_CART" });
	};

	const closeCart = () => {
		dispatch({ type: "CLOSE_CART" });
	};

	const value = {
		state,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		toggleCart,
		openCart,
		closeCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
