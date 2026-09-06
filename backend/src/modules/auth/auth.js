const prisma = require('../utils/prisma')
const { loginschema } = require('./auth_schema')
const { login } = require('./auth_controller')

async function authRoutes(fastify) {
    fastify.post("/auth/login", loginschema, login)
  }

module.exports = authRoutes