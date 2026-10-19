import { GetRefreshToken} from './tokens_controller.js'

async function tokensRoutes (fastify){
    fastify.post('/token/refresh', {
        config : {
            rateLimit: {
            max: 5,
            timeWindow: '1 minute'
            }
        }

    }, GetRefreshToken)
}

export { tokensRoutes }