import { Request, Response, Router } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { CannotAttachTreeChildrenEntityError, FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { timeStamp } from "console";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

interface queryParams{
  limit?: number,
  offset?: number
}

interface bodyRegUser{
  name: string,
  surname: string,
  password: string
}
export class UserController {
  private static userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  public static async getUsers(req: Request<{},{}, {}, queryParams>, res: Response) {
    const {limit, offset} = req.query;
    const options:FindManyOptions<User> = { 
      order: {
      id: "ASC",
      },
      skip: offset,
      take: limit
    }
    try{
      const users: User[] = await UserController.userRepository.find(options);
      res.json(users);
    } catch(err){
      console.log(err);
      res.sendStatus(500);
    }

  }

  public static async regUser(req: Request, res: Response){
    try {
      const {name, surname, password} = req.body;
      if (!(name&&surname&&password))
      {
        res.status(404).send("we need more power.");
      }
      const existingUser = await UserController.userRepository.findOne(surname);
      if (existingUser) {
        return res.status(409).send("user already exist");
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = new User();
      user.name = name;
      user.surname = surname;
      user.password = encryptedPassword;
      const token = jwt.sign({ user_id: user.id}, tokenKey);
      user.token = token;
      await UserController.userRepository.save(user);
      res.status(201).json(user);
    } catch(err){
      console.log(err);
      res.sendStatus(500);
    }
  }
  
  public static async loginUser(req: Request, res: Response){
    try {
      const {surname, password} = req.body;
      if (!(surname && password)) {
        res.status(400).send("All input is required");
      }
      const user = await UserController.userRepository.findOne(surname);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user.id },
          tokenKey
        );
        user.token = token;
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  };
  
  // ...

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
