"use client";

import { useCart } from "../contexts/CartContext";

export default function ShoppingCart() {
	const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart();

	if (!state.isOpen) return null;

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
			<div className="bg-warm-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
				{/* Cart Header */}
				<div className="sticky top-0 bg-warm-white rounded-t-3xl p-6 border-b border-champagne-gold/30 flex justify-between items-center">
					<h3 className="text-2xl font-bold text-forest-green">
						Shopping Cart ({state.totalItems} items)
					</h3>
					<button
						onClick={closeCart}
						className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center text-warm-white hover:bg-forest-green transition-colors"
					>
						×
					</button>
				</div>

				{/* Cart Content */}
				<div className="flex flex-col h-full max-h-[calc(90vh-140px)]">
					{state.items.length === 0 ? (
						<div className="flex-1 flex items-center justify-center p-12">
							<div className="text-center">
								<div className="text-6xl mb-4">🛍️</div>
								<h4 className="text-xl font-semibold text-forest-green mb-2">
									Your cart is empty
								</h4>
								<p className="text-sage-green">
									Add some items from our Aso Ebi collection!
								</p>
							</div>
						</div>
					) : (
						<>
							{/* Cart Items */}
							<div className="flex-1 overflow-y-auto p-6 space-y-4">
								{state.items.map((item) => (
									<div
										key={item.cartId}
										className="flex gap-4 p-4 bg-cream rounded-2xl border border-champagne-gold/30"
									>
										{/* Item Image */}
										<div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
											<img
												src={item.image}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										</div>

										{/* Item Details */}
										<div className="flex-1 min-w-0">
											<h4 className="font-semibold text-forest-green text-sm truncate">
												{item.name}
											</h4>
											<p className="text-sage-green text-xs">
												Size: {item.size} | Color: {item.color}
											</p>
											<p className="font-bold text-champagne-gold text-sm">
												{formatPrice(item.priceNumber)}
											</p>
										</div>

										{/* Quantity Controls */}
										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													updateQuantity(item.cartId, item.quantity - 1)
												}
												disabled={item.quantity <= 1}
												className="w-6 h-6 rounded-full bg-sage-green text-white text-xs font-bold flex items-center justify-center hover:bg-forest-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
											>
												−
											</button>
											<span className="w-8 text-center text-sm font-semibold text-forest-green">
												{item.quantity}
											</span>
											<button
												onClick={() =>
													updateQuantity(item.cartId, item.quantity + 1)
												}
												className="w-6 h-6 rounded-full bg-sage-green text-white text-xs font-bold flex items-center justify-center hover:bg-forest-green transition-colors"
											>
												+
											</button>
										</div>

										{/* Remove Button */}
										<button
											onClick={() => removeItem(item.cartId)}
											className="text-red-500 hover:text-red-700 transition-colors p-1"
											title="Remove item"
										>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
								))}
							</div>

							{/* Cart Footer */}
							<div className="border-t border-champagne-gold/30 p-6 bg-cream">
								{/* Total */}
								<div className="flex justify-between items-center mb-4">
									<span className="text-lg font-semibold text-forest-green">
										Total:
									</span>
									<span className="text-xl font-bold text-champagne-gold">
										{formatPrice(state.totalAmount)}
									</span>
								</div>

								{/* Action Buttons */}
								<div className="space-y-3">
									<button
										onClick={() => {
											// Navigate to checkout - we'll implement this next
											window.dispatchEvent(new CustomEvent("openCheckout"));
										}}
										className="w-full bg-gradient-to-r from-forest-green to-sage-green hover:from-sage-green hover:to-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
									>
										Proceed to Checkout
									</button>

									<div className="flex gap-2">
										<button
											onClick={clearCart}
											className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
										>
											Clear Cart
										</button>
										<button
											onClick={closeCart}
											className="flex-1 bg-sage-green hover:bg-forest-green text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
										>
											Continue Shopping
										</button>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
