import "reflect-metadata";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/userResolver";
import { RateResolver } from "./resolver/rateResolver";
import { CommentResolver } from "./resolver/commentResolver";

dotenv.config();

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({ resolvers: [UserResolver, RateResolver] });
  const server = new ApolloServer({ schema });

  const { url }: { url: string } = await server.listen({ port });
  console.log(`🚀 Server is ready at ${url}`);
};

void start();
