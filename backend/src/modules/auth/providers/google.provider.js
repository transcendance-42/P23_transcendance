const jwtDecode = require('jwt-decode')
const {OAuth2Client} = require('google-auth-library')
const crypto = require('crypto')

// ajouter fonction de revocation

async function authGoogleRoutes(fastify){

    const oauth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL)

    let userCredential = null

    const scopes = [
        'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
    ];

    fastify.get("/auth/google", async (request, reply) => {

        // a implementer des qu'on setup les session state et cookie
        // const state = crypto.randomBytes(32).toString('hex');
        // request.session.state = state

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            // state:state
        })
        return reply.redirect (authUrl)
    })

    fastify.get("/auth/google/callback", async (request, reply) => {
        let q = request.query
        if (q.error)
            console.log('error: ' + q.error)
        // else if (q.state !== request.session.state){
        //     console.log('State mismatch. Possivle CSRF attack')
        //     res.end('State mismatch. Possivle CSRF attack')
        // }
        else {
            let { tokens } = await oauth2Client.getToken(q.code)
            oauth2Client.setCredentials(tokens)
            try {
                const ticket = await oauth2Client.verifyIdToken({
                    idToken:tokens.id_token,
                    audience: process.env.CLIENT_ID
                })
                const payload = ticket.getPayload()
                userCredential = {
                    email:payload.email,
                    first_name:payload.given_name,
                    last_name:payload.family_name
                }
                console.log("CREDENTAILS DU USER QUI S'EST LOG")
                console.log(userCredential)                
            }
            catch(e)
            {
                console.log('error', e)
            }
        }
    })
}

module.exports = authGoogleRoutes

