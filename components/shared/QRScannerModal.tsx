"use client";

import { useCallback, useRef, useState } from "react";
import QrScanner from "react-qr-scanner";
import { Button } from "../ui/button";

interface QRScannerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onScanSuccess: (decodedText: string) => Promise<void> | void;
}

interface CustomModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

const CustomModal = ({
	isOpen,
	onClose,
	title,
	children,
}: CustomModalProps) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={onClose}
		>
			<div
				className="relative bg-white rounded shadow-lg p-4 max-w-md w-full"
				onClick={(e) => e.stopPropagation()}
			>
				{title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

const QRScannerModal = ({
	isOpen,
	onClose,
	onScanSuccess,
}: QRScannerModalProps) => {
	const [cameraFacingMode, setCameraFacingMode] = useState<
		"environment" | "user"
	>("environment");

	const lastScannedRef = useRef<string>("");
	const lastScanTimeRef = useRef<number>(0);

	const toggleCamera = () => {
		setCameraFacingMode((prevMode) =>
			prevMode === "environment" ? "user" : "environment"
		);
	};

	const handleScan = useCallback(
		async (data: { text: string } | null) => {
			if (!data?.text) return;
			const now = Date.now();
			const isSameCode =
				data.text === lastScannedRef.current &&
				now - lastScanTimeRef.current < 2000;
			if (isSameCode) return;
			lastScannedRef.current = data.text;
			lastScanTimeRef.current = now;
			await onScanSuccess(data.text);
		},
		[onScanSuccess]
	);

	const handleError = useCallback((error: Error) => {
		console.error("QR Code Scan Error:", error);
	}, []);

	const previewStyle = {
		width: "100%",
		height: 300,
	};

	return (
		<CustomModal
			isOpen={isOpen}
			onClose={onClose}
			title="Check-In with QR Code"
		>
			<div className="flex flex-col items-center">
				<Button className="mb-2" onClick={toggleCamera}>
					Switch to {cameraFacingMode === "environment" ? "Front" : "Back"}{" "}
					Camera
				</Button>
				<QrScanner
					delay={300}
					onError={handleError}
					onScan={handleScan}
					style={previewStyle}
					constraints={{
						video: { facingMode: { ideal: cameraFacingMode } },
					}}
				/>
			</div>
		</CustomModal>
	);
};

export default QRScannerModal;
