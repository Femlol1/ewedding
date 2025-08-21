import { db } from "@/lib/firebaseAdmin";
import { RSVP, TableGroup } from "@/types";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import qrcode from "qrcode";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

export async function GET() {
	try {
		console.log("API Called: Sending RSVP Emails...");

		// 1. Fetch all RSVPs from Firestore
		const rsvpSnapshot = await db.collection("rsvps").get();
		if (rsvpSnapshot.empty) {
			return NextResponse.json({ message: "No RSVPs found." }, { status: 404 });
		}

		const rsvpList: RSVP[] = rsvpSnapshot.docs.map((doc) => {
			const data = doc.data() as Omit<RSVP, "id">; // Ensure 'id' is not in the data
			return { id: doc.id, ...data }; // Now we safely add the Firestore document ID
		});

		// 2. Fetch table numbers based on tableGroupId
		// Fetch table group data
		const tableGroupsSnapshot = await db.collection("tableGroups").get();
		if (tableGroupsSnapshot.empty) {
			console.error("No table groups found in Firestore!");
		} else {
			console.log(`Fetched ${tableGroupsSnapshot.size} table groups.`);
		}

		const tableGroups: Record<string, number> = {};
		tableGroupsSnapshot.forEach((doc) => {
			const data = doc.data() as TableGroup;
			tableGroups[doc.id] = data.tableNumber; // Map tableGroupId to tableNumber
			console.log(
				`Table Group Loaded: ${doc.id} -> Table Number: ${data.tableNumber}`
			);
		});
		// const transporter = nodemailer.createTransport({
		// 	host: "smtp.gmail.com",
		// 	port: 587,
		// 	secure: false,
		// 	auth: {
		// 		user: process.env.GMAIL_USER,
		// 		pass: process.env.GMAIL_PASS,
		// 	},
		// 	tls: {
		// 		rejectUnauthorized: false,
		// 	},
		// });
		const transporter = nodemailer.createTransport({
			service: "Gmail", // Replace with your email service
			port: 587,
			secure: true, // Use TLS (not SSL) for port 587
			auth: {
				user: process.env.SMTP_USER, // Your email (env var)
				pass: process.env.SMTP_PASS, // Your email password (env var)
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		// 4. Send an email to each RSVP
		for (const rsvp of rsvpList) {
			const tableNumber =
				rsvp.tableGroupId && tableGroups[rsvp.tableGroupId]
					? tableGroups[rsvp.tableGroupId]
					: "Not Assigned"; // Fallback if no tableGroupId

			console.log(`Sending email to: ${rsvp.email}`);
			console.log(`Table Number: ${tableNumber}`);
			console.log(`Processing RSVP for: ${rsvp.email}`);
			console.log(`RSVP ID: ${rsvp.id}`);
			console.log(`tableGroupId: ${rsvp.tableGroupId}`);

			// Generate QR Code for RSVP
			const qrCodeBuffer = await qrcode.toBuffer(rsvp.id);

			// Generate PDF
			const pdfDoc = await PDFDocument.create();
			const page = pdfDoc.addPage([300, 200]);
			const pngImage = await pdfDoc.embedPng(new Uint8Array(qrCodeBuffer));
			const { width, height } = pngImage.scale(1);

			page.drawImage(pngImage, {
				x: page.getWidth() / 2 - width / 2,
				y: page.getHeight() / 2 - height / 2,
				width,
				height,
			});

			page.drawText(`RSVP Code: ${rsvp.id}`, {
				x: 10,
				y: 20,
				size: 12,
				color: rgb(0, 0, 0),
			});
			page.drawText(`Table Number: ${tableNumber}`, {
				x: 10,
				y: 40,
				size: 12,
				color: rgb(0, 0, 0),
			});

			const pdfBytes = await pdfDoc.save();
			const pdfBuffer = Buffer.from(pdfBytes);

			// Email Content
			const mailOptions = {
				from: process.env.GMAIL_USER,
				to: rsvp.email,
				subject: "RSVP Confirmation - Tobiloba & Temitope",
				html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 10px;">
              <div style="text-align: center; padding: 10px;">
                <img src="cid:weddingLogo" alt="Wedding Logo" style="max-width: 200px;"/>
              </div>

              <h2 style="color: #D4AF37; text-align: center;">Your RSVP is Confirmed!</h2>

              <p style="text-align: center;">
                Dear ${rsvp.firstName} ${rsvp.lastName},<br/>
                Thank you for your RSVP! We look forward to celebrating with you.
              </p>

              <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
                <p><strong>Your RSVP Code:</strong> ${rsvp.id}</p>
                <p><strong>Table Number:</strong> ${tableNumber}</p>
              </div>

              <div style="text-align: center; margin-top: 20px;">
                <img src="cid:qrCode" alt="RSVP QR Code" style="max-width: 150px;" />
              </div>

              <p style="text-align: center;">
                Please keep this code safe for entry to the event.<br/>
                The wedding is scheduled for <strong>22nd March 2025</strong>.
              </p>

              <div style="text-align: center; margin-top: 20px;">
                <img src="cid:weddingCoupleImage" alt="Wedding Couple" style="max-width: 100%; border-radius: 10px;" />
              </div>

              <p style="text-align: center;">We can't wait to celebrate with you!</p>

              <div style="text-align: center;">
                <a href="https://www.Tobilobaandope.com/home" style="display: inline-block; background-color: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  Visit Our Website
                </a>
              </div>

              <p style="text-align: center;">With love, <br/> Tobiloba and Temitope</p>
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
						path: path.resolve("public/assets/logo.png"),
						cid: "weddingLogo",
					},
					{
						filename: "qrCode.png",
						content: qrCodeBuffer,
						cid: "qrCode",
					},
					{
						filename: "weddingCoupleImage.jpg",
						path: path.resolve("public/assets/hero.jpg"),
						cid: "weddingCoupleImage",
					},
				],
			};

			// Send the email
			await transporter.sendMail(mailOptions);
			// 	sgMail
			// 		.send(mailOptions)
			// 		.then(() => {
			// 			console.log("Email sent");
			// 		})
			// 		.catch((error: any) => {
			// 			console.error(error);
			// 		});
		}
		console.log(`Fetched ${rsvpList.length} RSVPs`);

		return NextResponse.json(
			{ message: "Emails sent successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending RSVP emails:", error);
		return NextResponse.json(
			{ message: "Error sending emails." },
			{ status: 500 }
		);
	}
}
