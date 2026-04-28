const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("draw", (data) => {
    socket.to(data.room).emit("draw", data);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
