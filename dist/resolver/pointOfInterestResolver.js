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
exports.PointOfInterestResolver = void 0;
const type_graphql_1 = require("type-graphql");
const datasource_1 = __importDefault(require("../utils/datasource"));
const apollo_server_1 = require("apollo-server");
const pointOfInterest_1 = require("../entities/pointOfInterest");
const createPoiInput_1 = require("./inputsPoi/createPoiInput");
const updatePoiInput_1 = require("./inputsPoi/updatePoiInput");
const rate_1 = require("../entities/rate");
let PointOfInterestResolver = class PointOfInterestResolver {
    async getRates(poi) {
        var _a;
        const poiWithRates = await datasource_1.default.manager.findOne(pointOfInterest_1.PointOfInterest, {
            where: { id: poi.id },
            relations: ["rates"],
        });
        if (poiWithRates == null) {
            return [];
        }
        return (_a = poiWithRates === null || poiWithRates === void 0 ? void 0 : poiWithRates.rates) !== null && _a !== void 0 ? _a : [];
    }
    async getPOIbyId(id, { user }) {
        const poi = await datasource_1.default.manager.findOne(pointOfInterest_1.PointOfInterest, { where: { id }, relations: ["rates", "comments", "rates.user", "comments.user"] });
        if (poi == null) {
            throw new Error("POI not found");
        }
        if (user != null) {
            poi.rates = poi.rates.filter((rate) => rate.user.id === user.id);
            poi.comments = poi.comments.filter((comment) => comment.user.id === user.id);
        }
        return poi;
    }
    async getAllPoi() {
        const allPois = await datasource_1.default.manager.find(pointOfInterest_1.PointOfInterest);
        return allPois;
    }
    async createPoi(data) {
        const newPoi = new pointOfInterest_1.PointOfInterest();
        newPoi.name = data.name;
        newPoi.address = data.address;
        newPoi.postal = data.postal;
        newPoi.type = data.type;
        newPoi.coordinates = data.coordinates;
        newPoi.creationDate = new Date();
        newPoi.pictureUrl = data.pictureUrl;
        newPoi.websiteURL = data.websiteURL;
        newPoi.description = data.description;
        newPoi.priceRange = data.priceRange;
        newPoi.daysOpen = data.daysOpen;
        newPoi.hoursOpen = data.hoursOpen;
        newPoi.hoursClose = data.hoursClose;
        newPoi.city = data.city;
        const savedPoi = await datasource_1.default.manager.save(pointOfInterest_1.PointOfInterest, newPoi);
        return savedPoi;
    }
    async updatePoi(data) {
        const { id, name, address, postal, type, coordinates, pictureUrl, websiteURL, description, priceRange, city, daysOpen, hoursOpen, hoursClose, } = data;
        try {
            const pointOfInterestToUpdate = await datasource_1.default.manager.findOneByOrFail(pointOfInterest_1.PointOfInterest, {
                id,
            });
            name != null && (pointOfInterestToUpdate.name = name);
            address != null && (pointOfInterestToUpdate.address = address);
            postal != null && (pointOfInterestToUpdate.postal = postal);
            type != null && (pointOfInterestToUpdate.type = type);
            coordinates != null &&
                (pointOfInterestToUpdate.coordinates = coordinates);
            pictureUrl != null && (pointOfInterestToUpdate.pictureUrl = pictureUrl);
            websiteURL != null && (pointOfInterestToUpdate.websiteURL = websiteURL);
            description != null &&
                (pointOfInterestToUpdate.description = description);
            priceRange != null && (pointOfInterestToUpdate.priceRange = priceRange);
            city != null && (pointOfInterestToUpdate.city = city);
            daysOpen != null && (pointOfInterestToUpdate.daysOpen = daysOpen);
            hoursOpen != null && (pointOfInterestToUpdate.hoursOpen = hoursOpen);
            hoursClose != null && (pointOfInterestToUpdate.hoursClose = hoursClose);
            await datasource_1.default.manager.save(pointOfInterest_1.PointOfInterest, pointOfInterestToUpdate);
            return pointOfInterestToUpdate;
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message);
        }
    }
    async deletePoi(id) {
        try {
            await datasource_1.default.manager.delete(pointOfInterest_1.PointOfInterest, { id });
            return "Poi deleted";
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message);
        }
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [rate_1.Rate]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pointOfInterest_1.PointOfInterest]),
    __metadata("design:returntype", Promise)
], PointOfInterestResolver.prototype, "getRates", null);
__decorate([
    (0, type_graphql_1.Query)(() => pointOfInterest_1.PointOfInterest),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PointOfInterestResolver.prototype, "getPOIbyId", null);
__decorate([
    (0, type_graphql_1.Query)(() => [pointOfInterest_1.PointOfInterest]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PointOfInterestResolver.prototype, "getAllPoi", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => pointOfInterest_1.PointOfInterest),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPoiInput_1.CreatePoiInput]),
    __metadata("design:returntype", Promise)
], PointOfInterestResolver.prototype, "createPoi", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => pointOfInterest_1.PointOfInterest),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePoiInput_1.UpdatePoiInput]),
    __metadata("design:returntype", Promise)
], PointOfInterestResolver.prototype, "updatePoi", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PointOfInterestResolver.prototype, "deletePoi", null);
PointOfInterestResolver = __decorate([
    (0, type_graphql_1.Resolver)(pointOfInterest_1.PointOfInterest)
], PointOfInterestResolver);
exports.PointOfInterestResolver = PointOfInterestResolver;
