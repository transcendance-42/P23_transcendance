import prisma from '../../utils/prisma.js'
import { GetRefreshToken} from './tokens_controller.js'

async function tokensRoutes (fastify){
    fastify.get('/token/refresh', GetRefreshToken)
}

export { tokensRoutes }