import {OAuth2Client} from 'google-auth-library'
import crypto from 'crypto'
import { creatUserRawData, findUser } from '../auth_queries.js'
import { issueSession } from '../auth_controller.js'

    const OAUTH_STATE_COOKIE_OPTIONS = {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 10 * 60 * 1000
    }

    const oauth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL)

    const scopes = [
        'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
    ];

    async function generateGoogleUrl(request, reply){
        const state = crypto.randomBytes(32).toString('hex'); 

        const authUrl = oauth2Client.generateAuthUrl({
            scope: scopes,
            state: state
        })
        return reply
        .setCookie('oauth_state', state, OAUTH_STATE_COOKIE_OPTIONS)
        .redirect (authUrl)        
    }

    async function ExtractUserCredentials(query){     
        let { tokens } = await oauth2Client.getToken(query.code)
        oauth2Client.setCredentials(tokens)
        try {
            const ticket = await oauth2Client.verifyIdToken({
                idToken:tokens.id_token,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const userCredential = {
                googleId:payload.sub,
                email:payload.email,
                first_name:payload.given_name,
                last_name:payload.family_name
            }
            return userCredential              
        }
        catch(e)
        {
            console.log('error', e)
        }        
    }

    async function GetGoogleUserCredentials(request, reply){
        let q = request.query
        if (q.error){
            console.log('error: ' + q.error)
            return reply.code(401).send({error:'google_auth_error'})
        }
        else if (q.state !== request.cookies.oauth_state){
            console.log('State mismatch. Possivle CSRF attack')
            return reply.code(401).send({error:'State mismatch. Possivle CSRF attack'})
        }   
        reply.clearCookie('oauth_state', { path: '/' }) 
        const userCredential = await ExtractUserCredentials(q)
        if (!userCredential)
            return reply.code(401).send({error:'invalid_google credentials'})
        let user = await findUser(userCredential.email)
        if(!user)
        {
            user = await creatUserRawData({
                first_name:userCredential.first_name,
                last_name:userCredential.last_name,
                email:userCredential.email,
                google_id:userCredential.googleId
            })
        }
        return issueSession(user, reply)
    }   

export { generateGoogleUrl, GetGoogleUserCredentials }

