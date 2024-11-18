import mongoose from "mongoose";
const billSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		customerName: {
			type: String,
			required: true,
		},
		customerPhone: {
			type: String,
			required: false,
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["Pending", "Paid"],
			default: "Pending",
		},
		paymentMethod: {
			type: String,
			enum: ["Cash", "Card",'Online'],
			required: true,
		},
		paymentDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export const Bill = mongoose.models.Bill || mongoose.model("Bill", billSchema);