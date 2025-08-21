"use client";
import Image from "next/image";
import QRCode from "qrcode";
import React, { useEffect, useRef, useState } from "react";

interface TableGroup {
	id: string;
	tableNumber: number;
	groupName?: string;
}

interface RsvpConfirmationProps {
	rsvp: {
		id: string;
		firstName: string;
		lastName: string;
		tableGroupId?: string; // RSVP now stores a reference to the table group
	};
}

const RsvpConfirmation: React.FC<RsvpConfirmationProps> = ({ rsvp }) => {
	const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
	const [tableGroup, setTableGroup] = useState<TableGroup | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	// Generate QR code based on the RSVP id
	useEffect(() => {
		QRCode.toDataURL(rsvp.id)
			.then((url) => setQrCodeDataUrl(url))
			.catch((err) => console.error("Error generating QR code", err));
	}, [rsvp.id]);

	// Fetch the table group data if a tableGroupId is provided
	useEffect(() => {
		if (rsvp.tableGroupId) {
			fetch(`/api/tableGroup/${rsvp.tableGroupId}`)
				.then((response) => response.json())
				.then((data: TableGroup) => setTableGroup(data))
				.catch((err) => console.error("Error fetching table group", err));
		}
	}, [rsvp.tableGroupId]);

	const handleDownloadPdf = () => {
		if (!contentRef.current) return;

		// Create a new window for printing
		const printWindow = window.open("", "_blank");
		if (!printWindow) return;

		// Copy the content to the new window
		printWindow.document.write(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>RSVP Confirmation - ${rsvp.firstName} ${rsvp.lastName}</title>
				<style>
					body { font-family: Arial, sans-serif; margin: 20px; }
					.container { max-width: 600px; margin: 0 auto; text-align: center; }
					.logo { width: 100px; height: 100px; margin: 0 auto 20px; }
					.qr-code { margin: 20px 0; }
					@media print {
						body { margin: 0; }
						.no-print { display: none; }
					}
				</style>
			</head>
			<body>
				<div class="container">
					${contentRef.current?.innerHTML || ""}
				</div>
				<script>
					window.onload = function() {
						window.print();
						window.onafterprint = function() {
							window.close();
						};
					};
				</script>
			</body>
			</html>
		`);
		printWindow.document.close();
	};

	return (
		<div className="flex flex-col items-center">
			<div
				onClick={handleDownloadPdf}
				className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
			>
				Print/Download PDF
			</div>

			{/* Hidden element used for PDF generation */}
			<div className="hidden">
				<div
					ref={contentRef}
					className="max-w-xl mx-auto p-8 bg-white border border-gray-200 rounded-lg text-center"
				>
					<div className="mb-4 relative">
						<Image
							src="/assets/logo.png"
							alt="Wedding Logo"
							width={100}
							height={100}
							className="mx-auto"
							sizes="(max-width: 500px) 100vw, (max-width: 600px) 50vw, 33vw"
							style={{ objectFit: "contain" }}
						/>
					</div>
					<h2 className="text-2xl font-bold text-yellow-600 mb-2">
						Your RSVP is Confirmed!
					</h2>
					<p className="text-base mb-2">
						Dear {rsvp.firstName} {rsvp.lastName},
					</p>
					<p className="text-base mb-4">
						This is your RSVP. We look forward to celebrating with you!
					</p>
					<div className="bg-gray-100 p-4 rounded-lg mb-4">
						<p className="text-base">
							<strong>Your RSVP Code:</strong> {rsvp.id} <br />
							<strong>Table Number:</strong>{" "}
							{tableGroup ? tableGroup.tableNumber : "Loading..."}
						</p>
					</div>
					<p className="text-base mb-4">
						The wedding is scheduled for <strong>22nd March 2025</strong>.
					</p>
					{qrCodeDataUrl && (
						<div className="mb-4">
							<Image
								src={qrCodeDataUrl}
								alt="RSVP QR Code"
								width={100}
								height={100}
								className="mx-auto"
							/>
						</div>
					)}
					<p className="text-base mb-4">
						Please keep this code safe as it will be needed for your entry.
					</p>
					<div className="mb-4 relative">
						<Image
							src="/assets/hero.jpg"
							alt="Wedding Couple"
							width={500}
							height={500}
							className="rounded-lg"
							sizes="(max-width: 500px) 100vw, (max-width: 600px) 50vw, 33vw"
							style={{ objectFit: "contain" }}
						/>
					</div>
					<p className="text-base">We look forward to celebrating with you!</p>
				</div>
			</div>
		</div>
	);
};

export default RsvpConfirmation;
