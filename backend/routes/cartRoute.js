import express from "express";

import {
  addToCart,
  getUserCart,
  removeItemFromCart,
  updateCart,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/userAuth.js";
const cartRouter = express.Router();

cartRouter.post("/add-to-cart", verifyToken, addToCart);
cartRouter.get("/get-user-cart", verifyToken, getUserCart);
cartRouter.put("/update-cart", verifyToken, updateCart);
cartRouter.post("/remove-from-cart", verifyToken, removeItemFromCart);

export default cartRouter;
