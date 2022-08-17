import { Request, Response, Router, NextFunction } from "express";
import { AppDataSource } from "../../db/data-source";
import { User } from "../../db/entity/User";
import { CannotAttachTreeChildrenEntityError, FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { timeStamp } from "console";
import { nextTick } from "process";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

export var accsessUser = async function(req: Request, res: Response, next: NextFunction){
    const providedToken = req.headers.authorization?.split(' ')[1];
    try{
        const decoded = await jwt.verify(providedToken, tokenKey);
        next();
    } catch (err){
        console.log(err);
        res.status(400).send("dont f*ck with me");
    }
}