import { Router } from "express";
import { UserController } from "./userController";
import {accessUser} from "./middleware/authUser"

export const userRouter = Router();

userRouter.get("/users", accessUser, UserController.getUsers);
userRouter.get("/users/:id", accessUser, UserController.getUser);
userRouter.put("/users", accessUser, UserController.putUser);
userRouter.delete("/users/:id", accessUser, UserController.deleteUser);

