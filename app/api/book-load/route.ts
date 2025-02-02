import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import LoadBooking from "@/models/LoadBooking";
import nodemailer from "nodemailer";

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,      // Your email address
    pass: process.env.EMAIL_PASS,      // Your email password or app password
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();

    // 1️⃣ Save Booking to MongoDB
    const newBooking = new LoadBooking(data);
    await newBooking.save();

    // 2️⃣ Send Confirmation Email to User
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.contactEmail,
      subject: "Booking Confirmation - Simpatico Logistics",
      text: `
        Dear ${data.shipperName},

        Thank you for booking your load with Simpatico Logistics Services LLC. 
        Here are the details of your booking:

        Pickup Location: ${data.pickupLocation}
        Delivery Location: ${data.deliveryLocation}
        Freight Details: ${data.freightDetails}

        We will contact you shortly with further updates. 

        Best regards,
        Simpatico Logistics Team
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Booking saved and confirmation email sent!" });
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json({ success: false, message: "Error processing booking." }, { status: 500 });
  }
}