"use client";
import mongoose from "mongoose";

const LoadBookingSchema = new mongoose.Schema({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    deliveryDate: "",
    loadDescription: "",
    createdAt: { type: Date, default: Date.now },
});

const LoadBooking = mongoose.models.LoadBooking || mongoose.model("LoadBooking", LoadBookingSchema);

export default LoadBooking;