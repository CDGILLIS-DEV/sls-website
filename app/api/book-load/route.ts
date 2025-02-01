import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LoadBooking from "@/models/LoadBooking";
import nodemailer from "nodemailer";


function generateBookingReference() {
    return 'SLS-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

export async function POST(req: Request) {
    await connectDB();
    const { companyName, contactName, email,phone, pickupLocation, dropoffLocation,pickupDate, deliveryDate, loadDescription } = await 
    req.json();

    try {
        const bookingReference = generateBookingReference();
        // Save booking to database
        const booking = new LoadBooking({
            companyName,
            contactName,
            email,
            phone,
            pickupLocation,
            dropoffLocation,
            pickupDate,
            deliveryDate,
            loadDescription,
            bookingReference,
        });
        await booking.save();

        // Email notification
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER,
            subject: `New Load Booking from ${companyName}`,
            text: `
                Company: ${companyName}
                Contact: ${contactName}
                Email: ${email}
                Phone: ${phone}
                Pickup: ${pickupLocation}
                Drop-off: ${dropoffLocation}
                Pickup Date: ${pickupDate}
                Delivery Date: ${deliveryDate}
                Load: ${loadDescription}
                `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, bookingReference, message: "Booking submitted successfully!"});
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, message: "Failed to submit booking."}, { status: 500 });
    }
}


