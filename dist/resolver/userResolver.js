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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UserResolver = void 0;
const argon2 = __importStar(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const type_graphql_1 = require("type-graphql");
const user_1 = require("../entities/user");
const datasource_1 = __importDefault(require("../utils/datasource"));
const apollo_server_1 = require("apollo-server");
const userRegex_1 = require("../utils/userRegex");
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User),
    __metadata("design:type", user_1.User)
], LoginResponse.prototype, "userFromDB", void 0);
LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
let RegisterResponse = class RegisterResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterResponse.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User),
    __metadata("design:type", user_1.User)
], RegisterResponse.prototype, "userFromDB", void 0);
RegisterResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], RegisterResponse);
let UpdateUserInput = class UpdateUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateUserInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "firstname", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "lastname", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "profilePicture", void 0);
UpdateUserInput = __decorate([
    (0, type_graphql_1.InputType)({ description: "Update User data" })
], UpdateUserInput);
let UserResolver = class UserResolver {
    async getAllUsers() {
        return await datasource_1.default.manager.find(user_1.User, {
            relations: { rates: true },
        });
    }
    async getUserById(id) {
        try {
            const userById = await datasource_1.default.manager.findOneByOrFail(user_1.User, { id });
            return userById;
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message);
        }
    }
    async getToken(email, password) {
        try {
            const userFromDB = await datasource_1.default.manager.findOneByOrFail(user_1.User, {
                email,
            });
            if (process.env.JWT_SECRET_KEY === undefined) {
                throw new Error();
            }
            if (await argon2.verify(userFromDB.hashedPassword, password)) {
                const token = jsonwebtoken_1.default.sign({ email: userFromDB.email }, process.env.JWT_SECRET_KEY);
                return { token, userFromDB };
            }
            else {
                throw new Error();
            }
        }
        catch (_a) {
            throw new Error("Invalid Auth");
        }
    }
    async createUser(email, password) {
        try {
            if (!userRegex_1.Regex.email(email) || !userRegex_1.Regex.password(password)) {
                throw Error("Invalid email, password or pseudo");
            }
            if (process.env.JWT_SECRET_KEY === undefined) {
                throw new Error();
            }
            const newUser = new user_1.User();
            newUser.email = email;
            newUser.hashedPassword = await argon2.hash(password);
            const userFromDB = await datasource_1.default.manager.save(user_1.User, newUser);
            const token = jsonwebtoken_1.default.sign({ email: userFromDB.email }, process.env.JWT_SECRET_KEY);
            return { token, userFromDB };
        }
        catch (error) {
            throw new Error("Error try again with an other email or pseudo");
        }
    }
    async updateUser(data) {
        const { id, username, email, firstname, lastname, password, profilePicture, } = data;
        try {
            const userToUpdate = await datasource_1.default.manager.findOneByOrFail(user_1.User, {
                id,
            });
            username != null && (userToUpdate.username = username);
            email != null && (userToUpdate.email = email);
            firstname != null && (userToUpdate.firstname = firstname);
            lastname != null && (userToUpdate.lastname = lastname);
            password != null &&
                (userToUpdate.hashedPassword = await argon2.hash(password));
            profilePicture != null && (userToUpdate.profilePicture = profilePicture);
            await datasource_1.default.manager.save(user_1.User, userToUpdate);
            return userToUpdate;
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message);
        }
    }
    async deleteUser(id) {
        try {
            await datasource_1.default.manager.delete(user_1.User, { id });
            return "user deleted";
        }
        catch (err) {
            throw new apollo_server_1.ApolloError(err.message);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [user_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, type_graphql_1.Query)(() => LoginResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getToken", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => RegisterResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
