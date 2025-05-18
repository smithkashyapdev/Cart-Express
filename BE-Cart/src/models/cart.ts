import moongoose, { Document, ObjectId, Schema } from 'mongoose';

import User from './Users';
import Product from './products';

interface ICartItem extends Document {
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      quantity: Number,
      priceAtTime: Number
    }
  ]
}

const cartSchema = new Schema<ICartItem>({
  userId: { type: Schema.Types.ObjectId, ref: User, required: true },
    items: [
        {
        productId: { type: Schema.Types.ObjectId, ref: Product, required: true },
        quantity: { type: Number, required: true },
        priceAtTime: { type: Number, required: true }
        }
    ]
}, {
  timestamps: true, // automatically adds createdAt and updatedAt
});
const Cart = moongoose.model<ICartItem>('Cart', cartSchema);
export default Cart;