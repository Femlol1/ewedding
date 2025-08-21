import { UserType, validCodes } from "@/constants/codes";
import { db, Timestamp } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import qrcode from "qrcode";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
	try {
		// Check if Firebase Admin is available
		if (!db) {
			return NextResponse.json(
				{ message: "Database service is not available" },
				{ status: 503 }
			);
		}

		const data = await req.json();
		const { code } = data;

		// 1. Validate code and determine userType
		let userType: UserType | null = null;
		for (const type in validCodes) {
			if (validCodes[type as UserType].includes(code)) {
				userType = type as UserType;
				break;
			}
		}

		if (!userType) {
			return NextResponse.json(
				{ message: "Invalid RSVP code." },
				{ status: 400 }
			);
		}

		// 2. Save RSVP data to Firestore
		const timestamp = Timestamp.now();
		const rsvpData = { ...data, userType, timestamp };
		const rsvpDocRef = await db.collection("rsvps").add(rsvpData);
		const rsvpDocId = rsvpDocRef.id;

		// 3. Generate QR code as a base64 data URL
		const qrCodeDataUrl = await qrcode.toDataURL(rsvpDocId);

		// 4. Return data needed for client-side PDF generation
		return NextResponse.json({
			result: "success",
			rsvpDocId,
			qrCodeDataUrl,
			firstName: data.firstName,
			lastName: data.lastName,
		});
	} catch (error) {
		console.error("Error processing RSVP:", error);
		return NextResponse.json(
			{ result: "error", message: "Error processing RSVP." },
			{ status: 500 }
		);
	}
}
