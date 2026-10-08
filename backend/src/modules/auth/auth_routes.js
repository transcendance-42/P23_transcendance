import { loginSchema, registerSchema } from './auth_schema.js'
import { login, register, logout } from './auth_controller.js'
import { generateGoogleUrl, GetGoogleUserCredentials } from './providers/google.provider.js'

async function authRoutes(fastify) {
  fastify.post("/auth/login", {
    schema :{loginSchema, security:[]},
    config : {
        rateLimit: {
        max: 5,
        timeWindow: '1 minute'
      }
    }
  }, login)
  fastify.post("/auth/register", {
    schema : registerSchema,
    config: {
        rateLimit: {
        max: 3,
        timeWindow: '1 minute'
      }
    }
  }, register)
  fastify.post("/auth/logout", logout)
  fastify.get("/auth/google",{
    config:{
        rateLimit: {
        max: 10,
        timeWindow: '1 minute'
    }
    }
  } , generateGoogleUrl)
  fastify.get("/auth/google/callback",{
    config : {
      rateLimit: {
      max: 5,
      timeWindow: '1 minute'
    }
    }
  } , GetGoogleUserCredentials)     
}

export { authRoutes }