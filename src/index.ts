import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config()
import Fastify from 'fastify';
/* Plugins  */
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import cors from '@fastify/cors'
import typeOrmPlugin from './plugins/typeorm'
import jwt from './plugins/jwt'
import swagger from './plugins/swagger'
/* Routes */
import ApiRoute from './routes/products/products.routes'
import AuthRoute from './routes/users/users.routes'
/* Start */
import logger from './utils/logger';

const fastify = Fastify({
    logger: logger
}).withTypeProvider<TypeBoxTypeProvider>()

// Plugins
fastify.register(jwt)
fastify.register(typeOrmPlugin);
fastify.register(swagger)
// fastify.register(cors, {
//     origin: (origin, cb) => {
//         console.log('origin', origin)
//         const hostname = new URL(origin).hostname
//         console.log('hostname', hostname)
//         if(hostname === 'localhost') {
//             cb(null, true)
//             return;
//         }
//         cb(new Error('Not allowed'), false)
//     },
// })
// Routes
fastify.register(AuthRoute, { prefix: 'api/users' })
fastify.register(ApiRoute, { prefix: 'api/products' });


(async() => {
    try {
        await fastify.listen({ port: ((process.env.PORT || 4000) as number) })
        fastify.log.info(`Run! Server http://localhost:${process.env.PORT}`)
    } catch(err) {
        fastify.log.error(err)
    }
})();