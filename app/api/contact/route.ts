import { NextResponse } from 'next/server';
import run  from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import nodemailer from 'nodemailer';



export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    await run();

    const inquiry: Inquiry = ({
      name,
      email,
      subject,
      message,
    });

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
      subject: `Inquiry Received: ${subject}`,
      text: `Thank you for contacting us, ${name}. We will get back to you soon.`,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Error sending message.' }, { status: 500 });
  }
}