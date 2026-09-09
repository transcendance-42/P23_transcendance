import { loginSchema } from './auth_schema.js'
import { login } from './auth_controller.js'

async function authRoutes(fastify) {
    fastify.post("/auth/login", {schema :loginSchema}, login)
  }

export { authRoutes }