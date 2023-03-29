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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const city_1 = require("../entities/city");
const comment_1 = require("../entities/comment");
const country_1 = require("../entities/country");
const pointOfInterest_1 = require("../entities/pointOfInterest");
const rate_1 = require("../entities/rate");
const user_1 = require("../entities/user");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
console.log(process.env.NODE_ENV);
const dbHost = process.env.NODE_ENV === "test" ? "dbtest" : "db";
const dbPassword = process.env.NODE_ENV === "test" ? "example" : process.env.PWD_POSTGRES;
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: dbHost,
    port: 5432,
    username: "postgres",
    password: dbPassword,
    database: "postgres",
    synchronize: true,
    entities: [city_1.City, comment_1.Comment, country_1.Country, pointOfInterest_1.PointOfInterest, rate_1.Rate, user_1.User],
});
exports.default = dataSource;
