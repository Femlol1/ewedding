"use client";

import CheckoutModal from "@/components/shared/CheckoutModal";
import HeaderImage from "@/components/shared/HeaderImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Heart,
	Minus,
	Plus,
	RefreshCw,
	Shield,
	ShoppingCart,
	Star,
	Truck,
	X,
} from "lucide-react";
import { useState } from "react";

interface AsoebiItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	category: "men" | "women" | "children";
	sizes: string[];
	colors: string[];
	description: string;
	inStock: boolean;
	rating: number;
	reviews: number;
}

const asoebiItems: AsoebiItem[] = [
	{
		id: "1",
		name: "Elegant Lace Gele Set",
		price: 15000,
		originalPrice: 20000,
		image: "/assets/asoebi-1.jpg",
		category: "women",
		sizes: ["Small", "Medium", "Large", "XL"],
		colors: ["Navy Blue", "Gold", "Wine"],
		description:
			"Beautiful traditional lace fabric with matching gele (headwrap). Perfect for our special day!",
		inStock: true,
		rating: 4.8,
		reviews: 24,
	},
	{
		id: "2",
		name: "Men's Agbada with Cap",
		price: 18000,
		originalPrice: 25000,
		image: "/assets/asoebi-2.jpg",
		category: "men",
		sizes: ["S", "M", "L", "XL", "XXL"],
		colors: ["Navy Blue", "Gold"],
		description:
			"Traditional Agbada outfit with matching cap. Tailored to perfection for the wedding celebration.",
		inStock: true,
		rating: 4.9,
		reviews: 18,
	},
	{
		id: "3",
		name: "Children's Traditional Outfit",
		price: 8000,
		originalPrice: 12000,
		image: "/assets/asoebi-3.jpg",
		category: "children",
		sizes: ["2-3 years", "4-5 years", "6-7 years", "8-10 years"],
		colors: ["Navy Blue", "Gold"],
		description:
			"Adorable traditional outfit for the little ones. Let them be part of our special celebration!",
		inStock: true,
		rating: 4.7,
		reviews: 15,
	},
	{
		id: "4",
		name: "Premium Women's Ankara Set",
		price: 22000,
		originalPrice: 30000,
		image: "/assets/asoebi-4.jpg",
		category: "women",
		sizes: ["Small", "Medium", "Large", "XL", "XXL"],
		colors: ["Navy Blue", "Gold", "Wine"],
		description:
			"Premium quality Ankara fabric with exquisite design. Includes blouse, wrapper, and gele.",
		inStock: false,
		rating: 5.0,
		reviews: 31,
	},
	{
		id: "5",
		name: "Men's Casual Traditional",
		price: 12000,
		originalPrice: 16000,
		image: "/assets/asoebi-5.jpg",
		category: "men",
		sizes: ["S", "M", "L", "XL"],
		colors: ["Navy Blue", "Gold"],
		description:
			"Comfortable and stylish traditional wear perfect for the wedding festivities.",
		inStock: true,
		rating: 4.6,
		reviews: 22,
	},
	{
		id: "6",
		name: "Deluxe Family Package",
		price: 45000,
		originalPrice: 60000,
		image: "/assets/asoebi-6.jpg",
		category: "women",
		sizes: ["Various"],
		colors: ["Navy Blue", "Gold"],
		description:
			"Complete family package - 2 adult outfits + 2 children outfits. Perfect for families!",
		inStock: true,
		rating: 4.9,
		reviews: 12,
	},
];

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	size: string;
	color: string;
	category: string;
}

