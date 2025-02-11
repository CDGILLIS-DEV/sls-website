import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import LoadBooking from '@/models/LoadBooking';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // validate required data
    if (!data.companyName || !data.email || !data.pickupLocation || !data.dropoffLocation || !data.freightDetails) {
        return NextResponse.json(
            { success: false, message: "All fields are required." },
            { status: 400 }
        );
    }
    
    // connect to MongoDB
    await connectToDatabase();

    // save to MongoDB
    const newBooking = new LoadBooking(data);
    await newBooking.save();

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        to: data.email,
        subject: "Booking Confirmation",
        text: 'Hello ${data.companyName}, \n\nYour booking has been successfully ' + 
        'received!\n\nDetails:\nPickup: ${data.pickupLocation}\nDropoff: ${data.dropoffLocation}\nFreight:' + 
        ' ${data.freightDetails}\n\nThank you!'
    });

    return NextResponse.json(
        { success: true, message: "Booking saved and email sent." },
        { status: 200}
        );   
   } catch(error) {
     console.error("Error processing booking:", error);
     return NextResponse.json(
        { success: false, message: "Internal server error" },
     );   
   }
}