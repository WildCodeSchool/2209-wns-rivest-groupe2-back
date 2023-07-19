import { DataSource } from "typeorm";
import { City } from "../entities/city";
import { Comment } from "../entities/comment";
import { PointOfInterest } from "../entities/pointOfInterest";
import { User } from "../entities/user";
import * as dotenv from "dotenv";
import { Favorite } from "../entities/favorite";
import { Role } from "../entities/role";
import { OpeningHours } from "../entities/openingHours";

dotenv.config();

console.log(process.env.NODE_ENV);

const dbHost = process.env.NODE_ENV === "test" ? "dbtest" : "db";
const dbPassword =
  process.env.NODE_ENV === "test" ? "example" : process.env.PWD_POSTGRES;

const dataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: 5432,
  username: "postgres",
  password: dbPassword,
  database: "postgres",
  synchronize: true,
  entities: [
    City,
    Comment,
    PointOfInterest,
    User,
    Favorite,
    OpeningHours,
    Role,
  ],
  migrations: ["src/migrations/*.ts"],
});

export default dataSource;
