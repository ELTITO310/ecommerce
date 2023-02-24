import { FastifyInstance } from 'fastify'
import { returnToken, returnTokenType, UserLogin, userLoginType } from '../types/auth'
import { User } from '../entities/user';

export default async function routes(fastify: FastifyInstance, options: Object) {

    fastify.post<{ Body: userLoginType, reply: returnTokenType }>('/signin', {
        schema: {
            body: UserLogin,
            response: {
                200: returnToken
            }
        }
    }, async (req, rep) => {
        const user = await fastify.orm.mongoManager.findOneBy(User, {
            email: req.body.email,
            password: req.body.password
        })
        if(!user) {
            rep.status(404).send({ message: 'User not Found' })
        } else {
            return {
                token: '123'
            }
        }
    })


}