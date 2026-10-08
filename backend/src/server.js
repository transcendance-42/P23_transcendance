import buildApp from './app.js'
import {attachwebsocket, authenticateSocket} from './websocket/index.js'



const start = async () => {
  try {
      const app = await buildApp()
      const io  = attachwebsocket(app)
      io.use(authenticateSocket)    
      await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    console.error('Le serveur a subit une erreur durant le build: ', err)
    process.exit(1)  
  }
}
console.log("le serveur va start")

start()
