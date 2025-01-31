import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

export default Inquiry;