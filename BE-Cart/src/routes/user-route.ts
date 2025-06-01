import express from 'express';
import { userController } from '../controllers';
import upload from '../middleware/upload';
import { body, validationResult } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import apiLimiter from '../middleware/api-limitter';
import { authenticateJWT, clearToken } from '../middleware/jwt-authenticate';
import authorizeRoles from '../middleware/role-authenticate';
const router = express.Router();
const { registerUser, sendOTP, verifyOTP, signInUser, updateUserProfile, deleteUserProfile, getUserProfile, logoutUser } = userController;
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
 *     security:
 *       - bearerAuth: []  # ⬅️ This adds JWT token requirement in the header
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
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - insufficient role
 */
router.post('/send-otp', apiLimiter, authenticateJWT, authorizeRoles('admin', 'seller', 'user'), validateOtp, validateRequest, sendOTP);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     security:
 *     - bearerAuth: []  # This tells Swagger to use the Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - otp
 *             properties:
 *               mobile:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       401:
 *         description: Invalid or expired OTP
 *       401:
 *         description: Unauthorized - missing or invalid token
 */
router.post('/verify-otp', authenticateJWT, authorizeRoles('admin', 'seller', 'user'), verifyOTP);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user with profile image
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *               role: 
 *                type: string
 *                enum: [seller, user]
 *                description: User registration with role security. 
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 userId:
 *                   type: string
 *                   example: 60f7e3b97a3c5b001cfb1f01
 *       400:
 *         description: Mobile already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mobile already registered
 *       500:
 *         description: Internal server error during registration
 */

router.post('/signup', apiLimiter, upload.single('image'), registerUser);

const validateUser = [
  body('mobile')
    .notEmpty().withMessage("Mobile number can't be empty.").bail()
    .matches(/^\+91[6-9]\d{9}$/).withMessage("Mobile number must start with +91 and be a valid 10-digit Indian number."),

  body('password')
    .notEmpty().withMessage("password is required.").bail()
];

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - password
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9878250491"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: User@4321
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', apiLimiter, validateUser, signInUser)

/**
 * @swagger
 * /api/auth/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: s
 *              mobile:
 *                type: string
 *                example: "9876543210"
 *              image:
 *               type: string
 *               format: binary
 *               description: Profile image file
 * 
 *     responses:
 *      200:
 *        description: User profile updated successfully
 *       400:
 *        description: Bad request, validation error
 *      401:
 *       description: Unauthorized, user not authenticated
 *      500:
 *       description: Internal server error during profile update
 * 
 * */
router.put('/update', apiLimiter, authenticateJWT, authorizeRoles('admin', 'seller', 'user'), upload.single('image'), updateUserProfile)

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
router.get('/profile', apiLimiter, authenticateJWT, authorizeRoles('admin', 'seller', 'user'), getUserProfile)

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user and clear token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
router.get('/logout', apiLimiter, authenticateJWT, clearToken, logoutUser)

/**
 * @swagger
 * /api/auth/delete:
 *   delete:
 *     summary: Delete a user profile by admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to delete
 *                 example: "66596d920b88c4bba6c3e2fb"
 *     responses:
 *       200:
 *         description: User profile deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, only admin can delete users
 *       404:
 *         description: User not found
 */
router.delete('/delete', apiLimiter, authenticateJWT, authorizeRoles('admin'), deleteUserProfile)


export { router as userRouter };
