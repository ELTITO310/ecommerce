"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const product_1 = require("../entities/product");
const typeOrmPlugin = (0, fastify_plugin_1.default)(async (server, options) => {
    const orm = new typeorm_1.DataSource({
        type: 'mongodb',
        url: process.env.DATABASE_URL,
        logger: 'simple-console',
        logging: true,
        synchronize: true,
        entities: [user_1.User, product_1.Product]
    });
    await orm.initialize();
    server.log.info('Succesfully connected to Database');
    server.decorate('db', async (req, rep, done) => {
        server.db = {
            user: orm.getMongoRepository(user_1.User),
            product: orm.getMongoRepository(product_1.Product),
            orm: orm
        };
        done();
    });
    server.addHook('preHandler', (req, res, next) => {
        req.db = {
            user: orm.getMongoRepository(user_1.User),
            product: orm.getMongoRepository(product_1.Product)
        };
        next();
    });
    server.addHook('onClose', async (server) => {
        await server.db.orm.destroy();
    });
});
exports.default = typeOrmPlugin;
