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
  
        // Validate input
        if (!data.name|| !data.email || !data.message) {
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }

        // Insert data into MongoDB collection
        const result = await db.collection("inquiries").insertOne({
            ...data,
            createdAt: new Date(),
        });

        if (!result.acknowledged) {
          throw new Error("Failed to insert inquiry.");
        }
        
        console.log("Inquiry successfully saved:", result.insertedId);

        await sendEmail(
          "New Inquiry Submitted",
          `A new inquiry has been submitted: \nCompany: ${data.companyName} \nEmail: ${data.email}\n
                              Message: ${data.message}`
      );
        return NextResponse.json({ success: true, message: "Thanks. Your contact information was submitted successfully! Someone will contact you soon." }, { status: 201 });

      } catch (error) {
        console.error("Error processing submission:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
