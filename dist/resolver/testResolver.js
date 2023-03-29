"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllEntitiesResolver = void 0;
const type_graphql_1 = require("type-graphql");
const city_1 = require("../entities/city");
const comment_1 = require("../entities/comment");
const country_1 = require("../entities/country");
const pointOfInterest_1 = require("../entities/pointOfInterest");
const rate_1 = require("../entities/rate");
const user_1 = require("../entities/user");
const datasource_1 = __importDefault(require("../utils/datasource"));
/* import { USER_ROLES } from "../utils/userRoles"; */
let DeleteAllEntitiesResolver = class DeleteAllEntitiesResolver {
    async deleteAllEntities() {
        if (process.env.NODE_ENV !== "test") {
            throw new Error("This resolver is only allowed in test environments");
        }
        // Delete all entities in the database
        await datasource_1.default.manager.delete(city_1.City, {});
        await datasource_1.default.manager.delete(comment_1.Comment, {});
        await datasource_1.default.manager.delete(country_1.Country, {});
        await datasource_1.default.manager.delete(pointOfInterest_1.PointOfInterest, {});
        await datasource_1.default.manager.delete(rate_1.Rate, {});
        await datasource_1.default.manager.delete(user_1.User, {});
        return "All entities deleted successfully";
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeleteAllEntitiesResolver.prototype, "deleteAllEntities", null);
DeleteAllEntitiesResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], DeleteAllEntitiesResolver);
exports.DeleteAllEntitiesResolver = DeleteAllEntitiesResolver;
