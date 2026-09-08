import { Server } from 'socket.io'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma.js'

// not test yet
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

    const io = new Server(app.server, {
        cors: {
            origin: [
                'http://localhost:5173',
                'http://127.0.0.1:5173'
            ],
            methods: ['GET', 'POST']
        }
    })
    io.on("connection", (socket) => {
      console.log(`User connected ${socket.id}`)
      socket.on('join_room', (roomName) =>{
        socket.join(roomName.toString());
          console.log(`${socket.id} joined room ${roomName}`)
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
            io.to(r_message.match_id.toString()).emit('receive_message', r_message)
        }
        catch (error)
        {
          console.error(error);
        }
      })
})

return io;
    
}

export {attachwebsocket, authenticateSocket}
