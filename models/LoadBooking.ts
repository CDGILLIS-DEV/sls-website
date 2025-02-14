/* eslint-disable */
import mongoose,{ Schema, Document, ObjectId } from "mongoose";

export interface LoadBooking {
    companyName: string;
    email: string;
    pickupLocation: string;
    dropoffLocation: string;
    freightDetails: string;
    createdAt?: Date;
}

const LoadBookingSchema = new Schema<LoadBooking>({
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    freightDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

LoadBookingSchema.index({ companyName: 1 }); // Index on createdAt for efficient insert operations




export default LoadBooking;