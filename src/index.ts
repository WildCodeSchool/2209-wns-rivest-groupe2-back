import "reflect-metadata";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server";
import dataSource from "./utils/datasource";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/userResolver";
import { CityResolver } from "./resolver/cityResolver";
import { PointOfInterestResolver } from "./resolver/pointOfInterestResolver";
import { RateResolver } from "./resolver/rateResolver";
import { CommentResolver } from "./resolver/commentResolver";

dotenv.config();

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver, RateResolver, CommentResolver, CityResolver],
    resolvers: [UserResolver, RateResolver, CommentResolver, PointOfInterestResolver],
    authChecker: ({ context }) => {
      console.log("context", context);
      if (context.email === undefined) {
        return false;
      } else return true;
    },
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      console.log('======= test :', req.headers.authorization)
      if (
        req.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          //
          const bearer = req.headers.authorization.split("Bearer ")[1];
          console.log(req.headers.authorization)
          if (bearer.length > 0) {
            const user = jwt.verify(bearer, process.env.JWT_SECRET_KEY);
            return user;
          } else {
            return {}; 
          }
          //
          // const user = jwt.verify(
          //   req.headers.authorization,
          //   process.env.JWT_SECRET_KEY
          // );
          // return user;
        } catch (error) {
          console.log(error);
          return {};
        }
      }
    },
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    console.log("Error starting the server");
  }
};

void start();
