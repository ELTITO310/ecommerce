"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_schema_1 = require("./users.schema");
const users_controller_1 = require("./users.controller");
const api_1 = require("../../types/api");
async function routes(fastify, options) {
    fastify.post('/signin', {
        schema: {
            tags: ['user'],
            body: users_schema_1.UserLogin,
            response: {
                200: api_1.defaultReturn,
                500: Object.assign({ description: 'Error response' }, api_1.Error)
            }
        }
    }, users_controller_1.signIn);
    fastify.post('/signup', {
        schema: {
            tags: ['user'],
            body: users_schema_1.User,
            response: {
                201: api_1.defaultReturn,
                500: Object.assign({ description: 'Error response' }, api_1.Error)
            }
        },
    }, users_controller_1.signUp);
}
exports.default = routes;
