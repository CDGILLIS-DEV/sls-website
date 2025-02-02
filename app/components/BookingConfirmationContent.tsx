"use client";
import { useSearchParams } from "next/navigation";

const BookingConfirmationContent = () => {
  const searchParams = useSearchParams();
  const bookingReference = searchParams.get("ref");

  const handleDownload = () => {
    const content = `
      Booking Confirmation - Simpatico Logistics

      Booking Reference: ${bookingReference}
      Thank you for booking with us. We will process your shipment shortly.

      Simpatico Logistics Services, LLC
    `;

    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Booking_Confirmation_${bookingReference}.pdf`;
    link.click();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">Booking Confirmed!</h1>
      <p className="text-lg text-gray-600">
        Thank you for booking with Simpatico Logistics. Your shipment is confirmed.
      </p>

      <div className="mt-6 bg-white p-6 rounded-md shadow-md inline-block">
        <p className="text-xl font-semibold">Booking Reference:</p>
        <p className="text-2xl text-green-600 font-bold">{bookingReference}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 bg-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Download Confirmation (PDF)
      </button>
    </div>
  );
};

export default BookingConfirmationContent;