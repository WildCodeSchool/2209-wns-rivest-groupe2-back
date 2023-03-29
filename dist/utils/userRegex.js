"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regex = void 0;
class Regex {
    static email(email) {
        this.regex = new RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim);
        return this.regex.test(email);
    }
    static password(password) {
        this.regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/);
        return this.regex.test(password);
    }
}
exports.Regex = Regex;
