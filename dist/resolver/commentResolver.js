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
exports.CommentResolver = void 0;
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const comment_1 = require("../entities/comment");
const pointOfInterest_1 = require("../entities/pointOfInterest");
const user_1 = require("../entities/user");
const datasource_1 = __importDefault(require("../utils/datasource"));
let CommentResolver = class CommentResolver {
    async getUserCommentForPOI(poiId, userId) {
        const poi = await datasource_1.default.manager.findOne(pointOfInterest_1.PointOfInterest, { where: { id: poiId } });
        const user = await datasource_1.default.manager.findOne(user_1.User, { where: { id: userId } });
        if (poi == null) {
            throw new apollo_server_1.ApolloError(`PointID of interest not found`);
        }
        if (user == null) {
            throw new apollo_server_1.ApolloError(`UserID not found`);
        }
        const userComment = await datasource_1.default.manager.findOne(comment_1.Comment, {
            where: {
                user: { id: user.id },
                pointOfInterest: { id: poi.id },
            },
        });
        return userComment !== null && userComment !== void 0 ? userComment : null;
    }
    async commentPOI(poiId, userId, commentInput) {
        const poi = await datasource_1.default.manager.findOne(pointOfInterest_1.PointOfInterest, { where: { id: poiId } });
        const user = await datasource_1.default.manager.findOne(user_1.User, { where: { id: userId } });
        if (poi == null) {
            throw new apollo_server_1.ApolloError(`PointID of interest not found`);
        }
        if (user == null) {
            throw new apollo_server_1.ApolloError(`UserID not found`);
        }
        const comment = new comment_1.Comment();
        comment.text = commentInput;
        comment.user = user;
        comment.pointOfInterest = poi;
        comment.createDate = new Date();
        try {
            const savedComment = await datasource_1.default.manager.save(comment);
            return savedComment;
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error.message);
        }
    }
    async updatePOIComment(poiId, userId, commentInput) {
        const poi = await datasource_1.default.manager.findOne(pointOfInterest_1.PointOfInterest, { where: { id: poiId } });
        const user = await datasource_1.default.manager.findOne(user_1.User, { where: { id: userId } });
        if (poi == null) {
            throw new apollo_server_1.ApolloError(`PointID of interest not found`);
        }
        if (user == null) {
            throw new apollo_server_1.ApolloError(`UserID not found`);
        }
        const comment = await datasource_1.default.manager.findOne(comment_1.Comment, {
            where: {
                user: { id: user.id },
                pointOfInterest: { id: poi.id },
            },
        });
        if (comment == null) {
            throw new apollo_server_1.ApolloError(`Comment not found for the user and POI`);
        }
        comment.text = commentInput;
        try {
            const updatedComment = await datasource_1.default.manager.save(comment);
            return updatedComment;
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error.message);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => comment_1.Comment, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("poiId", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getUserCommentForPOI", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => comment_1.Comment),
    __param(0, (0, type_graphql_1.Arg)("poiId", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => Number)),
    __param(2, (0, type_graphql_1.Arg)("comment")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "commentPOI", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => comment_1.Comment),
    __param(0, (0, type_graphql_1.Arg)("poiId", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => Number)),
    __param(2, (0, type_graphql_1.Arg)("comment")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "updatePOIComment", null);
CommentResolver = __decorate([
    (0, type_graphql_1.Resolver)(comment_1.Comment)
], CommentResolver);
exports.CommentResolver = CommentResolver;
