import { PaymentController } from "./paymentController";
import { Router } from "express";
import { accessUser } from "../user/middleware/authUser";

export const paymentRouter = Router();

paymentRouter.get("/payment/:id", accessUser, PaymentController.getPayment);
paymentRouter.post("/payment", accessUser, PaymentController.postPayment);
paymentRouter.get(
  "/payment/check",
  accessUser,
  PaymentController.getTotalCheck
);
