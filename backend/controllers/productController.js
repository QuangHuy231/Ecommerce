import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getLastestProduct = async (req, res) => {
  try {
    const products = await Product.find({
      stock: { $gt: 0 },
    })
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
      stock: { $gt: 0 },
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
      "name images price _id category subCategory stock"
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
      "name images price _id description category subCategory sizes stock"
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
      stock,
      subCategory,
      bestSeller,
    } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !sizes ||
      !stock ||
      !subCategory
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

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
      stock: Number(stock),
      bestSeller,
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

export const removeProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const {
      name,
      price,
      description,
      category,
      sizes,
      stock,
      subCategory,
      bestSeller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let existingImages = product.images; // Hình ảnh cũ

    const newImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: "ecommerce",
        });
        return result.secure_url;
      })
    );

    const updatedImages = [...existingImages, ...newImages];

    await Product.findByIdAndUpdate(
      id,
      {
        name,
        price: Number(price),
        description,
        category,
        sizes: JSON.parse(sizes),
        subCategory,
        stock: Number(stock),
        bestSeller: bestSeller === "true" ? true : false,
        images: updatedImages,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
