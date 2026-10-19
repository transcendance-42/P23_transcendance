import { loginSchema, registerSchema, configRateLimit10, configRateLimit5, configRateLimit3 } from './auth_schema.js'
import { login, register, logout } from './auth_controller.js'
import { generateGoogleUrl, GetGoogleUserCredentials } from './providers/google.provider.js'
import { postHearthBeat } from './auth_controller.js'

async function authRoutes(fastify) {
  fastify.post("/auth/login", {schema :loginSchema, config : configRateLimit5 }, login)
  fastify.post("/auth/register", {schema : registerSchema, config: configRateLimit3 }, register)
  fastify.post("/auth/logout", logout)
  fastify.get("/auth/google",{ config:configRateLimit10} , generateGoogleUrl)
  fastify.get("/auth/google/callback",{config : configRateLimit5} , GetGoogleUserCredentials)
  fastify.post("/hearthbeat", {onRequest: fastify.authorize}, postHearthBeat) 
}

export { authRoutes }