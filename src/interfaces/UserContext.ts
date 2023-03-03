import { Request } from "express";
import { User } from "../entities/user";

export interface UserContext {
    req?: Request;
    user?: User;
}