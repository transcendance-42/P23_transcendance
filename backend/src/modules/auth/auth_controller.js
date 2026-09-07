const findUser = require('./auth_queries')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function login(request, reply) {
        const email = request.body.email
        const password = request.body.password
        try{
                const user = await findUser(email)
                if (!user)
                        return reply.code(401).send({ error: 'User not found' })
                const isMatch = await bcrypt.compare(password, user.password_hash)
                if (!isMatch){
                        return reply.code(400).send({error:'Invalid credentials'})
                }
                const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:'1h'})
                return reply.code(200).send({success:true, id: user.id, message: 'Login successful', token})
        }
        catch(err)
        {
                return reply.code(500).send({message:'Server error'})
        }

    }
module.exports = login