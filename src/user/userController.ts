import express, { Request, Response } from "express";

let id = 0;
let users: User[];
class User {
    public static lastId: number = 0;
    id: number;
    name: string;
    surname: string;
  
    constructor() {
      this.id = User.lastId;
      User.lastId++;
    }
  }
  

function getUsers(req:Request, res:Response){
    res.json(users);
}
function getUser(req:Request, res:Response){
    const userId: number = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
}



function postUser(req:Request, res:Response){
    let user = req.body;
    user.id = id;
    users.push(user);
    id++;
    console.log(users);
    res.send("user added");
}
function deleteUser(req:Request, res:Response){
    let deleteOnID = Number(req.params.id);
    let index = users.findIndex((u) => u.id == deleteOnID);
    console.log(index);
    if (index == -1) {
      res.sendStatus(404);
    } else {
      res.json(users[index]);
      users.splice(index, 1);
    }
}
function putUser(req:Request, res:Response){
    let deleteOnID = Number(req.body.id);
    console.log(deleteOnID);
    let index = users.findIndex((u) => u.id == deleteOnID);
    console.log(index);
    switch (index) {
      case -1:
        res.send("there is no user with such id");
        break;
      default:
        users[index].name = req.body.name;
        users[index].surname = req.body.surname;
        res.send("user with this id updated");
    }
    console.log(users);
}


export {
    User,
    id,
    users,
    getUsers,
    getUser,
    deleteUser,
    postUser,
    putUser
}