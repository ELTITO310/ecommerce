"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
const user_1 = require("../../entities/user");
const hash_1 = require("../../utils/hash");
const signIn = async (req, rep) => {
    try {
        const { email, password } = req.body;
        const user = await req.db.user.findOneBy({ email });
        if (!user) {
            return rep.code(404).send({
                message: 'User not found'
            });
        }
        if ((0, hash_1.verifyPassword)(password, user.password)) {
            const token = req.jwt.sign({ id: user._id.toString() }, {
                expiresIn: 1000 * 60 * 60 * 24 * 7
            });
            return { user: {
                    id: user._id.toString(),
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email
                }, token };
        }
        return rep.code(400).send({
            message: 'Email or Password invalid'
        });
    }
    catch (err) {
        rep.status(500).send({ status: 500, message: err.message });
    }
};
exports.signIn = signIn;
const signUp = async (req, rep) => {
    try {
        const { name, lastname, email, password } = req.body;
        const ps = (0, hash_1.hashPassword)(password);
        const user = new user_1.User();
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.password = ps;
        user.admin = false;
        await req.db.user.save(user);
        return rep.code(201).send({
            status: 201,
            message: 'User created successfully'
        });
    }
    catch (error) {
        return rep.code(500).send({ status: 500, message: error.message });
    }
};
exports.signUp = signUp;
