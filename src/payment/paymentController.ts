import { Request, Response, Router, NextFunction } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { UserToken } from "../db/entity/UserToken";
import { Commune } from "src/db/entity/Commune";
import { Payment } from "src/db/entity/Payment";
import {
  CannotAttachTreeChildrenEntityError,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { timeStamp } from "console";
import { nextTick } from "process";
import { UsersPayment } from "./types";
import { generalCheck } from "./func";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenKey = "1a2b-3c4d-5e6f-7g8h";

export class PaymentController {
  static paymentRepository: Repository<Payment> =
    AppDataSource.getRepository(Payment);
  static userTokenRepository: Repository<UserToken> =
    AppDataSource.getRepository(UserToken);
  static AppDataSourceManager = AppDataSource.manager;
  static userRepository: Repository<User> = AppDataSource.getRepository(User);

  public static async postPayment(req: Request, res: Response) {
    try {
      const { userID, communeID, paymentDescription, paymentSum } = req.body;
      if (!(userID && communeID && paymentDescription && paymentSum)) {
        res.status(404).send("we need more power.");
      }
      const payment = new Payment();
      const user = await PaymentController.userRepository.findOne({
        where: { user_id: userID },
      });
      if (user) {
        payment.commune_id = communeID;
        payment.description = paymentDescription;
        payment.payment_sum = paymentSum;
        payment.commune_id = communeID;
        payment.user_id = userID;
        user.payments.push(payment);
        await PaymentController.paymentRepository.save(payment);
        await PaymentController.userRepository.save(user);
        res.status(201).json(payment);
      } else {
        return res.status(409).send("don't ever talk to me");
      }
    } catch (err) {
      return res.status(409).send("don't ever talk to me");
    }
  }
  public static async getPayment(req: Request, res: Response) {
    try {
      const paymentID = parseInt(req.params.id);
      const existingPayment = await PaymentController.paymentRepository.findOne(
        {
          where: {
            payment_id: paymentID,
          },
        }
      );
      if (existingPayment) {
        res.status(201).json(existingPayment);
      } else {
        return res.status(409).send("don't ever talk to me");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  public static async getTotalCheck(req: Request, res: Response) {
    try {
      const payments = await PaymentController.paymentRepository.find({
        select: { user_id: true, payment_sum: true },
      });
      payments.sort((p1: Payment, p2: Payment) => {
        return p1.user_id - p2.user_id;
      });
      let usersPayments: UsersPayment[] = [];
      let sum = 0,
        pid = 0;

      for (let i = 0; i < payments.length; i++) {
        if (payments[i].user_id == pid) {
          sum += payments[i].payment_sum;
        } else {
          usersPayments.push({ id: pid, payment: sum });
          sum = 0;
          pid = i;
        }
      }
      const check = generalCheck(usersPayments);
      res.status(201).json(check);
    } catch (err) {
      return res.status(409).send("don't ever talk to me");
    }
  }
}
