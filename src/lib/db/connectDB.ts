// lib/db/connectDB.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log('ALREADY CONNECTED')
    return;
}

console.log('CONNECTED TO MONGO')
  return mongoose.connect(MONGODB_URI);
}

export default connectDB;
