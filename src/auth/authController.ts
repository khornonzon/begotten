import { Request, Response, Router, NextFunction } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { UserToken } from "../db/entity/UserToken";
import {
  CannotAttachTreeChildrenEntityError,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { timeStamp } from "console";
import { nextTick } from "process";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenKey = "1a2b-3c4d-5e6f-7g8h";

export class UserAuthController {
  static userRepository: Repository<User> = AppDataSource.getRepository(User);
  static userTokenRepository: Repository<UserToken> =
    AppDataSource.getRepository(UserToken);
  static AppDataSourceManager = AppDataSource.manager;

  public static async regUser(req: Request, res: Response) {
    try {
      const { name, surname, password } = req.body;
      if (!(name && surname && password)) {
        res.status(404).send("we need more power.");
      }
      const existingUser = await UserAuthController.userRepository.findOne({
        where: {
          name: name,
          surname: surname,
        },
      });
      if (existingUser) {
        return res.status(409).send("user already exist");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = new User();
      user.name = name;
      user.surname = surname;
      user.password = encryptedPassword;

      await UserAuthController.userRepository.save(user);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async loginUser(req: Request, res: Response) {
    try {
      const { surname, password } = req.body;
      if (!(surname && password)) {
        res.status(400).send("All input is required");
      }
      const user = await UserAuthController.userRepository.findOne({
        where: { surname: surname },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user.user_id }, tokenKey);
        if (!user.tokens) {
          user.tokens = [];
        }
        const user_token: UserToken = new UserToken();
        user_token.user_id = user.user_id;
        user_token.user = user;
        user_token.token = token;
        await UserAuthController.AppDataSourceManager.save(user_token);

        user.tokens.push(user_token);
        await UserAuthController.AppDataSourceManager.save(user);

        res.status(200).json(token);
      } else res.status(400).send("loh");
    } catch (err) {
      console.log(err);
    }
  }
}
