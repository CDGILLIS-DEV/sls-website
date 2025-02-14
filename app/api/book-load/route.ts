/* eslint-disable */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import  { LoadBooking }  from "@/models/LoadBooking";
import nodemailer from 'nodemailer';
import { sendEmail } from "@/lib/nodemailer";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { db } = await connectToDatabase();
        const collection = db.collection("loadbookings");

        const newBooking = await collection.insertOne(data);


        // Validate input
        if (!data.companyName || !data.email || !data.pickupLocation || !data.dropoffLocation || !data.freightDetails) {
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }
        // Send email notification of new load booking
        await sendEmail(
            "New Load Booking Submitted",
            `A new load booking has been submitted: \nCompany: ${data.companyName} \nEmail: ${data.email}\n
                                Pickup: ${data.pickupLocation}\nDropoff: ${data.dropoffLocation}`
        );


        return NextResponse.json({ success: true, message: "Booking submitted successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Error processing booking:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
    }