import { NextResponse } from 'next/server';
import  run  from '@/lib/mongodb';
import LoadBooking from '@/models/LoadBooking';
import nodemailer from 'nodemailer';


export async function POST(req: Request) {
  try {
    const { companyName, email, pickupLocation, dropoffLocation, freightDetails } = await req.json();

    if (!companyName || !email || !pickupLocation || !dropoffLocation || !freightDetails) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    await run();

    const booking: LoadBooking = {
      companyName,
      email,
      pickupLocation,
      dropoffLocation,
      freightDetails,
    };
    

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
      subject: `Booking Confirmation for ${companyName}`,
      text: `Your booking from ${pickupLocation} to ${dropoffLocation} has been received.`,
    });

    return NextResponse.json({ success: true, message: 'Booking confirmed successfully.' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Error processing booking.' }, { status: 500 });
  }
}