import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routes/authRouter.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// app.use(cookiesparser());
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
