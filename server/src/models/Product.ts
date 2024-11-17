import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
	{ timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);