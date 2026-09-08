import { findUser } from './auth_queries.js'

async function login(request, reply) {
        const email = request.body.email
        const password = request.body.password
        const refresh_token = await crypto.randomBytes(32).toString('base64')
        const refresh_token_hash =  await bcrypt.hash(refresh_token, 12)
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 *60 * 1000)
        console.log('TOKEN HASH:')
        console.log(refresh_token_hash)
        try{
                const user = await findUser(email)
                if (!user)
                        return reply.code(401).send({ error: 'User not found' })
                const isMatch = await bcrypt.compare(password, user.password_hash)
                if (!isMatch){
                        return reply.code(400).send({error:'Invalid credentials'})
                }
                const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:'1h'})
                await saveRefreshToken(user.id, refresh_token_hash, expiresAt)
                // reply.setCookie(, , {
                //         path:
                // })
                return reply.code(200).send({success:true, userId: user.id, message: 'Login successful', token})
        }
        catch(e)
        {
                return reply.code(500).send({message:'Server error'})
        }

    }
export { login }