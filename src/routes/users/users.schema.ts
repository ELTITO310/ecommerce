import { Static, Type } from '@sinclair/typebox';

const userImportantInfo = {
    name: Type.String(),
    lastname: Type.String(),
}

export const UserLogin = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String()
}, {
    $id: 'login'
})

export const User = Type.Object({
    ...userImportantInfo,
    email: Type.String({ format: 'email' }),
    password: Type.String()
}, {
    $id: 'user'
})

export const ReturnUser = Type.Object({
    ...userImportantInfo,
    admin: Type.Boolean(),
    shopcart: Type.Optional(Type.Array(Type.Object({
        id: Type.String()
    })))
}, {
    $id: 'user'
})

export type userLoginType = Static<typeof UserLogin>
export type userCreateType = Static<typeof User>
export type returnUserType = Static<typeof ReturnUser>