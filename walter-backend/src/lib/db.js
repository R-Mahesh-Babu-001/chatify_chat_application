import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");

    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log("MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // 1 status code means fail, 0 means success
  }
};
