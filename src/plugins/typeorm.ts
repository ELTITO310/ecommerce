import fP from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { DataSource, MongoRepository } from 'typeorm';
import { User } from '../entities/user'
import { Product } from '../entities/product'

declare module 'fastify' {
    interface FastifyInstance {
        db: {
            orm: DataSource,
            user: MongoRepository<User>,
            product: MongoRepository<Product>,
        }
    }
    export interface FastifyRequest {
        db: {
            user: MongoRepository<User>,
            product: MongoRepository<Product>,
        }
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

    server.decorate('db', async (req: FastifyRequest, rep: FastifyReply, done: any) => {
        server.db = {
            user: orm.getMongoRepository(User),
            product: orm.getMongoRepository(Product),
            orm: orm
        }
        done()
    });
    
    server.addHook('preHandler', (req: FastifyRequest, res: FastifyReply, next: any) => {
        req.db = {
            user: orm.getMongoRepository(User),
            product: orm.getMongoRepository(Product)
        }
        next()
    })

    server.addHook('onClose', async (server) => {
        await server.db.orm.destroy()
    })
})

export default typeOrmPlugin