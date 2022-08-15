import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "changeme",
  database: "test_db",
  synchronize: true,
  logging: true,
  entities: [Photo, User],
  subscribers: [],
  migrations: [],
});
