import { Router } from "express";
import { UserAuthController } from "./authController";

export const authRouter = Router();

authRouter.post("/registration", UserAuthController.regUser);
authRouter.post("/login", UserAuthController.loginUser);