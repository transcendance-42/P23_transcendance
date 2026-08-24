const { Server } = require("socket.io")
require('dotenv').config();
const jwt = require('jsonwebtoken')
const prisma = require('../utils/prisma')


function authenticateSocket(socket, next){
  const token = socket.handshake.auth.token;
  try{
    socket.user = jwt.verify(token, process.env.JWT_SECRET)
    next();
  } catch (err){
    next(new Error("Authentication error: invalid token"));
  }
}

async function createMessage({match_id, sender_id, content}){
      return await prisma.messages.create({
        data: {
            match_id: BigInt(match_id),
            sender_id: BigInt(sender_id),
            content
          },
        include: {
          users:true
        }
        })
}

function attachwebsocket(app){

  const io = new Server(app.server, {cors: {origin: 'http://localhost:5173', methods: ['GET', 'POST']}})

    io.on("connection", (socket) => {
      console.log(`User connected ${socket.id}`)
      socket.on('join_room', (roomName) =>{
        socket.join(roomName);
        console.log(`${socket.id} joined room: ${roomName}`)

        io.to(roomName).emit('send_message', `User ${socket.id} connected to the ${roomName} room`)
      })
      socket.on('leave_room', (roomName) =>{
        socket.leave(roomName);
        console.log(`${socket.id} leave room: ${roomName}`)

        io.to(roomName).emit('send_message', `User ${socket.id} leave the ${roomName} room`)
      })      
      socket.on('disconnect', () => {
        console.log(`A user disconnect: ${socket.id}`)
      })
      socket.on('send_message', async (message) =>{
        try{
            const r_message = await createMessage(message);
            console.log(r_message)
            io.emit('receive_message', r_message)
        }
        catch (error)
        {
          console.error(error);
        }
      })
})

return io;
    
}

module.exports = {attachwebsocket, authenticateSocket}
