import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import LoadBooking from '@/models/LoadBooking';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const client = await connectToDatabase(); 
    const db = client.db(process.env.MONGODB_DB_NAME)
    const collection =db.collection("loadbookings");

    const data = await req.json();
    const result = await collection.insertOne(data);
    // validate required data
    if (!data.companyName || !data.email || !data.pickupLocation || !data.dropoffLocation || !data.freightDetails) {
        return NextResponse.json(
            { success: false, message: "All fields are required." },
            { status: 400 }
        );
    }
    console.log("***********All Fields Were Filled Properly***********")
    // connect to MongoDB

    // save to MongoDB
    const newBooking = new LoadBooking(data);
    console.log("*************", newBooking, "***************")    
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
     { status: 500 });   
   }
}