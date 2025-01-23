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
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
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
