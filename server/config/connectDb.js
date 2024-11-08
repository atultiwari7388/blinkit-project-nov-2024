import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables at the top
dotenv.config();

if (!process.env.MONGO_DB_URL) {
  throw new Error("Please provide MongoDB URL in the .env file");
}

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Stop the server if connection fails
    process.exit(1);
  }
}
