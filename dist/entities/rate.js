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
exports.Rate = exports.rateNumbers = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const pointOfInterest_1 = require("./pointOfInterest");
const user_1 = require("./user");
var rateNumbers;
(function (rateNumbers) {
    rateNumbers[rateNumbers["ONE"] = 1] = "ONE";
    rateNumbers[rateNumbers["TWO"] = 2] = "TWO";
    rateNumbers[rateNumbers["THREE"] = 3] = "THREE";
    rateNumbers[rateNumbers["FOUR"] = 4] = "FOUR";
    rateNumbers[rateNumbers["FIVE"] = 5] = "FIVE";
})(rateNumbers = exports.rateNumbers || (exports.rateNumbers = {}));
let Rate = class Rate {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rate.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: rateNumbers,
        default: rateNumbers.FOUR,
    }),
    __metadata("design:type", Number)
], Rate.prototype, "rate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Rate.prototype, "createDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Rate.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.rates),
    __metadata("design:type", user_1.User)
], Rate.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pointOfInterest_1.PointOfInterest, (pointOfInterest) => pointOfInterest.rates),
    __metadata("design:type", pointOfInterest_1.PointOfInterest)
], Rate.prototype, "pointOfInterest", void 0);
Rate = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Rate);
exports.Rate = Rate;
