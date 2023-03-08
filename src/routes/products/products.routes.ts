import { FastifyInstance } from 'fastify'
import { findAll, edit, create, deleteProduct, findOne } from './products.controller'
import { responseProducts, editProduct, Product, paramsID } from './products.schema'
import { Error, defaultReturn } from '../../types/api'

export default async function routes(fastify: FastifyInstance, options: Object) {
    
    fastify.get('/', {
        schema: {
            tags: ['products'],
            response: {
                200: defaultReturn,
                500: {
                    description: 'Error response',
                    ...Error
                }
            }
        }
    }, findAll)

    fastify.get('/:id', {
        schema: {
            tags: ['products'],
            response: {
                200: defaultReturn,
                '5xx': {
                    description: 'Error Response',
                    ...Error
                }
            }
        }
    }, findOne)

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
    
    fastify.delete('/delete/:id', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            params: paramsID,
            response: {
                200: defaultReturn,
                500: {
                    description: 'Error response',
                    ...Error
                }
            }
        }
    }, deleteProduct)
    
}