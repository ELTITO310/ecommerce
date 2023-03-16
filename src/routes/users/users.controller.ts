import { FastifyRequest, FastifyReply } from 'fastify'
import { userCreateType, userLoginType } from './users.schema'
import { User } from '../../entities/user';
import { hashPassword, verifyPassword } from '../../utils/hash'

export const signIn = async (req: FastifyRequest<{
    Body: userLoginType
}>, rep: FastifyReply) => {
    const { email, password } = req.body
    const [err, user] = await req.to(req.db.user.findOneBy({ email }))
    if(err) throw rep.internalServerError(err.name)
    if(!user) return rep.notFound('User not found')

    if(verifyPassword(password, user.password)) {
        const token = req.jwt.sign({ id: user._id.toString() }, { 
            expiresIn: 1000 * 60 * 60 * 24 * 7
        })
        return { 
            user: {
                id: user._id.toString(),
                name: user.name,
                lastname: user.lastname,
                email: user.email
            }, 
            token, 
            status: 201,
            message: "Successfully signin"
        }
    }

    return rep.badRequest('Email or password invalid')
}


export const signUp = async (req: FastifyRequest<{
    Body: userCreateType
}>, rep: FastifyReply) => {
    const { name, lastname, email, password } = req.body;
    const ps = hashPassword(password)
    const user = new User()
    user.name = name
    user.lastname = lastname
    user.email = email
    user.password = ps
    user.admin = false
    const [err] = await req.to(req.db.user.save(user));
    if(err) {
        if(err.message.includes('duplicate')) return rep.badRequest('The user already exist')
        throw rep.internalServerError(err.name)
    }
    return rep.code(201).send({
        status: 201,
        message: 'User created successfully'
    })
}