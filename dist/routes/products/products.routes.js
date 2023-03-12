"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_controller_1 = require("./products.controller");
const products_schema_1 = require("./products.schema");
const api_1 = require("../../types/api");
async function routes(fastify, options) {
    fastify.get('/', {
        schema: {
            tags: ['products'],
            response: {
                200: api_1.defaultReturn,
                500: Object.assign({ description: 'Error response' }, api_1.Error)
            }
        }
    }, products_controller_1.findAll);
    fastify.get('/:id', {
        schema: {
            tags: ['products'],
            response: {
                200: api_1.defaultReturn,
                '5xx': Object.assign({ description: 'Error Response' }, api_1.Error)
            }
        }
    }, products_controller_1.findOne);
    fastify.post('/create', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            body: products_schema_1.Product,
            response: {
                201: api_1.defaultReturn,
                500: Object.assign({ description: 'Error response' }, api_1.Error)
            }
        }
    }, products_controller_1.create);
    fastify.put('/edit/:id', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            body: products_schema_1.editProduct,
            params: products_schema_1.paramsID,
            response: {
                200: api_1.defaultReturn,
                500: Object.assign({ description: 'Error response' }, api_1.Error)
            }
        },
    }, products_controller_1.edit);
    fastify.delete('/delete/:id', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            params: products_schema_1.paramsID,
            response: {
                200: api_1.defaultReturn,
                500: Object.assign({ description: 'Error response' }, api_1.Error)
            }
        }
    }, products_controller_1.deleteProduct);
}
exports.default = routes;
