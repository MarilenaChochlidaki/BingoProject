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
  socket.on("send_login_name", (data) => {
    const newUser = {
      name: data.loginUser.name,
      wins: 0, // Initialize wins to 0
      color: data.loginUser.color,
    };

    users.push(newUser);

    socket.broadcast.emit("receiveUsers", users);
  });

  // Handle clearing of names
  socket.on("clearNames", () => {
    users = [];
    io.emit("namesCleared");
  });

  socket.on("resetCards", () => {
    io.emit("receive_resetCards");
  });

  socket.on("send_logout_name", (data) => {
    const logoutName = data.logoutName;
    users = users.filter((user) => user.name !== logoutName);
    io.emit("userLoggedOut", logoutName);
  });

  socket.on("send_winner_name", (data) => {
    winnerName = data.winnerName;

    // Find the winner in the users array and update their wins
    const updatedUsers = users.map((user) =>
      user.name === winnerName ? { ...user, wins: user.wins + 1 } : user
    );

    io.emit("receiveUsers", updatedUsers); // Update all clients with the new user list
    socket.broadcast.emit("receive_winner_name", winnerName);
  });

  socket.on("send_clearBalls", () => {
    io.emit("receive_clearBalls");
  });

  socket.on("send_showRules", (data) => {
    io.emit("receive_showRules", data);
  });

  socket.on("sendNumber", (number) => {
    // Update the currentNumber and broadcast it to all clients
    currentNumber = number;
    io.emit("receiveNumber", currentNumber);

    // Reset the number to 0 after 5 seconds
    setTimeout(() => {
      currentNumber = 0;
      io.emit("receiveNumber", currentNumber);
    }, 30000);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
