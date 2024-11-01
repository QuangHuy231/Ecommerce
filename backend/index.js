import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// app.use(cookiesparser());
// app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
