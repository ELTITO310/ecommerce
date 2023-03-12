"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = exports.defaultReturn = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.defaultReturn = typebox_1.Type.Object({
    status: typebox_1.Type.Number(),
    message: typebox_1.Type.String()
}, {
    additionalProperties: typebox_1.Type.Optional(typebox_1.Type.Any())
});
exports.Error = typebox_1.Type.Object({
    status: typebox_1.Type.Number(),
    message: typebox_1.Type.String(),
    error: typebox_1.Type.Optional(typebox_1.Type.Any())
});
