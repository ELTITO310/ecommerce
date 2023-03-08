import { FastifyRequest, FastifyReply, FastifyError } from 'fastify'
import { StatusCodes } from 'http-status-codes'

const handlingError = (err: FastifyError, req: FastifyRequest, rep: FastifyReply) => {
    console.log(err.statusCode, ((err as any).status))
    rep.status(Number(err.code) || 500).send({
        error: StatusCodes[((err.code || 500) as any)],
        status: err.code || 500,
        message: err.message || '',
      })
}

export default handlingError