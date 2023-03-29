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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateResolver = void 0;
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const rate_1 = require("../entities/rate");
const pointOfInterest_1 = require("../entities/pointOfInterest");
const user_1 = require("../entities/user");
const datasource_1 = __importDefault(require("../utils/datasource"));
let RateResolver = class RateResolver {
    async getUserRateForPOI(poiId, userId) {
        const userRate = await datasource_1.default.manager.findOne(rate_1.Rate, {
            where: {
                user: { id: userId },
                pointOfInterest: { id: poiId },
            },
            relations: ["user", "pointOfInterest"],
        });
        return userRate !== null && userRate !== void 0 ? userRate : null;
    }
    async ratePOI(poiId, userId, rateInput) {
        const poi = await datasource_1.default.manager.findOne(pointOfInterest_1.PointOfInterest, { where: { id: poiId } });
        const user = await datasource_1.default.manager.findOne(user_1.User, { where: { id: userId } });
        if (poi == null) {
            throw new apollo_server_1.ApolloError(`PointID of interest not found`);
        }
        if (user == null) {
            throw new apollo_server_1.ApolloError(`UserID not found`);
        }
        const rate = new rate_1.Rate();
        rate.rate = rateInput;
        rate.user = user;
        rate.pointOfInterest = poi;
        rate.createDate = new Date();
        try {
            const savedRate = await datasource_1.default.manager.save(rate);
            return savedRate;
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error.message);
        }
    }
    async updatePOIRate(poiId, userId, rateInput) {
        const poi = await datasource_1.default.manager.findOne(pointOfInterest_1.PointOfInterest, { where: { id: poiId } });
        const user = await datasource_1.default.manager.findOne(user_1.User, { where: { id: userId } });
        if (poi == null) {
            throw new apollo_server_1.ApolloError(`PointID of interest not found`);
        }
        if (user == null) {
            throw new apollo_server_1.ApolloError(`UserID not found`);
        }
        const rate = await datasource_1.default.manager.findOne(rate_1.Rate, {
            where: {
                user: { id: user.id },
                pointOfInterest: { id: poi.id },
            },
        });
        if (rate == null) {
            throw new apollo_server_1.ApolloError(`Rate not found for the user and POI`);
        }
        rate.rate = rateInput;
        try {
            const updatedRate = await datasource_1.default.manager.save(rate);
            return updatedRate;
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error.message);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => rate_1.Rate, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("poiId", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "getUserRateForPOI", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => rate_1.Rate),
    __param(0, (0, type_graphql_1.Arg)("poiId", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => Number)),
    __param(2, (0, type_graphql_1.Arg)("rate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "ratePOI", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => rate_1.Rate),
    __param(0, (0, type_graphql_1.Arg)("poiId", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => Number)),
    __param(2, (0, type_graphql_1.Arg)("rate")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "updatePOIRate", null);
RateResolver = __decorate([
    (0, type_graphql_1.Resolver)(rate_1.Rate)
], RateResolver);
exports.RateResolver = RateResolver;
