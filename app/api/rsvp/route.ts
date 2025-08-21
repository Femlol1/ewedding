import { UserType, validCodes } from "@/constants/codes";
import { db, Timestamp } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import qrcode from "qrcode";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

const EXCEL_FILE_NAME = "rsvps.xlsx";

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

		// Find the user type based on the provided code
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

		// Add timestamp to data
		const timestamp = Timestamp.now();
		const rsvpData = { ...data, userType, timestamp };

		// Save RSVP data to Firestore and get document ID
		const rsvpDocRef = await db.collection("rsvps").add(rsvpData);
		const rsvpDocId = rsvpDocRef.id;

		// Generate QR code for the document ID
		const qrCodeBuffer = await qrcode.toBuffer(rsvpDocId);

		// Generate a PDF with the QR code
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([300, 150]);
		const pngImage = await pdfDoc.embedPng(new Uint8Array(qrCodeBuffer));
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

		// Convert pdfBytes (Uint8Array) to Buffer
		const pdfBuffer = Buffer.from(pdfBytes);

		const icsContent = `BEGIN:VCALENDAR
                                      VERSION:2.0
                                      PRODID:-//ical.marudot.com//iCal Event Maker
                                      X-WR-CALNAME:Tobiloba and Temitope's wedding
                                      NAME:Tobiloba and Temitope's wedding
                                      CALSCALE:GREGORIAN
                                      BEGIN:VTIMEZONE
                                      TZID:Africa/Lagos
                                      LAST-MODIFIED:20231222T233358Z
                                      TZURL:https://www.tzurl.org/zoneinfo-outlook/Africa/Lagos
                                      X-LIC-LOCATION:Africa/Lagos
                                      BEGIN:STANDARD
                                      TZNAME:WAT
                                      TZOFFSETFROM:+0100
                                      TZOFFSETTO:+0100
                                      DTSTART:19700101T000000
                                      END:STANDARD
                                      END:VTIMEZONE
                                      BEGIN:VEVENT
                                      DTSTAMP:20240821T133745Z
                                      UID:${rsvpDocId}            
                                      DTSTART;TZID=Africa/Lagos:20250322T100000
                                      DTEND;TZID=Africa/Lagos:20250322T180000
                                      SUMMARY:Tobiloba and Temitope's wedding
                                      URL:Tobilobaandope.com
                                      DESCRIPTION:Thank you for your response to our Invitation! We are thrilled to celebrate this special day with you
                                      LOCATION:Lagos Nigeria
                                      BEGIN:VALARM
                                      ACTION:DISPLAY
                                      DESCRIPTION:Tobiloba and Temitope's wedding
                                      TRIGGER:-P12W
                                      END:VALARM
                                      END:VEVENT
                                      END:VCALENDAR`;

		const icsBuffer = Buffer.from(icsContent);

		// Send confirmation email with PDF attachment and QR code
		const mailOptions = {
			from: process.env.OUTLOOK_USER,
			to: data.email,
			subject: "RSVP Confirmation - Tobiloba & Temitope",
			html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 10px;">
            <div style="text-align: center; padding: 10px;">
              <img src="cid:weddingLogo" alt="Wedding Logo" style="max-width: 200px;"/>
            </div>
            
            <h2 style="color: #D4AF37; text-align: center;">Your RSVP is Confirmed!</h2>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center;">
              Dear ${data.firstName} ${data.lastName},
            </p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center;">
              Thank you for your response to our Invitation! We are thrilled to celebrate this special day with you.
            </p>
            
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="font-size: 16px; line-height: 1.5; color: #333; text-align: center;">
                <strong>Your RSVP Code:</strong> ${rsvpDocId}
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              The wedding is scheduled for <strong>22nd March 2025</strong>. Please save the date!
            </p>
            
            <div style="text-align: center; margin-top: 20px;">
              <img src="cid:qrCode" alt="RSVP Code QR" style="max-width: 100%; height: auto;" />
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              Please keep this code safe as it will be needed for your entry to the event.
            </p>
    
            <div style="text-align: center; margin-top: 20px;">
              <a href="cid:addToCalendar" download="Tobiloba_Ope_Wedding_Cal.ics" style="display: inline-block; background-color: #D4AF37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Add to Calendar
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <img src="cid:weddingCoupleImage" alt="Wedding Couple" style="max-width: 100%; height: auto; border-radius: 10px;" />
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              We look forward to celebrating with you on our special day!
            </p>
    
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://Tobilobaandope.com/home" style="display: inline-block; background-color: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Visit Our Website for More Information
              </a>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="font-size: 14px; line-height: 1.5; color: #999;">
                With love,<br/>
                Tobiloba and Temitope
              </p>
            </div>
          </div>
        </div>
      `,
			attachments: [
				{
					filename: "RSVP_Code.pdf",
					content: pdfBuffer,
					contentType: "application/pdf",
				},
				{
					filename: "weddingLogo.png",
					path: path.resolve("public/assets/logo.png"), // Replace with actual path to your logo image
					cid: "weddingLogo", // This is referenced in the HTML above with <img src="cid:weddingLogo" />
				},
				{
					filename: "qrCode.png",
					content: qrCodeBuffer,
					cid: "qrCode", // This is referenced in the HTML above with <img src="cid:qrCode" />
				},
				{
					filename: "weddingCoupleImage.jpg",
					path: path.resolve("public/assets/hero.jpg"), // Replace with actual path to your couple image
					cid: "weddingCoupleImage", // This is referenced in the HTML above with <img src="cid:weddingCoupleImage" />
				},
				{
					filename: "Tobiloba_Ope_Wedding_Cal.ics",
					content: icsBuffer,
					contentType: "text/calendar",
					cid: "addToCalendar",
				},
			],
		};

		const transporter = nodemailer.createTransport({
			host: "smtp.office365.com",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.OUTLOOK_USER, // Your Outlook email address
				pass: process.env.OUTLOOK_PASS, // Your Outlook email password or app password
			},
		});
		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{
				result: "success",
				message: "RSVP received and confirmation email sent.",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing RSVP:", error);
		return NextResponse.json(
			{ result: "error", message: "Error processing RSVP." },
			{ status: 500 }
		);
	}
}
