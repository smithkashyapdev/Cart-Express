import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/Users';
import { OtpModel } from '../models/otp.model';
import { generateOTP, sendOtpToMobile, sendEmail } from '../utils/otp';
import { generateToken } from '../middleware/jwt-authenticate';
import { AuthenticatedRequest } from '../types';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, mobile } = req.body
  try {
    const image = req.file?.filename;
    const isExist = await User.findOne({ mobile })
    if (isExist) {
      res.status(400).json({ message: 'Mobile already registered' })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, mobile, email, password: hashedPassword, image });
    const saved = await newUser.save();
    const jwtToken = generateToken(saved);
    res.status(201).json({ message: 'User registered successfully', token: jwtToken, userId: saved._id });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }

}
const sendOTP = async (req: Request, res: Response): Promise<void> => {
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
const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const { mobile, otp } = req.body;
  const isExist = await OtpModel.findOne({ mobile, otp });
  if (!isExist) {
    res.status(400).json({ message: 'Invalid OTP' });
    return;
  }

  res.status(200).json({ message: 'OTP verified successfully' });
};

const signInUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mobile, password } = req.body;
    console.log('Mobile:', mobile);
    console.log('Password:', password);
    const user = await User.findOne({ mobile });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if(!user.isVerified) {
      res.status(403).json({ message: 'User not verified.' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }
    const jwtToken = generateToken(user);
    res.status(200).json({ message: 'User signed in successfully', token: jwtToken, data: user });
  } catch (err) {
    console.error('Error signing in user:', err);
    res.status(500).json({ message: 'Error signing in user', error: err });
  }

}

const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    //console.log('Request body:', req?.user);
    const { id } = (req as unknown as AuthenticatedRequest).user; // Assuming user ID is stored in req.user by JWT middleware
    const user = await User.findById(id).select('-password'); // Exclude password from response
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User profile retrieved successfully', data: user });
  } catch (err) {
    console.error('Error retrieving user profile:', err);
    res.status(500).json({ message: 'Error retrieving user profile', error: err });
  }
};

const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body; // Assuming user ID is stored in req.user by JWT middleware
    const { name, email, mobile } = req.body;
    const image = req.file?.filename;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobile, image },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User profile updated successfully', data: updatedUser });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ message: 'Error updating user profile', error: err });
  }
};

const deleteUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params; // Assuming user ID is stored in req.user by JWT middleware

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting user profile:', err);
    res.status(500).json({ message: 'Error deleting user profile', error: err });
  }
}

const logoutUser = (req: Request, res: Response): void => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'User logged out successfully' });
}

export const userController = {
  registerUser,
  sendOTP,
  verifyOTP,
  signInUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  logoutUser
};