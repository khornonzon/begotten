import { DataSource } from "typeorm";
import { Commune } from "./entity/Commune";
import { DirectDebt } from "./entity/DirectDebt";
import { Payment } from "./entity/Payment";
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
  entities: [User, UserToken, Commune, DirectDebt, Payment],
  subscribers: [],
  migrations: ["src/db/migrations/*.ts"],
});
