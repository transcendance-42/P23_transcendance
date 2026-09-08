import { createSwipeSchema } from './swipes_schema.js'
import { postSwipe } from './swipes_controller.js'

async function swipesRoutes(fastify) {
    fastify.post('/swipes', {schema : createSwipeSchema}, postSwipe)
}

export { swipesRoutes }