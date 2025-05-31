import mongoose, { Document, Schema } from 'mongoose';

interface Address {
  label: 'Home' | 'Work' | string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  isDefault: boolean;
}

export type UserRole = 'user' | 'admin' | 'seller';

// Main User interface extending Document
export interface UserDocument extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  address: Address[];
  isVerified: boolean;
  role: UserRole;  
  createdAt: Date;
  updatedAt: Date;
}


// Address Schema
const addressSchema = new Schema<Address>(
  {
    label: { type: String, enum: ['Home', 'Work'], required: true },
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);



const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [addressSchema],
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin', 'seller'], default: 'user' }
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);
userSchema.index({ mobile: 1 }, { unique: true }); // Ensure mobile is unique
userSchema.index({ email: 1 }, { unique: true }); // Ensure email is unique
const Users = mongoose.model<UserDocument>('users', userSchema);
export default Users;