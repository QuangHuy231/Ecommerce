import express from "express";
import {
  createProduct,
  getBestSellerProduct,
  getLastestProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.get("/lastest-product", getLastestProduct);
productRouter.get("/best-seller-product", getBestSellerProduct);

productRouter.post(
  "/create-product",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createProduct
);

export default productRouter;
