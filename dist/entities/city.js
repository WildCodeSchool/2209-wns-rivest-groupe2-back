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
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const country_1 = require("./country");
const pointOfInterest_1 = require("./pointOfInterest");
let City = class City {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], City.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)({ spatial: true }),
    (0, typeorm_1.Column)({
        type: "geometry",
        srid: 4326,
        nullable: true,
        spatialFeatureType: "Point",
    }),
    __metadata("design:type", String)
], City.prototype, "currentLocation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], City.prototype, "population", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_1.Country, (country) => country.cities),
    __metadata("design:type", country_1.Country)
], City.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pointOfInterest_1.PointOfInterest, (pointOfInterest) => pointOfInterest.city),
    __metadata("design:type", Array)
], City.prototype, "pointOfInterest", void 0);
City = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], City);
exports.City = City;
