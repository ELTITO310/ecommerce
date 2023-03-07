import { ObjectId } from 'mongodb';
// import { ObjectID } from 'typeorm';
import { FastifyRequest, FastifyReply } from 'fastify'
import { ProducType, editProductType, paramsIDType, responseProduct } from './products.schema'

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

export const create = async (req: FastifyRequest<{
    Body: ProducType
}>, rep: FastifyReply) => {
    try {
        const { name, description, photo, price } = req.body
        const product = req.db.product.create({ name, description, photo, price })
        await req.db.product.save(product)
        
        console.log(product.id.toString())

        rep.status(201).send({
            message: 'Product create successfully',
            status: 201,
            id: product.id.toString()
        })
    } catch(err: any) {
        rep.status(500).send({
            message: err.message,
            status: 500,
        })
    }
}

export const edit =  async (req: FastifyRequest<{
    Body: editProductType,
    Params: paramsIDType
}>, rep: FastifyReply) => {
    // try {
        const dates = req.body
        if(!Object.keys(dates).length) {
            rep.status(400).send({
                status: 400,
                message: 'At least 1 parameter is needed. Body/name/description/price/photo'
            })
        }
        await req.db.product.update(req.params.id, { ...dates } )

        rep.status(200).send({
            status: 200,
            message: 'Update successfully product'
        })
    // } catch(err: any) {
    //     rep.status(500).send({
    //         message: err.message,
    //         status: 500
    //     })
    // }
}