import { FastifyRequest, FastifyReply, FastifyError } from 'fastify'

const handlingError = (req: FastifyRequest, rep: FastifyReply, error: FastifyError, done: any) => {
    rep.send(error)
    done()
}

export default handlingError