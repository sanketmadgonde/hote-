import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(express.json());
app.use(helmet()); // Secure HTTP headers
app.use(cors());   // Enable CORS
app.use(morgan("combined")); // Logging HTTP requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
