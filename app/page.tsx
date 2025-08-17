import About from "../components/About";
import Details from "../components/Details";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import RSVP from "../components/RSVP";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-rose-25 via-pink-25 to-blush-25">
			<Navigation />
			<Hero />
			<About />
			<Details />
			<Gallery />
			<RSVP />
			<Footer />
		</div>
	);
}
