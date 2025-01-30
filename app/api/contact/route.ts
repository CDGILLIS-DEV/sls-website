import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Set this in your .env file
        pass: process.env.EMAIL_PASS, // Set this in your .env file
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject || "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Error sending message." }, { status: 500 });
  }
}