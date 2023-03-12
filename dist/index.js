"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify_1 = __importDefault(require("fastify"));
const typeorm_1 = __importDefault(require("./plugins/typeorm"));
const jwt_1 = __importDefault(require("./plugins/jwt"));
const swagger_1 = __importDefault(require("./plugins/swagger"));
/* Routes */
const products_routes_1 = __importDefault(require("./routes/products/products.routes"));
const users_routes_1 = __importDefault(require("./routes/users/users.routes"));
/* Start */
const logger_1 = __importDefault(require("./utils/logger"));
const handlingError_1 = __importDefault(require("./hooks/handlingError"));
const fastify = (0, fastify_1.default)({
    logger: logger_1.default,
}).withTypeProvider();
// console.log(fastify.errorHandler.toString())
// fastify.addHook('onError', handlingError)
// Plugins
fastify.register(jwt_1.default);
fastify.register(typeorm_1.default);
fastify.register(swagger_1.default);
// fastify.register(cors, {
//     origin: (origin, cb) => {
//         console.log('origin', origin)
//         const hostname = new URL(origin).hostname
//         console.log('hostname', hostname)
//         if(hostname === 'localhost') {
//                 cb(null, true)
//                 return;
//             }
//             cb(new Error('Not allowed'), false)
//         },
//     })
// Routes
fastify.setErrorHandler(handlingError_1.default);
fastify.register(users_routes_1.default, { prefix: 'api/users' });
fastify.register(products_routes_1.default, { prefix: 'api/products' });
(async () => {
    try {
        await fastify.listen({ port: (process.env.PORT || 4000) });
        fastify.log.info(`Run! Server http://localhost:${process.env.PORT}`);
    }
    catch (err) {
        fastify.log.error(err);
    }
})();
