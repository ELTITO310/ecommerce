"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handlingError = (err, req, rep) => {
    console.log(err.statusCode, (err.status));
    rep.status(Number(err.code) || 500).send({
        error: http_status_codes_1.StatusCodes[(err.code || 500)],
        status: err.code || 500,
        message: err.message || '',
    });
};
exports.default = handlingError;
