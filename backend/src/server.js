const buildApp = require('./app')
const {attachwebsocket, authenticateSocket} = require('./websocket/index')

const app = buildApp()
const io  = attachwebsocket(app)

// io.use(authenticateSocket)

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
console.log("le serveur va start")

start()
