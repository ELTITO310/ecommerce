import 'reflect-metadata';

import { join } from 'path'
import dotenv from 'dotenv';
dotenv.config()
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import ApiRoute from './routes/api'
import AuthRoute from './routes/auth'
import typeOrmPlugin from './plugins/typeorm'
import logger from './utils/logger';
const fastify = Fastify({
    logger: logger
}).withTypeProvider<TypeBoxTypeProvider>()

console.log(process.env.NODE_ENV)
// Plugins
fastify.register(typeOrmPlugin);
// Routes
fastify.register(AuthRoute)
fastify.register(ApiRoute);

(async() => {
    try {
        await fastify.listen({ port: 3000 })
        fastify.log.info('Run! Server 127.0.0.1')
    } catch(err) {
        fastify.log.error(err)
    }
})();