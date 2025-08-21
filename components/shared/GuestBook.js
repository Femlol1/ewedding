import Image from "next/image";
import Link from "next/link";

// components/GuestBook.js
export default function GuestBook() {
	const qrCodeUrl = "/assets/images/Guest/qrcode.png"; // This URL should lead to a QR code image
	return (
		<div className="text-center mb-6">
			<h2 className="text-2xl font-semibold">Guest Book</h2>
			<Link
				href={
					"https://www.gingerray.co.uk/wedding/wedding-stationery/wedding-guest-books"
				}
			>
				<Image
					src={qrCodeUrl}
					alt="QR Code"
					className="mx-auto"
					priority
					width={300}
					height={300}
				/>
			</Link>
			<p>Scan to sign our guest book!</p>
		</div>
	);
}
