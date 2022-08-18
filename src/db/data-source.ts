import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";
import { UserToken } from "./entity/UserToken";
import { Album} from "./entity/Album";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "changeme",
  database: "test_db",
  synchronize: false,
  logging: true,
  entities: [Photo, User, UserToken, Album],
  subscribers: [],
  migrations: ["src/db/migrations"],
});
