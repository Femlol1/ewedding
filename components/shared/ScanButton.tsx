"use client";

import QRScannerModal from "@/components/shared/QRScannerModal";
import { Button } from "@/components/ui/button";
import { db, doc, getDoc, updateDoc } from "@/lib/firebase";
import { useState } from "react";

const ScanButton = () => {
	const [isQRModalOpen, setIsQRModalOpen] = useState(false);
	const [message, setMessage] = useState("");

	const handleScanSuccess = async (decodedText: string) => {
		try {
			const rsvpDocRef = doc(db, "rsvps", decodedText);
			const rsvpDoc = await getDoc(rsvpDocRef);
			if (rsvpDoc.exists()) {
				await updateDoc(rsvpDocRef, { checkedIn: true });
				setMessage(
					`Guest ${rsvpDoc.data()?.firstName} ${
						rsvpDoc.data()?.lastName
					} checked in successfully!`
				);
			} else {
				setMessage("Guest not found. Please check the ID and try again.");
			}
		} catch (error) {
			console.error("Error checking in guest:", error);
			setMessage("Error checking in guest. Please try again.");
		} finally {
			setIsQRModalOpen(false);
		}
	};

	return (
		<div>
			{message && (
				<div>
					{message}
					<button onClick={() => setMessage("")} className="ml-2">
						&times;
					</button>
				</div>
			)}
			<Button onClick={() => setIsQRModalOpen(true)}>Scan</Button>

			<QRScannerModal
				isOpen={isQRModalOpen}
				onClose={() => setIsQRModalOpen(false)}
				onScanSuccess={handleScanSuccess}
			/>
		</div>
	);
};

export default ScanButton;
