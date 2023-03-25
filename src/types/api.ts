import { FastifyRequest, FastifyReply, RequestGenericInterface, RouteGenericInterface, RouteHandlerMethod } from 'fastify'
import { Type, Static } from '@sinclair/typebox';

export const defaultReturn = Type.Object({
    status: Type.Number(),
    message: Type.String()
}, {
    additionalProperties: Type.Optional(Type.Any())
})


export const Error = Type.Object({
    status: Type.Number(),
    message: Type.String(),
    error: Type.Optional(Type.Any())
})

export const responseDefault = (aditionalResp: Record<number, any> = {}) => {
    return {
            200: defaultReturn,
            500: {
                description: 'Error response',
                ...Error
            },
            ...aditionalResp
        }
}

export const paramsID = Type.Object({
    id: Type.String()
})

export type paramsIDType = Static<typeof paramsID>
export type errorType = Static<typeof Error>
export type defaultReturn = Static<typeof defaultReturn>