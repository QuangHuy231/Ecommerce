import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routes/authRouter.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cookiesparser from "cookie-parser";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

// config cors for all routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://ecommerce-frontend-omega-eight.vercel.app",
      "https://ecommerce-admin-two-kohl.vercel.app",
    ],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Cho phép gửi cookie và xác thực
  })
);
app.use(express.json());
app.use(cookiesparser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
