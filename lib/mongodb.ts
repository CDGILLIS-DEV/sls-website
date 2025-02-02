import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectToDatabase() {
  if (mongoose.connections[0].readyState) return; // Use existing connection
  await mongoose.connect(MONGODB_URI);
}