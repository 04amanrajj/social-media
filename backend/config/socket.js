// socket.js
let io;

function initSocket(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("testing socket connection");
    console.log("a user connected:", socket.id);
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("send_message", (data) => {
      const { roomId, message, senderId } = data;
      console.log(data)
      io.to(roomId).emit("receive_message", {
        message,
        sender: senderId,
        timestamp: new Date(),
      });
      socket.send("hello from server");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

module.exports = { initSocket, getIO };
