import { Request, Response, Router } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { Repository, Timestamp } from "typeorm";
import { timeStamp } from "console";

export class UserController {
  private static userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  public static async getUsers(req: Request, res: Response) {

    if (req.query.limit || req.query.skip)
    {
      if (req.query.limit && req.query.skip)
      {
        try {
          const limit: number = parseInt(req.query.limit as string);
          const offset: number = parseInt(req.query.skip as string);
          const users: User[] = await UserController.userRepository.find({
            order: {id: "ASC"},
            skip: offset,
            take: limit
          });
          res.json(users);
        } catch (err){
          console.log(err);
          res.sendStatus(500);
        }
      } else if (!req.query.skip)
      {
        try {
          const limit: number = parseInt(req.query.limit as string);
          const users: User[] = await UserController.userRepository.find({
            order: {id: "ASC"},
            take:limit
          })
          res.json(users);
        } catch (err){
          console.log(err);
          res.sendStatus(500);
        }
  
      } else
      {
        try {
          const offset: number = parseInt(req.query.skip as string);
          const users: User[] = await UserController.userRepository.find({
            order: {id: "ASC"},
            skip: offset
          });
          res.json(users);
        } catch (err){
          console.log(err);
          res.sendStatus(500);
        }
      }
      
    }
    else
    {
      try {
        const users: User[] = await UserController.userRepository.find();
        res.json(users);
      } catch (err){
        console.log(err);
        res.sendStatus(500);
      }
    }
  }

  public static async getUser(req: Request, res: Response) {
    const userId: number = Number(req.params.id);

    if (Number.isInteger(userId)) {
      const user: User | null = await UserController.userRepository.findOneBy({
        id: userId,
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

  public static async postUser(req: Request, res: Response) {
    const { name, surname } = req.body as User;

    const user = new User();
    user.name = name;
    user.surname = surname;

    await UserController.userRepository.save(user);

    res.send("user added");
  }

  public static async deleteUser(req: Request, res: Response) {
    let deleteOnID = Number(req.params.id);

    if (Number.isInteger(deleteOnID)) {
      const user: User | null = await UserController.userRepository.findOneBy({
        id: deleteOnID,
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
    if (incomingUser.id) {
      const foundedUser: User | null =
        await UserController.userRepository.findOneBy({
          id: incomingUser.id,
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
