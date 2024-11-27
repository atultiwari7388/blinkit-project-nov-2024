import Router from "express";
import {
  AddSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategory.controller.js";
import auth from "../middleware/auth.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, AddSubCategoryController);
subCategoryRouter.post("/get", getSubCategoryController);
subCategoryRouter.put("/update", auth, updateSubCategoryController);

export default subCategoryRouter;
