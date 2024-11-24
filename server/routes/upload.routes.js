import Router from "express";
import uploadImageController from "../controllers/uploadImages.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const uploadRouter = Router();

uploadRouter.post(
  "/upload-image",
  auth,
  upload.single("image"),
  uploadImageController
);

export default uploadRouter;