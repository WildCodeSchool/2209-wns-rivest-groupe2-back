"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const datasource_1 = __importDefault(require("./utils/datasource"));
const type_graphql_1 = require("type-graphql");
const userResolver_1 = require("./resolver/userResolver");
const cityResolver_1 = require("./resolver/cityResolver");
const pointOfInterestResolver_1 = require("./resolver/pointOfInterestResolver");
const rateResolver_1 = require("./resolver/rateResolver");
const commentResolver_1 = require("./resolver/commentResolver");
const testResolver_1 = require("./resolver/testResolver");
const user_1 = require("./entities/user");
dotenv.config();
const port = 5000;
const start = async () => {
    await datasource_1.default.initialize();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [
            userResolver_1.UserResolver,
            rateResolver_1.RateResolver,
            commentResolver_1.CommentResolver,
            cityResolver_1.CityResolver,
            pointOfInterestResolver_1.PointOfInterestResolver,
            testResolver_1.DeleteAllEntitiesResolver,
        ],
        authChecker: ({ context }) => {
            if (context.user.email === undefined) {
                return false;
            }
            else
                return true;
        },
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
        context: async ({ req }) => {
            if (req.headers.authorization === undefined ||
                process.env.JWT_SECRET_KEY === undefined) {
                return {};
            }
            else {
                try {
                    const bearer = req.headers.authorization.split("Bearer ")[1];
                    if ((bearer === null || bearer === void 0 ? void 0 : bearer.length) > 0) {
                        const verifiedToken = jsonwebtoken_1.default.verify(bearer, process.env.JWT_SECRET_KEY);
                        const userToken = verifiedToken;
                        const user = await datasource_1.default
                            .getRepository(user_1.User)
                            .findOneByOrFail({ email: userToken.email });
                        return { user };
                    }
                    else {
                        return {};
                    }
                }
                catch (error) {
                    console.log(error);
                    return {};
                }
            }
        },
    });
    try {
        const { url } = await server.listen({ port });
        console.log(`🚀  Server ready at the ${url}`);
    }
    catch (error) {
        console.log("Error starting the server");
    }
};
void start();
