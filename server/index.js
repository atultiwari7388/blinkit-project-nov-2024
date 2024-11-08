import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDb.js";

dotenv.config();

const app = express();

// Check for required environment variables
if (!process.env.FRONTEND_URL) {
  console.error("FRONTEND_URL is not defined in environment variables");
  process.exit(1);
}

// Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Placeholder route
app.get("/", (req, res) => {
  //server to  client
  res.json({
    message: "Api is running....",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 8080;

connectDB();

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// A39Zw6ClbIPeEDvh
