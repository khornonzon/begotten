import { DataSource } from "typeorm";
import { Commune } from "./entity/Commune";
import { User } from "./entity/User";
import { UserToken } from "./entity/UserToken";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "changeme",
  database: "test_db",
  synchronize: false,
  logging: true,
  entities: [User, UserToken, Commune],
  subscribers: [],
  migrations: ["src/db/migrations/*.ts"],
});
