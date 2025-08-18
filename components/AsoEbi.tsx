"use client";

import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function AsoEbi() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [quantity, setQuantity] = useState(1);
	const { addItem, openCart } = useCart();

	// Aso Ebi collection data
	const asoEbiItems = [
		{
			id: 1,
			name: "Elegant Lace Gown",
			category: "women",
			price: "₦45,000",
			priceNumber: 45000,
			image:
				"https://images.unsplash.com/photo-1594736797933-d0301ba8eb13?w=400&h=600&fit=crop",
			sizes: ["XS", "S", "M", "L", "XL", "XXL"],
			description: "Beautiful traditional lace gown with intricate embroidery",
			colors: ["Gold", "Royal Blue", "Emerald Green"],
		},
		{
			id: 2,
			name: "Traditional Agbada",
			category: "men",
			price: "₦38,000",
			priceNumber: 38000,
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
			sizes: ["S", "M", "L", "XL", "XXL"],
			description: "Classic flowing agbada with gold embroidery",
			colors: ["Royal Blue", "Forest Green", "Burgundy"],
		},
		{
			id: 3,
			name: "Ankara Print Dress",
			category: "women",
			price: "₦25,000",
			priceNumber: 25000,
			image:
				"https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop",
			sizes: ["XS", "S", "M", "L", "XL"],
			description: "Vibrant ankara print with modern cut",
			colors: ["Gold & Green", "Blue & Gold", "Purple & Gold"],
		},
		{
			id: 4,
			name: "Kaftan Set",
			category: "men",
			price: "₦32,000",
			priceNumber: 32000,
			image:
				"https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&h=600&fit=crop",
			sizes: ["M", "L", "XL", "XXL"],
			description: "Comfortable kaftan with matching cap",
			colors: ["Cream", "Royal Blue", "Forest Green"],
		},
		{
			id: 5,
			name: "Gele & Ipele Set",
			category: "accessories",
			price: "₦15,000",
			priceNumber: 15000,
			image:
				"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop",
			sizes: ["One Size"],
			description: "Traditional head tie and shoulder cloth",
			colors: ["Gold", "Royal Blue", "Emerald", "Purple"],
		},
		{
			id: 6,
			name: "Beaded Jewelry Set",
			category: "accessories",
			price: "₦12,000",
			priceNumber: 12000,
			image:
				"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
			sizes: ["One Size"],
			description: "Elegant coral beads necklace and earrings",
			colors: ["Coral", "Gold", "Silver"],
		},
	];

	const categories = [
		{ id: "all", name: "All Items", icon: "🎨" },
		{ id: "women", name: "Women", icon: "👗" },
		{ id: "men", name: "Men", icon: "👔" },
		{ id: "accessories", name: "Accessories", icon: "💍" },
	];

	const filteredItems =
		selectedCategory === "all"
			? asoEbiItems
			: asoEbiItems.filter((item) => item.category === selectedCategory);

	const openModal = (item: any) => {
		setSelectedItem(item);
		setSelectedSize(item.sizes[0] || "");
		setSelectedColor(item.colors[0] || "");
		setQuantity(1);
	};

	const closeModal = () => {
		setSelectedItem(null);
		setSelectedSize("");
		setSelectedColor("");
		setQuantity(1);
	};

	const addToCart = () => {
		if (!selectedItem || !selectedSize || !selectedColor) return;

		addItem({
			id: selectedItem.id,
			name: selectedItem.name,
			price: selectedItem.price,
			priceNumber: selectedItem.priceNumber,
			quantity: quantity,
			size: selectedSize,
			color: selectedColor,
			image: selectedItem.image,
			category: selectedItem.category,
		});

		closeModal();
		openCart();
	};

	return (
		<section
			id="aso-ebi"
			className="py-20 bg-gradient-to-br from-warm-beige via-cream to-light-sage"
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Title */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green mb-4">
						Aso Ebi Collection
					</h2>
					<p className="text-lg md:text-xl text-sage-green max-w-3xl mx-auto">
						Join us in coordinated style! Purchase our specially curated aso ebi
						collection to celebrate together
					</p>
				</div>

				{/* Category Filter */}
				<div className="flex flex-wrap justify-center gap-4 mb-12">
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 ${
								selectedCategory === category.id
									? "bg-forest-green text-warm-white shadow-lg"
									: "bg-warm-white text-forest-green hover:bg-sage-green hover:text-warm-white border border-champagne-gold/30"
							}`}
						>
							<span className="text-lg">{category.icon}</span>
							<span>{category.name}</span>
						</button>
					))}
				</div>

				{/* Items Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredItems.map((item) => (
						<div
							key={item.id}
							className="bg-warm-white rounded-3xl shadow-lg overflow-hidden border border-champagne-gold/30 hover:shadow-xl transition-all duration-300 group cursor-pointer"
							onClick={() => openModal(item)}
						>
							{/* Item Image */}
							<div className="relative h-80 overflow-hidden">
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute top-4 right-4 bg-champagne-gold text-forest-green px-3 py-1 rounded-full text-sm font-semibold">
									{item.price}
								</div>
							</div>

							{/* Item Details */}
							<div className="p-6">
								<h3 className="text-xl font-bold text-forest-green mb-2">
									{item.name}
								</h3>
								<p className="text-sage-green text-sm mb-4">
									{item.description}
								</p>

								{/* Colors */}
								<div className="mb-4">
									<p className="text-xs font-semibold text-forest-green mb-2">
										Available Colors:
									</p>
									<div className="flex flex-wrap gap-1">
										{item.colors.map((color, index) => (
											<span
												key={index}
												className="px-2 py-1 bg-cream text-sage-green rounded-lg text-xs"
											>
												{color}
											</span>
										))}
									</div>
								</div>

								{/* Sizes */}
								<div className="mb-4">
									<p className="text-xs font-semibold text-forest-green mb-2">
										Sizes:
									</p>
									<div className="flex flex-wrap gap-1">
										{item.sizes.map((size, index) => (
											<span
												key={index}
												className="px-2 py-1 bg-light-sage text-forest-green rounded-lg text-xs"
											>
												{size}
											</span>
										))}
									</div>
								</div>

								{/* Add to Cart Button */}
								<button
									onClick={() => openModal(item)}
									className="w-full bg-gradient-to-r from-forest-green to-sage-green hover:from-sage-green hover:to-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
								>
									Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Order Information */}
				<div className="mt-16 bg-warm-white/90 backdrop-blur-sm rounded-3xl p-8 border border-champagne-gold/30">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-forest-green mb-4">
							How to Order
						</h3>
						<p className="text-sage-green">
							Follow these simple steps to get your aso ebi
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-champagne-gold rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-forest-green">1</span>
							</div>
							<h4 className="font-semibold text-forest-green mb-2">
								Choose Your Style
							</h4>
							<p className="text-sage-green text-sm">
								Browse our collection and select your preferred outfit
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-champagne-gold rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-forest-green">2</span>
							</div>
							<h4 className="font-semibold text-forest-green mb-2">
								Place Your Order
							</h4>
							<p className="text-sage-green text-sm">
								Contact us with your size, color preference, and measurements
							</p>
						</div>

						<div className="text-center">
							<div className="w-16 h-16 bg-champagne-gold rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-forest-green">3</span>
							</div>
							<h4 className="font-semibold text-forest-green mb-2">
								Receive & Celebrate
							</h4>
							<p className="text-sage-green text-sm">
								Get your outfit delivered and join us in style!
							</p>
						</div>
					</div>

					{/* Contact Info */}
					<div className="mt-8 text-center">
						<p className="text-sage-green mb-4">
							Ready to order? Contact our aso ebi coordinator:
						</p>
						<div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
							<a
								href="tel:+2348123456789"
								className="flex items-center text-forest-green hover:text-sage-green transition-colors"
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
								</svg>
								+234 812 345 6789
							</a>
							<a
								href="https://wa.me/2348123456789"
								className="flex items-center text-forest-green hover:text-sage-green transition-colors"
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
								</svg>
								WhatsApp Order
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Modal for Item Details */}
			{selectedItem && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
					<div className="bg-warm-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						{/* Modal Header */}
						<div className="sticky top-0 bg-warm-white rounded-t-3xl p-6 border-b border-champagne-gold/30 flex justify-between items-center">
							<h3 className="text-2xl font-bold text-forest-green">
								{selectedItem.name}
							</h3>
							<button
								onClick={closeModal}
								className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center text-warm-white hover:bg-forest-green transition-colors"
							>
								×
							</button>
						</div>

						{/* Modal Content */}
						<div className="p-6">
							<div className="grid md:grid-cols-2 gap-6">
								{/* Image */}
								<div className="h-80 rounded-2xl overflow-hidden">
									<img
										src={selectedItem.image}
										alt={selectedItem.name}
										className="w-full h-full object-cover"
									/>
								</div>

								{/* Details */}
								<div>
									<div className="text-3xl font-bold text-champagne-gold mb-4">
										{selectedItem.price}
									</div>
									<p className="text-sage-green mb-6">
										{selectedItem.description}
									</p>

									{/* Colors */}
									<div className="mb-6">
										<h4 className="font-semibold text-forest-green mb-3">
											Available Colors:
										</h4>
										<div className="flex flex-wrap gap-2">
											{selectedItem.colors.map(
												(color: string, index: number) => (
													<button
														key={index}
														onClick={() => setSelectedColor(color)}
														className={`px-3 py-2 rounded-lg text-sm transition-colors ${
															selectedColor === color
																? "bg-forest-green text-warm-white"
																: "bg-cream text-sage-green hover:bg-sage-green hover:text-warm-white"
														}`}
													>
														{color}
													</button>
												)
											)}
										</div>
									</div>

									{/* Sizes */}
									<div className="mb-6">
										<h4 className="font-semibold text-forest-green mb-3">
											Available Sizes:
										</h4>
										<div className="flex flex-wrap gap-2">
											{selectedItem.sizes.map((size: string, index: number) => (
												<button
													key={index}
													onClick={() => setSelectedSize(size)}
													className={`px-3 py-2 rounded-lg text-sm transition-colors ${
														selectedSize === size
															? "bg-forest-green text-warm-white"
															: "bg-light-sage text-forest-green hover:bg-sage-green hover:text-warm-white"
													}`}
												>
													{size}
												</button>
											))}
										</div>
									</div>

									{/* Quantity */}
									<div className="mb-6">
										<h4 className="font-semibold text-forest-green mb-3">
											Quantity:
										</h4>
										<div className="flex items-center gap-3">
											<button
												onClick={() => setQuantity(Math.max(1, quantity - 1))}
												className="w-10 h-10 rounded-full bg-sage-green text-white font-bold flex items-center justify-center hover:bg-forest-green transition-colors"
											>
												−
											</button>
											<span className="w-12 text-center text-lg font-semibold text-forest-green">
												{quantity}
											</span>
											<button
												onClick={() => setQuantity(quantity + 1)}
												className="w-10 h-10 rounded-full bg-sage-green text-white font-bold flex items-center justify-center hover:bg-forest-green transition-colors"
											>
												+
											</button>
										</div>
									</div>

									{/* Add to Cart Button */}
									<div className="space-y-3">
										<button
											onClick={addToCart}
											disabled={!selectedSize || !selectedColor}
											className="w-full bg-gradient-to-r from-forest-green to-sage-green hover:from-sage-green hover:to-forest-green text-warm-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
										>
											<svg
												className="w-5 h-5 mr-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 5.2a2 2 0 01-1.9 1.8H3.2a2 2 0 01-2-1.8L1 7h2m4 6v6a2 2 0 002 2h4a2 2 0 002-2v-6m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v4"
												/>
											</svg>
											Add to Cart ({quantity} × ₦
											{selectedItem.priceNumber.toLocaleString()})
										</button>

										<div className="text-center text-sage-green text-sm">
											or contact us directly:
										</div>

										<div className="grid grid-cols-2 gap-2">
											<a
												href={`tel:+2348123456789`}
												className="bg-sage-green hover:bg-forest-green text-warm-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-sm"
											>
												<svg
													className="w-4 h-4 mr-1"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
												</svg>
												Call
											</a>
											<a
												href={`https://wa.me/2348123456789?text=Hi! I'd like to order the ${
													selectedItem.name
												} for ₦${selectedItem.priceNumber.toLocaleString()}. Please send me more details about sizing and availability.`}
												className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center text-sm"
											>
												<svg
													className="w-4 h-4 mr-1"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
												</svg>
												WhatsApp
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
