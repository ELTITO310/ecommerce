"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const jwtPlugin = (0, fastify_plugin_1.default)(async (server, options) => {
    server.register(jwt_1.default, {
        secret: process.env.SECRET_JWT
    });
    server.decorate('authenticate', async (req, rep) => {
        try {
            const token = await req.jwtVerify();
            if (Date.now() >= token.exp * 1000) {
                rep.status(401).send({
                    message: 'Token expired',
                    status: 401
                });
            }
            return token;
        }
        catch (err) {
            rep.status(401).send({
                message: 'Unauthorized',
                status: 401,
            });
        }
    });
    server.decorate('admin', async (req, rep) => {
        try {
            const token = await server.authenticate(req, rep);
            const user = await req.db.user.findOneBy(token.id);
            if (!(user === null || user === void 0 ? void 0 : user.admin)) {
                rep.status(403).send({
                    message: 'Forbidden',
                    status: 403
                });
            }
        }
        catch (err) {
            rep.status(401).send({
                message: 'Unauthorized',
                status: 401
            });
        }
    });
    server.addHook('preHandler', (req, res, next) => {
        req.jwt = server.jwt;
        next();
    });
});
exports.default = jwtPlugin;
