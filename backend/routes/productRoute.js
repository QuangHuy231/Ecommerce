import express from "express";
import {
  createProduct,
  getBestSellerProduct,
  getLastestProduct,
  getAllProducts,
  getDetailProduct,
  getRelatedProducts,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.get("/lastest-product", getLastestProduct);
productRouter.get("/best-seller", getBestSellerProduct);
productRouter.get("/", adminAuth, getAllProducts);
productRouter.get("/:id", getDetailProduct);
productRouter.post("/related-product", getRelatedProducts);

productRouter.post(
  "/create-product",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createProduct
);

productRouter.delete("/delete-product/:id", adminAuth, removeProduct);

export default productRouter;
