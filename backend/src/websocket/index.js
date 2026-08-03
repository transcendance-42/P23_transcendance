const { Server } = require("socket.io")

function attachwebsocket(app){

  const io = new Server(app.server, {cors: {origin: 'http://localhost:5173', methods: ['GET', 'POST']}})

    io.on("connection", (socket) => {
      console.log(`User connected ${socket.id}`)
      socket.on('joinRoom', (rooName) =>{
        socket.join(roomName);
        console.log(`${socket.id} joined room: ${roomName}`)

        io.to(rooName).emit('send_message', `User ${socket.id} connected to the ${roomName} room`)
      })
      socket.on('disconnect', () => {
        console.log(`A user disconnect: ${socket.id}`)
      })
      socket.on('send_message', (message) =>{
        console.log(message)
        io.emit('receive_message', {...message})
      })
})

return io;
    
}

module.exports = attachwebsocket
