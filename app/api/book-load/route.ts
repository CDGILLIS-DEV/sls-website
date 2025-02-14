/* eslint-disable */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import  ILoadBooking  from "@/models/LoadBooking";
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();
        const { db } = await connectToDatabase();
        const data:  ILoadBooking = await req.json();

        // Validate input
        if (!data.companyName || !data.email || !data.pickupLocation || !data.dropoffLocation || !data.freightDetails) {
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }

        // Insert data into MongoDB collection
        const result = await db.collection("loadbookings").insertOne({
            ...data,
            createdAt: new Date(),
        });

        if (!result.acknowledged) {
            throw new Error("Failed to insert booking.");
        }

            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            });
        
            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: email,
              subject: `Load Booking: ${subject}`,
              text: `Thank you for contacting us, ${name}. We will get back to you soon.`,
            });

        console.log("Booking successfully saved:", result.insertedId);
        return NextResponse.json({ success: true, message: "Booking submitted successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Error processing booking:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}