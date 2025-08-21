declare module "react-qr-scanner" {
	import { ComponentType, CSSProperties } from "react";

	interface QrScannerProps {
		delay?: number;
		onError?: (error: Error) => void;
		onScan?: (data: { text: string } | null) => void;
		style?: CSSProperties;
		constraints?: MediaStreamConstraints; // Add this line
	}

	const QrScanner: ComponentType<QrScannerProps>;

	export default QrScanner;
}
