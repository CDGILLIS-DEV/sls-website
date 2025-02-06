import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const client = await connectToDatabase();
    const db = client.db('sls-website'); // Ensure the DB name matches

    await db.collection('bookings').insertOne(data);

    return NextResponse.json({ success: true, message: 'Booking saved successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save booking.' }, { status: 500 });
  }
}