import {Product} from '../models/Product';
import {Request, Response} from 'express';


export async function createProduct(req: Request, res: Response) {
    try {
        const { name, description, price, image } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({
                success: false,
                message: "Name, description and price are required",
            });
        }
        const product = await Product.create({
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
        const products = await Product.find();
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
        const product = await Product.findById(id);
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
        );
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
        const product = await Product.findByIdAndDelete(id);
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
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }
        const products = await Product.find({
            name: { $regex: new RegExp(name as string, "i") },
        });
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

