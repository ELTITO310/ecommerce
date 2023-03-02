import { FastifyInstance } from 'fastify'
import { returnToken, returnTokenType, UserCreate, UserLogin, userLoginType } from './users.schema'
import { User } from '../../entities/user';
import { signIn, signUp } from './users.controller'
import { defaultReturn } from '../../types/api'

export default async function routes(fastify: FastifyInstance, options: Object) {

    fastify.post('/signin', {
        schema: {
            body: { $ref: 'login#' },
            response: {
                200: returnToken
            }
        }
    }, signIn)


    fastify.post('/signup', {
        schema: {
            body: UserCreate,
            response: {
                201: defaultReturn,
            }
        },
    }, signUp)


}