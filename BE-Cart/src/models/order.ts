import moongoose, { Document, Schema, ObjectId } from 'mongoose';

import Product from './products';
import Users from './Users';
import { SellerDocument } from './seller';


interface Order extends Document {
    userId: ObjectId,
    items: [
        {
            productId: ObjectId,
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    address: {
        line1: String,
        city: String,
        state: String,
        pincode: String,
        coordinates: [Number] // Optional for delivery tracking
    },
    status: String, // e.g., "Placed", "Shipped", "Delivered"
    payment: {
        method: String, // COD, Stripe, Razorpay
        isPaid: Boolean,
        transactionId: String
    },
    createdAt: Date,
    updatedAt: Date
}

const orderSchema = new Schema<Order>({
    userId: { type: Schema.Types.ObjectId, ref: Users, required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: Product, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    address: {
        line1: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        coordinates: { type: [Number], required: false } // Optional for delivery tracking
    },
    status: { type: String, required: true }, // e.g., "Placed", "Shipped", "Delivered"
    payment: {
        method: { type: String, required: true }, // COD, Stripe, Razorpay
        isPaid: { type: Boolean, required: true },
        transactionId: { type: String, required: true }
    }
}, {
    timestamps: true, // automatically adds createdAt and updatedAt
});

const Order = moongoose.model<Order>('Order', orderSchema);
export default Order;

