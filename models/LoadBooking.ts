/* eslint-disable */
import mongoose,{ Schema, Document, ObjectId } from "mongoose";

export interface ILoadBooking {
    companyName: string;
    email: string;
    pickupLocation: string;
    dropoffLocation: string;
    freightDetails: string;
    createdAt?: Date;
}

const LoadBookingSchema = new Schema<ILoadBooking>({
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    freightDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

LoadBookingSchema.index({ companyName: 1 }); // Index on createdAt for efficient insert operations




export default ILoadBooking;