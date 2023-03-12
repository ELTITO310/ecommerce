"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const hashPassword = (ps) => {
    const hash1 = (0, bcrypt_1.hashSync)(ps, 10);
    return hash1;
};
exports.hashPassword = hashPassword;
const verifyPassword = (ps, encrypted) => {
    const verify = (0, bcrypt_1.compareSync)(ps, encrypted);
    return verify;
};
exports.verifyPassword = verifyPassword;
