import mongoose,{ Schema, Document } from "mongoose";

export interface ILoadBooking extends Document {
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

 export default  mongoose.models.LoadBooking || mongoose.model<ILoadBooking>("LoadBooking", LoadBookingSchema);