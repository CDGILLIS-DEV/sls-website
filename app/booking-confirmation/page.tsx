"use client";
import { useSearchParams } from "next/navigation";

export default function BookingConfirmation() {
    const searchParams = useSearchParams();
    const bookingReference = searchParams.get("ref");

    return (
        <div className="container mx-auto pt-20 px-6 text-center">
      <h1 className="text-3xl font-bold text-primary mb-4">Booking Confirmed!</h1>
      <p className="text-lg text-gray-600">
        Thank you for booking with Simpatico Logistics. Your shipment is confirmed.
      </p>

      <div className="mt-6 bg-white p-6 rounded-md shadow-md inline-block">
        <p className="text-xl font-semibold">Booking Reference:</p>
        <p className="text-2xl text-green-600 font-bold">{bookingReference}</p>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-6 bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Download Confirmation (PDF)
      </button>
    </div>      
    );
}