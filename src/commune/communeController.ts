import { Request, Response, Router, NextFunction } from "express";
import { AppDataSource } from "../db/data-source";
import { User } from "../db/entity/User";
import { UserToken } from "../db/entity/UserToken";
import { Commune } from "src/db/entity/Commune";
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

export class CommuneController {
  static communeRepository: Repository<Commune> =
    AppDataSource.getRepository(Commune);
  static userTokenRepository: Repository<UserToken> =
    AppDataSource.getRepository(UserToken);
  static AppDataSourceManager = AppDataSource.manager;
  static userRepository: Repository<User> = AppDataSource.getRepository(User);

  public static async addUser(req: Request, res: Response) {
    try {
      const { userID } = req.body;
      const communeID: number = Number(req.params.id);
      if (!userID) {
        res.status(404).send("we need more power.");
      }
      const commune = await CommuneController.communeRepository.findOne({
        where: {
          commune_id: communeID,
        },
      });
      if (!commune) {
        return res.status(409).send("go away go far away");
      } else {
        if (res.locals.userID == commune.creator.user_id) {
          const user = await CommuneController.userRepository.findOne({
            where: {
              user_id: userID,
            },
          });
          if (user) {
            commune.users.push(user);
            await CommuneController.communeRepository.save(commune);
          } else {
            return res.status(409).send("don't ever talk to me");
          }
        } else {
          return res.status(409).send("don't ever talk to me");
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async getCommune(req: Request, res: Response) {
    try {
      const communeID = parseInt(req.params.commune_id);
      const { userID } = req.body;
      if (!userID) {
        res.status(404).send("we need more power.");
      }
      const existingCommune = await CommuneController.communeRepository.findOne(
        {
          where: {
            commune_id: communeID,
          },
        }
      );
      if (existingCommune) {
        res.status(201).json(existingCommune);
      } else {
        return res.status(409).send("don't ever talk to me");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async postCommune(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(404).send("we need more power.");
      }
      const existingCommune = await CommuneController.communeRepository.findOne(
        {
          where: {
            name: name,
          },
        }
      );
      if (existingCommune) {
        return res.status(409).send("commune already exist");
      }

      const commune = new Commune();
      commune.name = name;

      await CommuneController.communeRepository.save(commune);
      res.status(201).json(commune);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async putCommune(req: Request, res: Response) {
    try {
      const { communeID, name, userID } = req.body;
      if (!(communeID && name && userID)) {
        res.status(404).send("we need more power.");
      }
      const existingCommune = await CommuneController.communeRepository.findOne(
        {
          where: {
            commune_id: communeID,
          },
        }
      );
      if (existingCommune) {
        if (res.locals.userID == existingCommune.creator.user_id) {
          existingCommune.name = name;
          await CommuneController.communeRepository.save(existingCommune);
          res.status(201).json(existingCommune);
        } else {
          return res.status(409).send("don't ever talk to me");
        }
      } else {
        res.status(500).send("there is no fear.");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  public static async deleteCommune(req: Request, res: Response) {
    try {
      const { communeID, userID } = req.body;
      if (!communeID) {
        res.status(404).send("we need more power.");
      }
      const existingCommune = await CommuneController.communeRepository.findOne(
        {
          where: {
            commune_id: communeID,
          },
        }
      );
      if (existingCommune) {
        if (res.locals.userID == existingCommune.creator.user_id) {
          CommuneController.communeRepository.delete(existingCommune);
          res.status(201).json(existingCommune);
        } else {
          return res.status(409).send("don't ever talk to me");
        }
      } else {
        res.status(500).send("there is no fear.");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}
