import { Router } from "express";
import { CommuneController } from "./communeController";
import { accessUser } from "../user/middleware/authUser";

export const communeRouter = Router();

communeRouter.get(
  "/commune/:commune_id",
  accessUser,
  CommuneController.getCommune
);
communeRouter.put(
  "/commune/:commune_id",
  accessUser,
  CommuneController.putCommune
);
communeRouter.post("/commune", accessUser, CommuneController.postCommune);
communeRouter.delete(
  "/commune/:commune_id",
  accessUser,
  CommuneController.deleteCommune
);

communeRouter.post("/commune/user/:id", accessUser, CommuneController.addUser);
