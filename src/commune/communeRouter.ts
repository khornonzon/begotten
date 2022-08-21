import { Router } from "express";
import { CommuneController } from "./communeController";
import { accessUser } from "../user/middleware/authUser";
import { UserController } from "src/user/userController";

export const userRouter = Router();

userRouter.get(
  "/commune/:commune_id",
  accessUser,
  CommuneController.getCommune
);
userRouter.put(
  "/commune/:commune_id",
  accessUser,
  CommuneController.putCommune
);
userRouter.post("/commune", accessUser, CommuneController.postCommune);
userRouter.delete(
  "/commune/:commune_id",
  accessUser,
  CommuneController.deleteCommune
);

userRouter.post("/commune/user/:id", accessUser, CommuneController.addUser);
