import { FastifyInstance } from 'fastify'
import { findAll, edit, create, deleteProduct, findOne } from './products.controller'
import { editProduct, Product } from './products.schema'
import { responseDefault, paramsID } from '../../types/api'

export default async function routes(fastify: FastifyInstance, options: Object) {
    
    fastify.get('/', {
        schema: {
            tags: ['products'],
            response: responseDefault()
        }
    }, findAll)

    fastify.get('/:id', {
        schema: {
            tags: ['products'],
            response: responseDefault()
        }
    }, findOne)

    fastify.post('/create', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            body: Product,
            response: responseDefault()
        }
    }, create)
    
    fastify.put('/edit/:id', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            body: editProduct,
            params: paramsID,
            response: responseDefault()
        },
    }, edit)
    
    fastify.delete('/delete/:id', {
        preHandler: fastify.admin,
        schema: {
            tags: ['products'],
            params: paramsID,
            response: responseDefault()
        }
    }, deleteProduct)
    
}