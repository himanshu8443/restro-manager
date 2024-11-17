import {Bill} from '../models/Bill';
import {Product} from '../models/Product';
import {Request, Response} from 'express';


export async function createBill(req: Request, res: Response) {
    try {
        const { customerName, customerPhone, products, paymentMethod,status } = req.body;
        if (!customerName || !products || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }
        console.log(products);
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found for id ${products[i].id}`,
                });
            }
            total += product.price * products[i].quantity;
        }
        const billProducts = products.map((product:any) => ({
            productId: product.id,
            quantity: product.quantity,
        }));
        const bill = await Bill.create({
            customerName,
            customerPhone,
            products: billProducts,
            total,
            paymentMethod,
            status,
        });
        await bill.populate("products.productId").execPopulate();
        return res.status(201).json({
            success: true,
            message: "Bill created successfully",
            data: bill,
        });
    } catch (error) {
        console.log('Bill creation error:', error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the bill",
        });
    }
}


// get all bills
export async function getBills(req: Request, res: Response) {
    try {
        const bills = await Bill.find().populate("products.productId");
        return res.status(200).json({
            success: true,
            data: bills,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching bills",
        });
    }
}

// get bill by id
export async function getBillById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const bill = await Bill.findById(id);
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Bill not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: bill,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching the bill",
        });
    }
}




