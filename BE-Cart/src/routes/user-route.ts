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


// Validation middleware using express-validator
const validateOtp = [
  body('mobile')
    .notEmpty().withMessage("Mobile number can't be empty.")
    .isLength({ min: 10, max: 10 }).withMessage("Mobile number must be exactly 10 digits.")
    .matches(/^[6-9]\d{9}$/).withMessage("Enter a valid Indian mobile number."),
];

router.post('/send-otp', validateOtp, validateRequest , sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/register', upload.single('image'), registerUser);

export default router;
