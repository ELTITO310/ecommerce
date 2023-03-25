import { FastifyRequest, FastifyReply } from 'fastify'
import { ProducType, editProductType } from './products.schema'

import { paramsIDType } from '../../types/api'

export const findAll = async (req: FastifyRequest<{
    Body: ProducType
}>, rep: FastifyReply) => {
    const [err, products] = await req.to(req.db.product.find());
    if(err) throw rep.internalServerError(err.name)

    rep.status(200).send({
        status: 200,
        products,
        message: 'Sucessfully get all products'
    })
}

export const findOne = async (req: FastifyRequest<{
    Params: paramsIDType
}>, rep: FastifyReply) => {
    const [err, product] = await req.to(req.db.product.findOneBy(req.params.id))
    if(err) throw rep.internalServerError(err.name)

    rep.send({
        status: 200,
        product,
        message: 'Successfully get product'
    })
}

export const create = async (req: FastifyRequest<{
    Body: ProducType
}>, rep: FastifyReply) => {
    const { name, description, photo, price } = req.body
    const product = req.db.product.create({ name, description, photo, price })
    const [err] = await req.to(req.db.product.save(product))
    if(err) throw rep.internalServerError(err.name)

    rep.status(201).send({
        message: 'Product create successfully',
        status: 201,
        id: product.id.toString()
    })
}

export const edit =  async (req: FastifyRequest<{
    Body: editProductType,
    Params: paramsIDType
}>, rep: FastifyReply) => {
    console.log(req.user)
    const dates = req.body
    if(!Object.keys(dates).length) {
        rep.status(400).send({
            status: 400,
            message: 'At least 1 parameter is needed. Body/name/description/price/photo'
        })
    }
    const [err] = await req.to(req.db.product.update({ id: req.params.id }, { ...dates }))
    if(err) throw rep.internalServerError(err.name)
    rep.status(200).send({
        status: 200,
        message: 'Update successfully product'
    })
}

export const deleteProduct = async (req: FastifyRequest<{
    Params:  paramsIDType
}>, rep: FastifyReply) => {
    const [err] = await req.to(req.db.product.delete({ id: req.params.id }))
    if(err) throw rep.internalServerError(err.name)
    rep.status(200).send({
        status: 200,
        message: 'Delete successfully product'
    })
}