import { Product } from "../models/Product";
import { Request, Response } from "express";

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, description, price, image } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, description and price are required",
      });
    }
    const owner = req.user.id;
    const product = await Product.create({
      owner,
      name,
      description,
      price,
      image,
    });
    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the product",
    });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    console.log("user", req.user);
    const owner = req.user.id;
    const products = await Product.find({ owner });

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the products",
    });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const owner = req.user.id;
    const product = await Product.findOne({ _id: id, owner });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the product",
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    const ownerId = req.user.id;
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, description and price are required",
      });
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image },
      { new: true }
    ).where("owner").equals(ownerId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the product",
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;
    const product = await Product.findByIdAndDelete(id).where("owner").equals(ownerId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the product",
    });
  }
}

export async function searchProducts(req: Request, res: Response) {
  try {
    const { name } = req.query;
    const ownerID = req.user.id;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    const products = await Product.find({ owner: ownerID, name: { $regex: name.toString(), $options: "i" } });
    
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while searching the products",
    });
  }
}
