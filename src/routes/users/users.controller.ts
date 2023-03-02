import { FastifyRequest, FastifyReply } from 'fastify'
import { userCreateType, userLoginType } from './users.schema'
import { User } from '../../entities/user';
import { hashPassword, verifyPassword } from '../../utils/hash'

export const signIn = async (req: FastifyRequest<{
    Body: userLoginType
}>, rep: FastifyReply) => {
    const { email, password } = req.body

    const user = await req.orm.mongoManager.findOneBy(User, { email })
    if(!user) {
        return rep.code(404).send({ 
            message: 'User not found'
         })
    }

    if(verifyPassword(password, user.password)) {
        const token = req.jwt.sign({ id: user.id }, { 
            expiresIn: 1000 * 60 * 60 * 24 * 7
        })
        return { token }
    }

    return rep.code(401).send({ 
        message: 'Email or Password invalid'
     })

}


export const signUp = async (req: FastifyRequest<{
    Body: userCreateType
}>, rep: FastifyReply) => {
    try {
        const { name, lastname, email, password } = req.body;
        const ps = hashPassword(password)
        const user = new User()
        user.name = name
        user.lastname = lastname
        user.email = email
        user.password = ps
        await req.orm.mongoManager.save(user);
        
        return rep.code(201).send({
            message: 'User created successfully'
        })
    } catch(error: any) {
        return rep.code(500).send({ status: 500, message: error.message })
    }
}