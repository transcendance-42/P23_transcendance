const { Server } = require("socket.io")
const app = require("./../app")

const io = new Server(app.server, {/*options*/})

function attachwebsocket(app){

    io.on("connection", (socket) => {
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
