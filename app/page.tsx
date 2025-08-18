import About from "../components/About";
import AsoEbi from "../components/AsoEbi";
import CheckoutManager from "../components/CheckoutManager";
import Details from "../components/Details";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import RSVP from "../components/RSVP";
import ShoppingCart from "../components/ShoppingCart";
import { CartProvider } from "../contexts/CartContext";

export default function Home() {
	return (
		<CartProvider>
			<div className="min-h-screen bg-gradient-to-br from-cream via-warm-beige to-warm-white">
				<Navigation />
				<Hero />
				<About />
				<Details />
				<Gallery />
				<AsoEbi />
				<RSVP />
				<Footer />
				<ShoppingCart />
				<CheckoutManager />
			</div>
		</CartProvider>
	);
}
