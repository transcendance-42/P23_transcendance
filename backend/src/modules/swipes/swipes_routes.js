import { createSwipeSchema } from './swipes_schema.js'
import { postSwipe } from './swipes_controller.js'

async function swipesRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize)
    fastify.post('/swipes', {
        schema : createSwipeSchema,
        config: {
            rateLimit: {
            max: 50,
            timeWindow: '1 minute'
        }
    }
    }, postSwipe)
}

export { swipesRoutes }