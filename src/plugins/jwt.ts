import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import jwt, { JWT } from '@fastify/jwt'

declare module 'fastify' {
    interface FastifyRequest {
        jwt: JWT,
    }
    export interface FastifyInstance {
        authenticate: any,
        admin: any
    }
}

const jwtPlugin: FastifyPluginAsync = fp(async (server, options) => {
    
    server.register(jwt, {
        secret: (process.env.SECRET_JWT as string)
    })

    server.decorate('authenticate', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const token: {
                id: string, iat: number, exp: number
            } = await req.jwtVerify()
            if(Date.now() >= token.exp * 1000) {
                rep.status(401).send({
                    message: 'Token expired',
                    status: 401
                })
            }
            return token;
        } catch(err: any) {
            rep.status(401).send({
                message: 'Unauthorized',
                status: 401,
            })
        }
    });

    server.decorate('admin', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const token = await server.authenticate(req, rep)
            const user = await req.db.user.findOneBy(token.id)
            if(!user?.admin) {
                rep.status(403).send({
                    message: 'Forbidden',
                    status: 403
                })
            }
        } catch(err: any) {
            rep.status(401).send({
                message: 'Unauthorized',
                status: 401
            })
        }
    })

    server.addHook('preHandler', (req: FastifyRequest, res: FastifyReply, next: any) => {
        req.jwt = server.jwt
        next()
    })

})

export default jwtPlugin