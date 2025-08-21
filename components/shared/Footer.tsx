import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-white text-primary p-2 text-center text-sm">
			<p>
				Crafted by{" "}
				<Link href={"https://www.osifemi.dev"} className="underline">
					Femi
				</Link>{" "}
				with lots of
				<span className="inline-block text-red-500 mx-1 animate-beat">
					&hearts;
				</span>
				for Temitope & Tobiloba
			</p>
		</footer>
	);
};

export default Footer;
