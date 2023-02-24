import fP from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { DataSource } from 'typeorm';
import { User } from '../entities/user'
import { Product } from '../entities/product'

declare module 'fastify' {
    interface FastifyInstance {
        orm: DataSource
    }
}

const typeOrmPlugin: FastifyPluginAsync = fP(async (server, options) => {
    const orm: DataSource = new DataSource({
        type: 'mongodb',
        url: process.env.DATABASE_URL,
        logger: 'simple-console',
        logging: true,
        synchronize: true,
        entities: [User, Product]
    })
    
    orm.initialize().then((v) => server.log.info('Succesfully connected to Database'))

    server.decorate('orm', orm);
    
    server.addHook('onClose', async (server) => {
        await server.orm.destroy()
    })
})

export default typeOrmPlugin