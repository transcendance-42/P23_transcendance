const { loginSchema } = require('./auth_schema')
const login = require('./auth_controller')

async function authRoutes(fastify) {
    fastify.post("/auth/login", loginSchema, login)
  }

module.exports = authRoutes