export default function AsoebiPage() {
	const [selectedCategory, setSelectedCategory] = useState<
		"all" | "men" | "women" | "children"
	>("all");
	const [cart, setCart] = useState<CartItem[]>([]);
	const [favorites, setFavorites] = useState<string[]>([]);
	const [showCheckout, setShowCheckout] = useState(false);
	const [showCartDetails, setShowCartDetails] = useState(false);

	const filteredItems =
		selectedCategory === "all"
			? asoebiItems
			: asoebiItems.filter((item) => item.category === selectedCategory);

	const addToCart = (
		item: AsoebiItem,
		selectedSize: string = "Medium",
		selectedColor: string = "Navy Blue"
	) => {
		const cartItemKey = `${item.id}-${selectedSize}-${selectedColor}`;
		const existingItem = cart.find(
			(cartItem) =>
				cartItem.id === item.id &&
				cartItem.size === selectedSize &&
				cartItem.color === selectedColor
		);

		if (existingItem) {
			setCart((prev) =>
				prev.map((cartItem) =>
					cartItem.id === item.id &&
					cartItem.size === selectedSize &&
					cartItem.color === selectedColor
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			const newCartItem: CartItem = {
				id: item.id,
				name: item.name,
				price: item.price,
				quantity: 1,
				size: selectedSize,
				color: selectedColor,
				category: item.category,
			};
			setCart((prev) => [...prev, newCartItem]);
		}
	};

	const removeFromCart = (itemId: string, size: string, color: string) => {
		setCart((prev) =>
			prev.filter(
				(item) =>
					!(item.id === itemId && item.size === size && item.color === color)
			)
		);
	};

	const updateCartQuantity = (
		itemId: string,
		size: string,
		color: string,
		newQuantity: number
	) => {
		if (newQuantity <= 0) {
			removeFromCart(itemId, size, color);
		} else {
			setCart((prev) =>
				prev.map((item) =>
					item.id === itemId && item.size === size && item.color === color
						? { ...item, quantity: newQuantity }
						: item
				)
			);
		}
	};

	const toggleFavorite = (itemId: string) => {
		setFavorites((prev) =>
			prev.includes(itemId)
				? prev.filter((id) => id !== itemId)
				: [...prev, itemId]
		);
	};

	const getTotalCartItems = () => {
		return cart.reduce((sum, item) => sum + item.quantity, 0);
	};

	const getTotalCartValue = () => {
		return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	};

	const clearCart = () => {
		setCart([]);
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			minimumFractionDigits: 0,
		}).format(price);
	};

	return (
		<>
			{/* Header Image */}
			<HeaderImage
				pageId="asoebi"
				alt="Wedding Asoebi Collection"
				title="Beautiful Traditional Outfits for Our Wedding"
			/>

			<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
				<div className="container mx-auto px-4">
					{/* Header Section */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
							Wedding Asoebi Collection
						</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
							Join us in celebrating our special day! Get your beautiful
							traditional outfits and be part of our wedding family. All outfits
							are specially designed for our celebration.
						</p>

						{/* Shopping Cart Icon */}
						<div className="flex justify-center mb-8">
							<div className="relative">
								<Button
									className="bg-blush-500 hover:bg-blush-600 px-6 py-3 mr-2"
									onClick={() => setShowCartDetails(!showCartDetails)}
								>
									<ShoppingCart className="w-5 h-5 mr-2" />
									Cart ({getTotalCartItems()})
								</Button>
								{cart.length > 0 && (
									<Button
										className="bg-green-600 hover:bg-green-700 px-6 py-3"
										onClick={() => setShowCheckout(true)}
									>
										Checkout ({formatPrice(getTotalCartValue())})
									</Button>
								)}

								{/* Cart Dropdown */}
								{showCartDetails && cart.length > 0 && (
									<div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border p-4 z-10">
										<div className="flex justify-between items-center mb-4">
											<h3 className="font-semibold">Shopping Cart</h3>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setShowCartDetails(false)}
											>
												<X className="w-4 h-4" />
											</Button>
										</div>
										<div className="max-h-64 overflow-y-auto">
											{cart.map((item) => (
												<div
													key={`${item.id}-${item.size}-${item.color}`}
													className="flex justify-between items-center py-2 border-b"
												>
													<div className="flex-1">
														<div className="font-medium text-sm">
															{item.name}
														</div>
														<div className="text-xs text-gray-600">
															{item.size} | {item.color}
														</div>
													</div>
													<div className="flex items-center gap-2">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																updateCartQuantity(
																	item.id,
																	item.size,
																	item.color,
																	item.quantity - 1
																)
															}
														>
															<Minus className="w-3 h-3" />
														</Button>
														<span className="text-sm">{item.quantity}</span>
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																updateCartQuantity(
																	item.id,
																	item.size,
																	item.color,
																	item.quantity + 1
																)
															}
														>
															<Plus className="w-3 h-3" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															onClick={() =>
																removeFromCart(item.id, item.size, item.color)
															}
														>
															<X className="w-3 h-3 text-red-500" />
														</Button>
													</div>
												</div>
											))}
										</div>
										<div className="flex justify-between items-center pt-4 border-t">
											<span className="font-semibold">
												Total: {formatPrice(getTotalCartValue())}
											</span>
											<Button
												className="bg-blush-500 hover:bg-blush-600"
												onClick={() => {
													setShowCartDetails(false);
													setShowCheckout(true);
												}}
											>
												Checkout
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Wedding Colors */}
						<div className="flex justify-center items-center gap-4 mb-8">
							<span className="text-sm font-medium text-gray-700">
								Wedding Colors:
							</span>
							<div className="flex gap-2">
								<div
									className="w-8 h-8 rounded-full bg-blue-900 border-2 border-white shadow-md"
									title="Navy Blue"
								></div>
								<div
									className="w-8 h-8 rounded-full bg-nude-400 border-2 border-white shadow-md"
									title="Gold"
								></div>
								<div
									className="w-8 h-8 rounded-full bg-red-800 border-2 border-white shadow-md"
									title="Wine"
								></div>
							</div>
						</div>
					</div>

					{/* Category Filter */}
					<div className="flex justify-center mb-8">
						<div className="flex bg-white rounded-lg p-1 shadow-md">
							{["all", "women", "men", "children"].map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category as any)}
									className={`px-6 py-2 rounded-md font-medium transition-all ${
										selectedCategory === category
											? "bg-blush-500 text-white shadow-md"
											: "text-gray-600 hover:text-blush-500"
									}`}
								>
									{category === "all"
										? "All Items"
										: category.charAt(0).toUpperCase() + category.slice(1)}
								</button>
							))}
						</div>
					</div>

					{/* Products Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						{filteredItems.map((item) => (
							<Card
								key={item.id}
								className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
							>
								<CardHeader className="p-0 relative overflow-hidden">
									<div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg flex items-center justify-center">
										{/* Placeholder for product images */}
										<div className="text-center">
											<div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mb-4 mx-auto">
												<span className="text-3xl">
													{item.category === "women"
														? "👗"
														: item.category === "men"
														? "🤵"
														: "👶"}
												</span>
											</div>
											<div className="text-sm text-blush-500 font-medium">
												{item.category === "women"
													? "Women's Collection"
													: item.category === "men"
													? "Men's Collection"
													: "Children's Collection"}
											</div>
										</div>
										{!item.inStock && (
											<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
												<Badge
													variant="destructive"
													className="text-lg px-4 py-2"
												>
													Out of Stock
												</Badge>
											</div>
										)}
										{item.originalPrice && (
											<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
												Save {formatPrice(item.originalPrice - item.price)}
											</Badge>
										)}
										<button
											onClick={() => toggleFavorite(item.id)}
											className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
										>
											<Heart
												className={`w-5 h-5 ${
													favorites.includes(item.id)
														? "fill-red-500 text-red-500"
														: "text-gray-600"
												}`}
											/>
										</button>
									</div>
								</CardHeader>
								<CardContent className="p-6">
									<div className="mb-4">
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											{item.name}
										</h3>
										<div className="flex items-center gap-2 mb-2">
											<div className="flex items-center">
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`w-4 h-4 ${
															i < Math.floor(item.rating)
																? "fill-nude-400 text-nude-400"
																: "text-gray-300"
														}`}
													/>
												))}
												<span className="ml-2 text-sm text-gray-600">
													{item.rating} ({item.reviews} reviews)
												</span>
											</div>
										</div>
										<p className="text-gray-600 text-sm mb-4">
											{item.description}
										</p>
									</div>

									{/* Price */}
									<div className="flex items-center gap-2 mb-4">
										<span className="text-2xl font-bold text-blush-500">
											{formatPrice(item.price)}
										</span>
										{item.originalPrice && (
											<span className="text-lg text-gray-400 line-through">
												{formatPrice(item.originalPrice)}
											</span>
										)}
									</div>

									{/* Sizes and Colors */}
									<div className="mb-4">
										<div className="mb-2">
											<span className="text-sm font-medium text-gray-700">
												Available Sizes:
											</span>
											<div className="flex flex-wrap gap-1 mt-1">
												{item.sizes.map((size) => (
													<Badge
														key={size}
														variant="outline"
														className="text-xs"
													>
														{size}
													</Badge>
												))}
											</div>
										</div>
										<div>
											<span className="text-sm font-medium text-gray-700">
												Available Colors:
											</span>
											<div className="flex flex-wrap gap-1 mt-1">
												{item.colors.map((color) => (
													<Badge
														key={color}
														variant="outline"
														className="text-xs"
													>
														{color}
													</Badge>
												))}
											</div>
										</div>
									</div>

									{/* Add to Cart Button */}
									<Button
										onClick={() => addToCart(item)}
										disabled={!item.inStock}
										className="w-full bg-blush-500 hover:bg-blush-600 disabled:bg-gray-400"
									>
										{item.inStock ? (
											<>
												<ShoppingCart className="w-4 h-4 mr-2" />
												Add to Cart
											</>
										) : (
											"Out of Stock"
										)}
									</Button>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Features Section */}
					<div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
						<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
							Why Choose Our Asoebi?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
									<Truck className="w-8 h-8 text-blush-500" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
								<p className="text-gray-600">
									Free delivery within Lagos and Abuja for orders above ₦20,000
								</p>
							</div>
							<div className="text-center">
								<div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
									<Shield className="w-8 h-8 text-blush-500" />
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Quality Guarantee
								</h3>
								<p className="text-gray-600">
									Premium fabrics and excellent craftsmanship guaranteed
								</p>
							</div>
							<div className="text-center">
								<div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
									<RefreshCw className="w-8 h-8 text-blush-500" />
								</div>
								<h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
								<p className="text-gray-600">
									30-day return policy for sizing or quality issues
								</p>
							</div>
						</div>
					</div>

					{/* Contact Section */}
					<div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
						<h2 className="text-3xl font-bold mb-4">
							Need Help with Your Order?
						</h2>
						<p className="text-lg mb-6">
							Our team is here to help you find the perfect outfit for our
							special day!
						</p>
						<div className="flex flex-col md:flex-row gap-4 justify-center">
							<Button
								variant="secondary"
								className="bg-white text-blush-500 hover:bg-cream-100"
							>
								📞 Call Us: +234 123 456 7890
							</Button>
							<Button
								variant="secondary"
								className="bg-white text-blush-500 hover:bg-cream-100"
							>
								💬 WhatsApp: +234 987 654 3210
							</Button>
							<Button
								variant="secondary"
								className="bg-white text-blush-500 hover:bg-cream-100"
							>
								✉️ Email: asoebi@ourwedding.com
							</Button>
						</div>
						<p className="text-sm mt-4 opacity-90">
							Order deadline: 2 weeks before the wedding | Custom tailoring
							available
						</p>
					</div>
				</div>
			</div>

			{/* Checkout Modal */}
			<CheckoutModal
				isOpen={showCheckout}
				onClose={() => setShowCheckout(false)}
				cartItems={cart}
				onOrderSuccess={clearCart}
			/>
		</>
	);
}
