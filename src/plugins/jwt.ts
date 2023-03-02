import fp from 'fastify-plugin';
import fastify, { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import { JWT } from '@fastify/jwt'
import jwt from '@fastify/jwt'

declare module 'fastify' {
    interface FastifyRequest {
        jwt: JWT
    }
    export interface FastifyInstance {
        authenticate: any
    }
}

const jwtPlugin: FastifyPluginAsync = fp(async (server, options) => {
    
    server.register(jwt, {
        secret: (process.env.SECRET_JWT as string)
    })

    server.decorate('authenticate', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            req.jwtVerify()
        } catch(err) {
            rep.status(500).send(err)
        }
    });

    server.addHook('preHandler', (req: FastifyRequest, res: FastifyReply, next: any) => {
        req.jwt = server.jwt
        next()
    })

})

export default jwtPlugin