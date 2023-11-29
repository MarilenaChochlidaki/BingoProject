import express from "express";
import cors from "cors";

const app = express();

import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.3:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];
let winnerName = "";
let currentNumber = 0;

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("send_login_name", (data) => {
    users.push(data.loginUser);

    socket.broadcast.emit("receiveUsers", users);
  });

  // Handle clearing of names
  socket.on("clearNames", () => {
    users = [];
    io.emit("namesCleared");
  });

  socket.on("send_winner_name", (data) => {
    winnerName = data.winnerName;
    socket.broadcast.emit("receive_winner_name", winnerName);
  });

  socket.on("sendNumber", (number) => {
    // Update the currentNumber and broadcast it to all clients
    console.log("number received in backend" + currentNumber);
    currentNumber = number;
    io.emit("receiveNumber", currentNumber);

    // Reset the number to 0 after 5 seconds
    setTimeout(() => {
      currentNumber = 0;
      console.log("reset number");
      io.emit("receiveNumber", currentNumber);
    }, 3000);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
