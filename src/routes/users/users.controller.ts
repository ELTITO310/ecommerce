import { FastifyRequest, FastifyReply } from 'fastify'
import { userCreateType, userLoginType } from './users.schema'
import { User } from '../../entities/user';
import { hashPassword, verifyPassword } from '../../utils/hash'

export const signIn = async (req: FastifyRequest<{
    Body: userLoginType
}>, rep: FastifyReply) => {
    // try {
        const { email, password } = req.body

        const user = await req.db.user.findOneBy({ email })
        if(!user) {
            return rep.code(404).send({ 
                message: 'User not found'
            })
        }

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

        return rep.code(400).send({ 
            message: 'Email or Password invalid'
        })
    // } catch(err: any) {
    //     rep.status(500).send({ status: 500, message: err.message })
    // }
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
        user.admin = false
        await req.db.user.save(user);
        
        return rep.code(201).send({
            status: 201,
            message: 'User created successfully'
        })
    } catch(error: any) {
        return rep.code(500).send({ status: 500, message: error.message })
    }
}