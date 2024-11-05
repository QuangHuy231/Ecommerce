import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getLastestProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: "asc" })
      .limit(8)
      .select("name images price _id");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBestSellerProduct = async (req, res) => {
  try {
    const products = await Product.find({
      bestSeller: true,
    })
      .sort({ createdAt: -1 })
      .limit(4)
      .select("name images price _id");
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select(
      "name images price _id category subCategory"
    );
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDetailProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id).select(
      "name images price _id description category subCategory sizes"
    );
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  const { category, subCategory, id } = req.body;
  try {
    const products = await Product.find({
      category,
      subCategory,
      _id: { $ne: id },
    })
      .select("name images price _id")
      .limit(4);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      sizes,
      subCategory,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: "ecommerce",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      sizes: JSON.parse(sizes),
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      images: imageUrl,
      date: Date.now(),
    };

    const product = await Product.create(productData);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};