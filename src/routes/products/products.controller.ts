import { ObjectId } from 'mongodb';
// import { ObjectID } from 'typeorm';
import { FastifyRequest, FastifyReply } from 'fastify'
import { ProducType, editProductType, paramsIDType } from './products.schema'

export const findAll = async (req: FastifyRequest<{
    Body: ProducType
}>, rep: FastifyReply) => {

    try {
        const products = await req.db.product.find();
    
        rep.status(200).send({
            status: 200,
            products,
            message: 'Sucessfully get all products'
        })
    } catch(e: any) {
        rep.status(500).send({ 
            status: 500,
            message: e.message,
            error: e
         })
    }

}

export const findOne = async (req: FastifyRequest<{
    Params: paramsIDType
}>, rep: FastifyReply) => {
    const product = await req.db.product.findOneBy(req.params.id)
    rep.send({
        status: 200,
        product,
        message: 'Successfully get product'
    })
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
    const dates = req.body
    if(!Object.keys(dates).length) {
        rep.status(400).send({
            status: 400,
            message: 'At least 1 parameter is needed. Body/name/description/price/photo'
        })
    }
    await req.db.product.update({ id: req.params.id }, { ...dates })
    rep.status(200).send({
        status: 200,
        message: 'Update successfully product'
    })
}

export const deleteProduct = async (req: FastifyRequest<{
    Params:  paramsIDType
}>, rep: FastifyReply) => {
    await req.db.product.delete({ id: req.params.id })
    rep.status(200).send({
        status: 200,
        message: 'Delete successfully product'
    })
}