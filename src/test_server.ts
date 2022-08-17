import express from "express";
import { userRouter } from "./user/userRouter";
import { authRouter } from "./user/authRouter";
import "reflect-metadata";
import { initDB } from "./db/initDB";

const initServer = (): Promise<void> =>
  new Promise<void>((resolve) => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use(userRouter);
    app.use(authRouter);
    
    app.set("query parser", "extended");
    app.use(express.query({
      arrayLimit: 0
    }));

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
      resolve();
    });
  });

const start = async () => {
  await initDB();

  await initServer();
};

start();
