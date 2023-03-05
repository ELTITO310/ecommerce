import { FastifyRequest, FastifyReply } from 'fastify'
import { ProducType } from './products.schema'

export const products = async (req: FastifyRequest<{
    Body: ProducType
}>, rep: FastifyReply) => {

    try {
        const pR = await req.db.product.find();
    
        rep.status(200).send({
            products: pR
        })
    } catch(e: any) {
        rep.status(500).send({ 
            status: 500,
            message: e.message,
            error: e
         })
    }

}

export const edit =  async (req: FastifyRequest, rep: FastifyReply) => {
    return {
        hello: 'world'
    }
}