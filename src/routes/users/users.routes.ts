import { FastifyInstance } from 'fastify'
import { User as UserCreate, UserLogin } from './users.schema'
import { signIn, signUp, user } from './users.controller'
import { responseDefault, paramsID } from '../../types/api'

export default async function routes(fastify: FastifyInstance, options: Object) {

    fastify.post('/signin', {
        schema: {
            tags: ['user'],
            body: UserLogin,
            response: responseDefault()
        }
    }, signIn)


    fastify.post('/signup', {
        schema: {
            tags: ['user'],
            body: UserCreate,
            response: responseDefault()
        },
    }, signUp)

    fastify.get('/:id', {
        schema: {
            tags: ['user'],
            params: paramsID
        }
    }, user)

}