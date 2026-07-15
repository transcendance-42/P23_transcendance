const http = require("http")
const buildApp = require('./app')
 
const app = buildApp()
 
app.listen({ port: 3000, host: '0.0.0.0' })
