import { Request, Response, Router, NextFunction } from "express";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../db/entity/User";
import { CannotAttachTreeChildrenEntityError, FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { timeStamp } from "console";
import { nextTick } from "process";
import {UserAuthController} from "../../auth/authController"

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

export const accessUser = async function(req: Request, res: Response, next: NextFunction){
    const providedToken = req.headers.authorization?.split(' ')[1];
    const userToken = await UserAuthController.userTokenRepository.findOne({
        where:{
            token: providedToken
        }
    });
    if (userToken){
        next();
    } else {
        res.status(401).send("don't f*ck with me");
    }

  
}