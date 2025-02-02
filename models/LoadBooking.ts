import mongoose from "mongoose";

const LoadBookingSchema = new mongoose.Schema({
  shipperName: String,
  contactEmail: String,
  pickupLocation: String,
  deliveryLocation: String,
  freightDetails: String,
}, { timestamps: true });

 const LoadBooking =  mongoose.models.LoadBooking || mongoose.model("LoadBooking", LoadBookingSchema);

 export default LoadBooking;