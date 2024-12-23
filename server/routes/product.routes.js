import Router from "express";
import {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  updateProductDetails,
} from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const productRouter = Router();

productRouter.post("/create", auth, admin, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);

//get product details
productRouter.post("/get-product-details", getProductDetails);

//update product
productRouter.put("/update-product-details", auth, admin, updateProductDetails);

//delete product
productRouter.delete("/delete-product", auth, admin, deleteProductDetails);

export default productRouter;
