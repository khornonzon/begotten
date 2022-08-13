import express from "express";
import { createUserRouter } from "./user/userRouter";
import "reflect-metadata";
import { initDB } from "./db/initDB";

const initServer = (): Promise<void> =>
  new Promise<void>((resolve) => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    const userRouter = createUserRouter();

    app.use(userRouter);

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
