import { ProductController } from "../controllers";

import express from "express";
const router = express.Router();
import { authenticateJWT } from "../middleware/jwt-authenticate";
import apiLimiter from "../middleware/api-limitter";
import { body, validationResult } from "express-validator";
import authorizeRoles from "../middleware/role-authenticate";

const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = ProductController;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: List of products with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f5f1b2c001cfb3b9d"
 *                       name:
 *                         type: string
 *                         example: "iPhone 13"
 *                       price:
 *                         type: number
 *                         example: 799.99
 *                       description:
 *                         type: string
 *                         example: "Latest iPhone model with A15 Bionic chip"
 *                       brand:
 *                         type: string
 *                         example: "Apple"
 *       500:
 *         description: Server error while fetching products
 */
router.get("/", apiLimiter, authenticateJWT, authorizeRoles('admin', 'seller', 'user'), getAllProducts);

router.get("/:id", apiLimiter, authenticateJWT, authorizeRoles('admin', 'seller', 'user'), getProductById);
router.post("/", apiLimiter, authenticateJWT, authorizeRoles('admin', 'seller'), createProduct);
router.put("/:id", apiLimiter, authenticateJWT, authorizeRoles('admin', 'seller'), updateProduct);
router.delete("/:id", apiLimiter, authenticateJWT, authorizeRoles('admin'), deleteProduct);

export { router as productRouter };