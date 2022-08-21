import { Request, Response, Router } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import {
  CannotAttachTreeChildrenEntityError,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { timeStamp } from "console";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenKey = "1a2b-3c4d-5e6f-7g8h";

interface queryParams {
  limit?: number;
  offset?: number;
}

interface bodyRegUser {
  name: string;
  surname: string;
  password: string;
}
export class UserController {
  private static userRepository: Repository<User> =
    AppDataSource.getRepository(User);
  public static async getUsers(
    req: Request<{}, {}, {}, queryParams>,
    res: Response
  ) {
    const { limit, offset } = req.query;
    const options: FindManyOptions<User> = {
      order: {
        user_id: "ASC",
      },
      skip: offset,
      take: limit,
    };
    try {
      const users: User[] = await UserController.userRepository.find(options);
      res.json(users);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async getUser(req: Request, res: Response) {
    const userId: number = Number(req.params.id);

    if (Number.isInteger(userId)) {
      const user: User | null = await UserController.userRepository.findOneBy({
        user_id: userId,
      });

      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    let deleteOnID = Number(req.params.id);

    if (Number.isInteger(deleteOnID)) {
      const user: User | null = await UserController.userRepository.findOneBy({
        user_id: deleteOnID,
      });

      if (user) {
        await UserController.userRepository.remove(user);

        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  }

  public static async putUser(req: Request, res: Response) {
    const incomingUser: User = req.body;
    if (incomingUser.user_id) {
      const foundedUser: User | null =
        await UserController.userRepository.findOneBy({
          user_id: incomingUser.user_id,
        });

      if (foundedUser) {
        console.log(incomingUser);
        await UserController.userRepository.save(incomingUser);
        res.json(incomingUser);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  }
}
