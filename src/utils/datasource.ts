import { DataSource } from "typeorm";
import { City } from "../entities/city";
import { Comment } from "../entities/comment";
import { Country } from "../entities/country";
import { Day } from "../entities/day";
import { PointOfInterest } from "../entities/pointOfInterest";
import { Rate } from "../entities/rate";
import { User } from "../entities/user";

const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "admin1234",
  //password: process.env.PWD_POSTGRES,
  database: "postgres",
  synchronize: true,
  entities: [City, Comment, Country, PointOfInterest, Rate, User, Day],
});

export default dataSource;