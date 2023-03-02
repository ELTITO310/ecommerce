import { Type, Static } from '@sinclair/typebox';

export const defaultReturn = Type.Object({
    status: Type.Optional(Type.Number()),
    message: Type.String(),
})

export const Error = Type.Object({
    status: Type.Optional(Type.Number()),
    message: Type.String(),
    error: Type.Optional(Type.Any())
})

export type errorType = Static<typeof Error>
export type defaultReturn = Static<typeof defaultReturn>