const {google} = require('googleapis')

async function authGoogleRoutes(fastify){
    fastify.get("/authgoogle", async (request, reply) => {

        const oauth2Client = new google.auth.OAuth2(
        `${CLIENT_ID}`,
        `${CLIENT_SECRET}`,
        `${REDIRECT_URL}`)

        const scopes = [
            'openid',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
        ];

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        })

        reply.redirect = url
    })

}

module.exports = authGoogleRoutes

