import { AppDataSource } from "./data-source";

export const initDB = async () => {
  await AppDataSource.initialize();
};
