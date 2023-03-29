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
exports.CityResolver = void 0;
const type_graphql_1 = require("type-graphql");
const city_1 = require("../entities/city");
const datasource_1 = __importDefault(require("../utils/datasource"));
const apollo_server_1 = require("apollo-server");
let CityType = class CityType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CityType.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CityType.prototype, "currentLocation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], CityType.prototype, "population", void 0);
CityType = __decorate([
    (0, type_graphql_1.InputType)()
], CityType);
let UpdatedCityType = class UpdatedCityType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdatedCityType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatedCityType.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatedCityType.prototype, "currentLocation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdatedCityType.prototype, "population", void 0);
UpdatedCityType = __decorate([
    (0, type_graphql_1.InputType)({ description: "update city data" })
], UpdatedCityType);
let CityResolver = class CityResolver {
    async getAllCities() {
        return await datasource_1.default.manager.find(city_1.City, {
            relations: { country: true },
        });
    }
    async createCity(data) {
        const newCity = new city_1.City();
        newCity.name = data.name;
        newCity.currentLocation = data.currentLocation;
        newCity.population = data.population;
        try {
            const cityFromDB = await datasource_1.default.manager.save(city_1.City, newCity);
            return cityFromDB;
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message);
        }
    }
    async updateCity(data) {
        const { id, name, currentLocation, population } = data;
        try {
            const cityToUpdate = await datasource_1.default.manager.findOneByOrFail(city_1.City, {
                id,
            });
            name != null && (cityToUpdate.name = name);
            currentLocation != null &&
                (cityToUpdate.currentLocation = currentLocation);
            population != null && (cityToUpdate.population = population);
            await datasource_1.default.manager.save(city_1.City, cityToUpdate);
            return cityToUpdate;
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error.message);
        }
    }
    async deleteCity(id) {
        try {
            await datasource_1.default.manager.delete(city_1.City, { id });
            return "city deleted";
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [city_1.City]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "getAllCities", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => city_1.City),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CityType]),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "createCity", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => city_1.City),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatedCityType]),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "updateCity", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CityResolver.prototype, "deleteCity", null);
CityResolver = __decorate([
    (0, type_graphql_1.Resolver)(city_1.City)
], CityResolver);
exports.CityResolver = CityResolver;
