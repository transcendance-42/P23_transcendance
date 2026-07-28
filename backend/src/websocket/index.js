const { Server } = require("socket.io")

function attachwebsocket(app){

  const io = new Server(app.server, {cors: {origin: 'http://localhost:5173', methods: ['GET', 'POST']}})

    io.on("connection", (socket) => {
      console.log('Use connected')
      socket.on('send_message', (message) =>{
        console.log(message)
        io.emit('receive_message', {...message})
      })
      socket.on('disconnect', () => {
        console.log('User disconnected');
      })
})

return io;
    
}

module.exports = attachwebsocket
