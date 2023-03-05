import { FastifyInstance } from 'fastify'
import { products, edit } from './products.controller'
import { responseProduct } from './products.schema'
import { Error } from '../../types/api'

export default async function routes(fastify: FastifyInstance, options: Object) {
    
    fastify.get('/', {
        schema: {
            tags: ['products'],
            response: {
                200: responseProduct,
                500: {
                    description: 'Error response',
                    ...Error
                }
            }
        }
    }, products)

    fastify.get('/edit/:id', {
        preHandler: fastify.authenticate,
        schema: {
            tags: ['products']
        }
    }, edit)


}