import { Static, Type } from '@sinclair/typebox';

export const UserLogin = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String()
})

export const returnToken = Type.Object({
    token: Type.String(),
    message: Type.Optional(Type.String())
})

export const UserCreate = Type.Object({
    name: Type.String(),
    lastname: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String()

})

export const ReturnUser = Type.Object({
    name: Type.String(),
    lastname: Type.String(),
    admin: Type.Boolean(),
    shopcart: Type.Optional(Type.Array(Type.Object({

    })))
})

export type userLoginType = Static<typeof UserLogin>
export type returnTokenType = Static<typeof returnToken>