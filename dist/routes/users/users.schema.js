"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnUser = exports.User = exports.UserLogin = void 0;
const typebox_1 = require("@sinclair/typebox");
const userImportantInfo = {
    name: typebox_1.Type.String(),
    lastname: typebox_1.Type.String(),
};
exports.UserLogin = typebox_1.Type.Object({
    email: typebox_1.Type.String({ format: 'email' }),
    password: typebox_1.Type.String()
}, {
    $id: 'login'
});
exports.User = typebox_1.Type.Object(Object.assign(Object.assign({}, userImportantInfo), { email: typebox_1.Type.String({ format: 'email' }), password: typebox_1.Type.String() }), {
    $id: 'user'
});
exports.ReturnUser = typebox_1.Type.Object(Object.assign(Object.assign({}, userImportantInfo), { admin: typebox_1.Type.Boolean(), shopcart: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Object({
        id: typebox_1.Type.String()
    }))) }), {
    $id: 'user'
});
