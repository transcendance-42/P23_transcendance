import { loginSchema, registerSchema } from './auth_schema.js'
import { login, register } from './auth_controller.js'
import { generateGoogleUrl, GetGoogleUserCredentials } from './providers/google.provider.js'

async function authRoutes(fastify) {
    fastify.post("/auth/login", {schema :loginSchema}, login)
    fastify.post("/auth/register", {schema : registerSchema}, register)
    fastify.get("/auth/google", generateGoogleUrl)
    fastify.get("/auth/google/callback", GetGoogleUserCredentials)     
  }

export { authRoutes }