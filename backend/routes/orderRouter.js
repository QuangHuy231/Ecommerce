import express from "express";
import {
  allOrders,
  cancelOrder,
  momoIPN,
  placeOrder,
  placeOrderByMomo,
  placeOrderByVNPay,
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

orderRouter.delete("/cancel/:id", verifyToken, cancelOrder);
orderRouter.post("/pay-momo", placeOrderByMomo);
orderRouter.post("/callback", momoIPN);

export default orderRouter;
