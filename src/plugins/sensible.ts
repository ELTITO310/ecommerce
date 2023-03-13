import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import sensible from '@fastify/sensible'

declare module 'fastify' {
    interface FastifyRequest {
        to<T>(to: Promise<T>): Promise<SensibleTypes.ToType<T>>;
    }
}

const sensiblePlugin: FastifyPluginAsync = fp(async (fastify, opts) => {

    fastify.register(sensible)
    
    fastify.addHook('preHandler', (req, rep, done) => {
        req.to = fastify.to
        done()
    })
    
})

export default sensiblePlugin;