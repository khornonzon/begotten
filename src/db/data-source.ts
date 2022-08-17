import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";
import { UserToken } from "./entity/UserToken";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "changeme",
  database: "test_db",
  synchronize: true,
  logging: true,
  entities: [Photo, User, UserToken],
  subscribers: [],
  migrations: [],
});
