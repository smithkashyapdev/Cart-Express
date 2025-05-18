import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/Users';
import { OtpModel } from '../models/otp.model';
import { generateOTP, sendOtpToMobile, sendEmail } from '../utils/otp';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, mobile } = req.body
  try {
    const image = req.file?.filename;
    const isExist = User.findOne({ mobile })
    if (isExist) {
      res.status(400).json({ message: 'Mobile already registered' })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, mobile, email, password: hashedPassword, image });
    const saved = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: saved._id });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }

}

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mobile, email } = req.body;
    console.log('mobile:', mobile);
    console.log('email:', email);
    const otp = generateOTP();

    const message = `Your OTP is: ${otp}. It is valid for 5 minutes.`;
    await OtpModel.deleteMany({ mobile });

    // if (mobile) {
    //   await sendOtpToMobile(message, mobile, otp);
    // }

    // Send OTP to email if provided
    if (email) {
      await sendEmail(email, 'Flipkart-clone : Ecart otp verification', message);
    }

    const newOtpEntry = new OtpModel({ mobile, otp, email });
    await newOtpEntry.save();

    res.status(200).json({ message: 'OTP sent' });
  }
  catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

// OTP Step 2: Verify OTP
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const { mobile, otp } = req.body;
  const isExist = await OtpModel.findOne({ mobile, otp });
  if (!isExist) {
    res.status(400).json({ message: 'Invalid OTP' });
    return;
  }

  res.status(200).json({ message: 'OTP verified successfully' });
};

