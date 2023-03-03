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
import { DeleteAllEntitiesResolver } from "./resolver/testResolver";
import { IDecodedJWT } from "./interfaces/IDecodedJWT";
import { User } from "./entities/user";
import { UserContext } from "./interfaces/UserContext";

dotenv.config();

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      RateResolver,
      CommentResolver,
      CityResolver,
      PointOfInterestResolver,
      DeleteAllEntitiesResolver,
    ],
    authChecker: ({ context }) => {
      if (context.user.email === undefined) {
        return false;
      } else return true;
    },
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<UserContext> => {
      if (
        req.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          const bearer = req.headers.authorization.split("Bearer ")[1];

          if (bearer?.length > 0) {
            const verifiedToken = jwt.verify(
              bearer,
              process.env.JWT_SECRET_KEY
            );

            const userToken = verifiedToken as IDecodedJWT;

            const user = await dataSource
              .getRepository(User)
              .findOneByOrFail({ email: userToken.email });

            return { user };
          } else {
            return {};
          }
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
