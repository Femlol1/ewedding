import bwipjs from "bwip-js";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const { rsvpDocId } = data;

		// Generate barcode for the document ID
		const barcodeBuffer = await bwipjs.toBuffer({
			bcid: "code128",
			text: rsvpDocId,
			scale: 3,
			height: 10,
			includetext: true,
			textxalign: "center",
		});

		// Generate a PDF with the barcode
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([300, 150]);
		const pngImage = await pdfDoc.embedPng(barcodeBuffer);
		const { width, height } = pngImage.scale(1);

		page.drawImage(pngImage, {
			x: page.getWidth() / 2 - width / 2,
			y: page.getHeight() / 2 - height / 2,
			width,
			height,
		});

		page.drawText(`RSVP Code: ${rsvpDocId}`, {
			x: 10,
			y: 10,
			size: 12,
			color: rgb(0, 0, 0),
		});

		const pdfBytes = await pdfDoc.save();
		const pdfBuffer = Buffer.from(pdfBytes);

		return NextResponse.json(
			{ pdfBuffer: pdfBuffer.toString("base64") },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error generating barcode:", error);
		return NextResponse.json(
			{ message: "Error generating barcode." },
			{ status: 500 }
		);
	}
}
