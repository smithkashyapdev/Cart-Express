import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    mobile: string;
    email?: string;
    password: string;
    image?: string;
    isVerified: boolean;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    image: { type: String },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model<IUser>('Users', userSchema);