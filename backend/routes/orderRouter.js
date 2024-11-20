import express from "express";
import {
  allOrders,
  placeOrder,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/userAuth.js";

const orderRouter = express.Router();

//Admin
orderRouter.get("/list", allOrders);
orderRouter.post("/status", updateStatus);

//Payment features
orderRouter.post("/place-order", verifyToken, placeOrder);

orderRouter.get("/", verifyToken, userOrders);

export default orderRouter;
