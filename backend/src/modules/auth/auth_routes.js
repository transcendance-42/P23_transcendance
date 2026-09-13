import { loginSchema, registerSchema } from './auth_schema.js'
import { login, register } from './auth_controller.js'

async function authRoutes(fastify) {
    fastify.post("/auth/login", {schema :loginSchema, security:[]}, login)
    fastify.post("/auth/register", {schema : registerSchema}, register)
  }

export { authRoutes }