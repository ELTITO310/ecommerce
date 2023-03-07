import { FastifyInstance } from 'fastify'
import { User as UserCreate, UserLogin } from './users.schema'
import { signIn, signUp } from './users.controller'
import { defaultReturn, Error } from '../../types/api'

export default async function routes(fastify: FastifyInstance, options: Object) {

    fastify.post('/signin', {
        schema: {
            tags: ['user'],
            body: UserLogin,
            response: {
                200: defaultReturn,
                500: {
                    description: 'Error response',
                    ...Error
                }
            }
        }
    }, signIn)


    fastify.post('/signup', {
        schema: {
            tags: ['user'],
            body: UserCreate,
            response: {
                201: defaultReturn,
                500: {
                    description: 'Error response',
                    ...Error
                }
            }
        },
    }, signUp)


}