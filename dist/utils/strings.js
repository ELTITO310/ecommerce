"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperCaseFirstLetter = exports.detectIp = exports.detectUrl = exports.regExpUrl = void 0;
const ip_regex_1 = __importDefault(require("ip-regex"));
const regExpUrl = new RegExp(/(https?:\/\/[^\s]+)/g);
exports.regExpUrl = regExpUrl;
const detectUrl = (string, cb) => {
    if (regExpUrl.test(string)) {
        cb(string.match(regExpUrl), true);
    }
    else {
        cb(null, false);
    }
};
exports.detectUrl = detectUrl;
const detectIp = (ip, cb) => {
    if (ip_regex_1.default.v4().test(ip)) {
        cb(ip.match((0, ip_regex_1.default)()), true);
    }
    else {
        cb(null, false);
    }
};
exports.detectIp = detectIp;
const upperCaseFirstLetter = (str) => {
    const first = str.slice(0, 1).toUpperCase();
    return `${first}${str.slice(1)}`;
};
exports.upperCaseFirstLetter = upperCaseFirstLetter;
