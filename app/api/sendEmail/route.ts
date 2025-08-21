import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, firstName, lastName, rsvpDocId, pdfBuffer } = data;

    const mailOptions = {
      from: process.env.OUTLOOK_USER,
      to: email,
      subject: 'RSVP Confirmation',
      html: `
        <div style="text-align: center;">
          <img src="cid:weddingLogo" style="width: 100px;" />
          <h1 style="color: #B29860;">Thank You for Your RSVP!</h1>
          <p>Dear ${firstName} ${lastName},</p>
          <p>Your RSVP Code is: <strong>${rsvpDocId}</strong></p>
          <p>Attached is your RSVP code in PDF format. Please bring it to the wedding.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'RSVP_Code.pdf',
          content: Buffer.from(pdfBuffer, 'base64'),
          contentType: 'application/pdf',
        },
        {
          filename: 'weddingLogo.jpeg',
          path: 'public/assets/images/WeddingEmail/weddingLogo.jpeg',
          cid: 'weddingLogo',
        },
      ],
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_USER,
        pass: process.env.OUTLOOK_PASS,
      },
    });

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email.' }, { status: 500 });
  }
}
