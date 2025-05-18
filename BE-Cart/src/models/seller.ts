import mongoose, { Document, Schema } from 'mongoose';

// Main User interface extending Document
export interface SellerDocument extends Document {
  name: string;
  email: string;
  mobile: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sellerScheme = new Schema<SellerDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);




export default mongoose.model<SellerDocument>('Seller', sellerScheme);