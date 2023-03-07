import { FastifyInstance } from 'fastify'
import { products, edit, create } from './products.controller'
import { responseProduct, editProduct, Product, paramsID } from './products.schema'
import { Error, defaultReturn } from '../../types/api'

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

    fastify.post('/create', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            body: Product,
            response: {
                201: defaultReturn,
                500: {
                    description: 'Error response',
                    ...Error
                }
            }
        }
    }, create)

    fastify.put('/edit/:id', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            body: editProduct,
            params: paramsID,
            response: {
                200: defaultReturn,
                500: {
                    description: 'Error response',
                    ...Error
                }
            }
        },
    }, edit)

}