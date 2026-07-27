const { Server } = require("socket.io")

function attachwebsocket(app){

  const io = new Server(app.server, {cors: {
                                      origin: 'http://localhost:5173', methods: ['GET', 'POST']}})

    io.on("connection", (socket) => {
      socket.on('send_message', (message) =>{
        console.log(message)
        socket.emit("message", "Ueeee Uee message bien recu mgl")
      } )
  console.log("somebody connected")
})

app.addHook("preClose", (done) => {
  // close all active connections on this server
  io.local.disconnectSockets(true);
  done();
})

return io;
    
}

module.exports = attachwebsocket
