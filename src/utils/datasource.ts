import { DataSource } from "typeorm";
import { City } from "../entities/city";
import { Comment } from "../entities/comment";
import { Country } from "../entities/country";
import { PointOfInterest } from "../entities/pointOfInterest";
import { Rate } from "../entities/rate";
import { User } from "../entities/user";
import * as dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: process.env.PWD_POSTGRES,
  database: "postgres",
  synchronize: true,
  entities: [City, Comment, Country, PointOfInterest, Rate, User],
});

export default dataSource;