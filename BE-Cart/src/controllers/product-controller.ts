import Product from "../models/products";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page as string);
    limit = parseInt(limit as string);
    const skip = (page - 1) * limit;

   const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments()
    ]);

    res.status(200).json({
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products
    });
    return
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return
        }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  } 
}
export const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product
        .findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
       res.status(404).json({ message: "Product not found" });
       return
    }   
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
}
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
        res.status(404).json({ message: "Product not found" });
        return
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
    }
export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    if (products.length === 0) {
        res.status(404).json({ message: "No products found in this category" });
        return;
    }
    res.status(200).json(products);
    } catch (error) {
    res.status(500).json({ message: "Error fetching products by category" });
  }
};

export const getProductsBySeller = async (req: Request, res: Response) => {
  const { sellerId } = req.params;
  try {
    const products = await Product.find({ sellerId });
    if (products.length === 0) {
       res.status(404).json({ message: "No products found for this seller" });
       return
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by seller" });
  }
}
export const searchProducts = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } }
      ]
    });
    if (products.length === 0) {
       res.status(404).json({ message: "No products found matching the search criteria" });
       return
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products" });
  }
};

export const getProductsByPriceRange = async (req: Request, res: Response) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const products = await Product.find({
      price: { $gte: parseFloat(minPrice as string), $lte: parseFloat(maxPrice as string) }
    });
    if (products.length === 0) {
       res.status(404).json({ message: "No products found in this price range" });
       return
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by price range" });
  }
};

export const getProductsByRating = async (req: Request, res: Response) => {
  const { minRating } = req.query;
  try {
    const products = await Product.find({
      "ratings.average": { $gte: parseFloat(minRating as string) }
    });
    if (products.length === 0) {
       res.status(404).json({ message: "No products found with the specified rating" });
       return
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by rating" });
  }
};

export const getProductsByStockAvailability = async (req: Request, res: Response) => {
  const { inStock } = req.query;
  try {
    const products = await Product.find({
      stock: inStock === "true" ? { $gt: 0 } : { $eq: 0 }
    });
    if (products.length === 0) {
       res.status(404).json({ message: "No products found with the specified stock availability" });
         return
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by stock availability" });
  }
};

export const getProductsByBrand = async (req: Request, res: Response) => {
  const { brand } = req.params;
  try {
    const products = await Product.find({ brand });
    if (products.length === 0) {
       res.status(404).json({ message: "No products found for this brand" });
       return
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by brand" });
  }
}

export const ProductController = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsBySeller,
    searchProducts,
    getProductsByPriceRange,
    getProductsByRating,
    getProductsByStockAvailability,
    getProductsByBrand
}