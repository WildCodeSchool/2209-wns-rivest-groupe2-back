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
exports.PointOfInterest = exports.priceRange = exports.POIType = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const comment_1 = require("./comment");
const rate_1 = require("./rate");
var POIType;
(function (POIType) {
    POIType["RESTAURANT"] = "restaurant";
    POIType["FASTFOOD"] = "fast-food";
    POIType["BAR"] = "bar";
    POIType["PLACEOFRELIGION"] = "lieu de culte";
    POIType["HOSTEL"] = "hotel";
    POIType["MUSEUM"] = "musee";
})(POIType = exports.POIType || (exports.POIType = {}));
var priceRange;
(function (priceRange) {
    priceRange["LOW"] = "$";
    priceRange["MEDIUM"] = "$$";
    priceRange["HIGH"] = "$$$";
})(priceRange = exports.priceRange || (exports.priceRange = {}));
let PointOfInterest = class PointOfInterest {
    averageRate() {
        if (this.rates === null || this.rates === undefined || this.rates.length === 0) {
            return null;
        }
        const sum = this.rates.reduce((acc, rate) => acc + rate.rate, 0);
        const average = sum / this.rates.length;
        return Number(average.toFixed(1));
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PointOfInterest.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "postal", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: POIType,
        default: POIType.RESTAURANT,
        nullable: true,
    }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Number], { nullable: true }),
    (0, typeorm_1.Column)("float", { array: true, nullable: true }),
    __metadata("design:type", Object)
], PointOfInterest.prototype, "coordinates", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], PointOfInterest.prototype, "creationDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], PointOfInterest.prototype, "averageRate", null);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ array: true, nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "pictureUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "websiteURL", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({
        nullable: true,
        type: "enum",
        enum: priceRange,
    }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "priceRange", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ array: true, nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "daysOpen", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ array: true, nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "hoursOpen", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ array: true, nullable: true }),
    __metadata("design:type", String)
], PointOfInterest.prototype, "hoursClose", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_1.Comment, (comment) => comment.pointOfInterest),
    __metadata("design:type", Array)
], PointOfInterest.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rate_1.Rate, (rate) => rate.pointOfInterest),
    __metadata("design:type", Array)
], PointOfInterest.prototype, "rates", void 0);
PointOfInterest = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], PointOfInterest);
exports.PointOfInterest = PointOfInterest;
