import moongoose, { Document, ObjectId, Schema } from 'mongoose';

import Category from './categories';
import Users from './Users';

interface IProduct extends Document {
  name: String,
  description: String,
  brand: String,
  price: Number,
  discountedPrice: Number,
  stock: Number,
  images: string[],
  categoryid: ObjectId, // reference to categories
  sellerId: ObjectId,
  ratings: {
    average: Number,
    count: Number
  },
  createdAt: Date,
  updatedAt: Date
}


const productSchema = new Schema<IProduct>({
   name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
    categoryid: { type: Schema.Types.ObjectId, ref: Category, required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: Users, required: true },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    }
    }, {
      timestamps: true, // automatically adds createdAt and updatedAt
    }
);

const Product = moongoose.model<IProduct>('Product', productSchema);
export default Product;