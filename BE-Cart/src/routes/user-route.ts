import express from 'express';
import { sendOTP, verifyOTP, registerUser } from '../controllers/user-controller';
import upload from '../middleware/upload';
import { body, validationResult } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication routes
 */




// Validation middleware using express-validator
const validateOtp = [
    body('mobile')
    .notEmpty().withMessage("Mobile number can't be empty.").bail()
    .matches(/^\+91[6-9]\d{9}$/).withMessage("Mobile number must start with +91 and be a valid 10-digit Indian number."),
  
  body('email')
    .notEmpty().withMessage("Email is required.").bail()
    .isEmail().withMessage("Enter a valid email address."),
];

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to user's mobile number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/send-otp', validateOtp, validateRequest , sendOTP);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: verify OTP to user's mobile number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *            type: object
 *             required: true
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP verification successfully
 *       400:
 *         description: OTP invalid
 */
router.post('/verify-otp', verifyOTP);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: user registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *            type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "sam"
 *               email:
 *                 type: string
 *                 example: "s@gmail.com"
 *               password:
 *                 type: string
 *                 example: password
 *                mobile:"
 *                 type: string
 *                 example: 9876543210
 *                image:
 *                type: file
 *                example: image
 *     responses:
 *       200:
 *         description: OTP verification successfully
 *       400:
 *         description: OTP invalid
 */
router.post('/register', upload.single('image'), registerUser);

export default router;
