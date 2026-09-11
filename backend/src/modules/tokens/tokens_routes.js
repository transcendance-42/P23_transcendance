import prisma from '../../utils/prisma.js'
import { GetRefreshToken} from './tokens_controller.js'

async function tokensRoutes (fastify){
    fastify.post('/token/refresh', GetRefreshToken)
}

export { tokensRoutes }