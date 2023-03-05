import { Static, Type } from '@sinclair/typebox'

export const Product = Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.String({ minLength: 8 }),
    price: Type.Number({ minimum: 10, maximum: 1000000 }),
    photo: Type.String(),
    description: Type.String(),
    createdAt: Type.String(),
    updateAt: Type.String()
}, {
    $id: 'product'
})

export const responseProduct = Type.Object({
    products: Type.Array(Product)
})

export type ProducType = Static<typeof Product>