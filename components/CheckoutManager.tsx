"use client";

import { useEffect, useState } from "react";
import Checkout from "./Checkout";

export default function CheckoutManager() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleOpenCheckout = () => {
			setIsOpen(true);
		};

		const handleCloseCheckout = () => {
			setIsOpen(false);
		};

		window.addEventListener("openCheckout", handleOpenCheckout);
		window.addEventListener("closeCheckout", handleCloseCheckout);

		return () => {
			window.removeEventListener("openCheckout", handleOpenCheckout);
			window.removeEventListener("closeCheckout", handleCloseCheckout);
		};
	}, []);

	return <Checkout isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
