import { Router } from "express";
import { UserController } from "./userController";
import {accsessUser} from "./middleware/authUser"

export const userRouter = Router();

userRouter.get("/users", accsessUser, UserController.getUsers);
userRouter.get("/users/:id", accsessUser, UserController.getUser);
userRouter.put("/users", accsessUser, UserController.putUser);
userRouter.delete("/users/:id", accsessUser, UserController.deleteUser);

