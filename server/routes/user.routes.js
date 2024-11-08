import { Router } from "express";
import { registerUserController } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);

export default userRouter;
