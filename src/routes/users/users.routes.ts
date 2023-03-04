import { FastifyInstance } from 'fastify'
import { returnToken, returnTokenType, User as UserCreate, UserLogin, userLoginType } from './users.schema'
import { signIn, signUp } from './users.controller'
import { defaultReturn, Error } from '../../types/api'

export default async function routes(fastify: FastifyInstance, options: Object) {

    fastify.post('/signin', {
        schema: {
            tags: ['user'],
            body: UserLogin,
            response: {
                200: returnToken,
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