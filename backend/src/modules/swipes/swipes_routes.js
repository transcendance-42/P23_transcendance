import { createSwipeSchema } from './swipes_schema.js'
import { postSwipe } from './swipes_controller.js'
import { checkSwipeAcces } from '../../plugins/checkSwipeAcces.js'

async function swipesRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.post('/swipes', {
        schema : createSwipeSchema,
        config: {
            rateLimit: {
            max: 50,
            timeWindow: '1 minute'
        }
    }
    , preHandler: checkSwipeAcces}, postSwipe)
}

export { swipesRoutes }