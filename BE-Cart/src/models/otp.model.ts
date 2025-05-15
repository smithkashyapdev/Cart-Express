import mongoose, { Document, Schema } from "mongoose";

interface IOtp extends Document {
  mobile: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
  mobile: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 min (300 sec)
});

export const OtpModel = mongoose.model<IOtp>('Otp', otpSchema);