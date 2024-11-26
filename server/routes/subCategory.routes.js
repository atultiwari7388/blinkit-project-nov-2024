import Router from "express";
import { AddSubCategoryController } from "../controllers/subCategory.controller.js";
import auth from "../middleware/auth.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, AddSubCategoryController);

export default subCategoryRouter;
