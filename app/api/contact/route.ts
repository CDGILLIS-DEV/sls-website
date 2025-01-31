import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import nodemailer from "nodemailer";

// Connect to MongoDB
export async function POST(req: Request) {
  await connectDB();

  try {
    // Extract form data
    const { name, email, message } = await req.json();

    // Validate input fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Save inquiry to MongoDB
    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email settings
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER, // The admin receiving the contact form submission
      subject: `New Contact Form Submission from ${name}`,
      text: `You received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Response success message
    return NextResponse.json({
      success: true,
      message: "Message successfully sent & stored in database!",
    });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}