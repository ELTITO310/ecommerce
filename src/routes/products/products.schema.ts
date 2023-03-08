import { Static, Type } from '@sinclair/typebox'

export const Product = Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.String({ minLength: 8 }),
    price: Type.Number({ minimum: 10, maximum: 1000000 }),
    photo: Type.String(),
    description: Type.String(),
    createdAt: Type.Optional(Type.String()),
    updateAt: Type.Optional(Type.String())
}, {
    $id: 'product'
})

export const responseProducts = Type.Object({
    products: Type.Array(Product)
})

export const editProduct = Type.Object({
    name: Type.Optional(Type.String({ minLength: 8 })),
    price: Type.Optional(Type.Number({ minimum: 10, maximum: 1000000 })),
    photo: Type.Optional(Type.String()),
    description: Type.Optional(Type.String())
})

export const paramsID = Type.Object({
    id: Type.String()
})

export type editProductType = Static<typeof editProduct>
export type ProducType = Static<typeof Product>
export type paramsIDType = Static<typeof paramsID>