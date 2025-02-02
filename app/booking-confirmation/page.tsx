"use client";
import { Suspense } from "react";
import BookingConfirmationContent from "../components/BookingConfirmationContent";

export default function BookingConfirmationPage() {
  return (
    <div className="container mx-auto pt-20 px-6 text-center">
      <Suspense fallback={<p>Loading confirmation...</p>}>
        <BookingConfirmationContent />
      </Suspense>
    </div>
  );
}