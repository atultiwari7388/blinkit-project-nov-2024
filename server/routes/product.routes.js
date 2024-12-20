import Router from "express";
import {
  createProductController,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  updateProductDetails,
} from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory
);
productRouter.post("/get-product-details", getProductDetails);

productRouter.put("/update-product-details", auth, admin, updateProductDetails);

export default productRouter;
