const createSwipeSchema = require('./swipes_schema')
const postSwipe = require('./swipes_controller')

async function swipesRoutes(fastify) {
    fastify.post('/swipes', createSwipeSchema, postSwipe)
}

module.exports = swipesRoutes