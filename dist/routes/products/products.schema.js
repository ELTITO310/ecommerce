"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsID = exports.editProduct = exports.responseProducts = exports.Product = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.Product = typebox_1.Type.Object({
    id: typebox_1.Type.Optional(typebox_1.Type.String()),
    name: typebox_1.Type.String({ minLength: 8 }),
    price: typebox_1.Type.Number({ minimum: 10, maximum: 1000000 }),
    photo: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    createdAt: typebox_1.Type.Optional(typebox_1.Type.String()),
    updateAt: typebox_1.Type.Optional(typebox_1.Type.String())
}, {
    $id: 'product'
});
exports.responseProducts = typebox_1.Type.Object({
    products: typebox_1.Type.Array(exports.Product)
});
exports.editProduct = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String({ minLength: 8 })),
    price: typebox_1.Type.Optional(typebox_1.Type.Number({ minimum: 10, maximum: 1000000 })),
    photo: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional(typebox_1.Type.String())
});
exports.paramsID = typebox_1.Type.Object({
    id: typebox_1.Type.String()
});
