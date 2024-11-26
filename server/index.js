import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDb.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import subCategoryRouter from "./routes/subCategory.routes.js";

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

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  // Run server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
