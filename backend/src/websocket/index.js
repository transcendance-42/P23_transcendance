import { Server } from 'socket.io'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma.js'
import { checkMatchAccessParamsSocket } from '../plugins/checkMatchAcces.js'
import { findUserById } from '../modules/users/users_queries.js'

async function authenticateSocket(socket, next){
  const token = socket.handshake.auth.token;
  try{
    socket.user = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserById(socket.user.id, socket.user.id)
    if (!user.is_active)
      throw new Error('User not found')
    console.log('userid socket authentifie:')
    console.log(socket.user.id)
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
            users: { 
              select: { first_name: true }
            }
          }
        })
}

function attachwebsocket(app){

    const io = new Server(app.server, {
        cors: {
            origin: [
                'https:localhost',
                'http://localhost:5173',
                'http://127.0.0.1:5173'
            ],
            methods: ['GET', 'POST']
        }
    })
    io.on("connection", (socket) => {
        console.log(`User connected ${socket.user.id}`)
        socket.on('join_room', async (roomName) =>{
          try{
            await checkMatchAccessParamsSocket(socket.user.id, roomName)
            socket.join(roomName.toString());
            console.log(`${socket.user.id} joined room ${roomName}`)
          }
          catch(e){
            socket.emit('socket_error', {
              error: e.code ||'FORBIDDEN',
              message: e.message
            })
            console.error(e);
          }
      })
      socket.on('leave_room', async (roomName) =>{
        try{
          await checkMatchAccessParamsSocket(socket.user.id, roomName)
          socket.leave(roomName);
          io.to(roomName).emit('send_message', `User ${socket.user.id} leave the ${roomName} room`)
          console.log(`${socket.user.id} leave room: ${roomName}`)
        }
        catch(e){
            socket.emit('socket_error', {
              error: e.code ||'FORBIDDEN',
              message: e.message
            })
            console.error(e);
        }
      })      
      socket.on('disconnect', () => {
        console.log(`A user disconnect: ${socket.user.id}`)
      })
      socket.on('send_message', async (message) =>{
        try{
            await checkMatchAccessParamsSocket(socket.user.id, message.match_id)
            const messageData = {match_id:message.match_id, sender_id:socket.user.id, content:message.content}
            const r_message = await createMessage(messageData);
            io.to(r_message.match_id.toString()).emit('receive_message', r_message)
        }
        catch (e)
        {
          socket.emit('socket_error', {
          error: e.code ||'FORBIDDEN',
          message: e.message
          })
          console.error(e);
        }
      })
})

return io;
    
}

export {attachwebsocket, authenticateSocket}
