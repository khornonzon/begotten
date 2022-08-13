import { Router } from "express";
import { UserController } from "./userController";

export const userRouter = Router();

userRouter.get("/users", UserController.getUsers);
userRouter.get("/users/:id", UserController.getUser);
userRouter.post("/users", UserController.postUser);
userRouter.put("/users", UserController.putUser);
userRouter.delete("/users/:id", UserController.deleteUser);
