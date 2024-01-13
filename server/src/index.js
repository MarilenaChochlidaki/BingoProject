import express from "express";
import cors from "cors";

const app = express();

import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.2:3000",
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
    winnerName = "";
    socket.broadcast.emit("receive_winner_name", winnerName);
  });

  socket.on("send_logout_name", (data) => {
    const logoutName = data.logoutName;
    users = users.filter((user) => user.name !== logoutName);
    io.emit("userLoggedOut", logoutName);
  });

  socket.on("send_winner_name", (data) => {
    winnerName = data.winnerName;

    // Find the winner in the users array and update their wins
    const updatedUsers = users.map((user) => {
      if (user.name === winnerName) {
        const wins = typeof user.wins === "number" ? user.wins : 0;
        return { ...user, wins: wins + 1 };
      } else {
        return user;
      }
    });

    users = updatedUsers;
    io.emit("receiveUsers", updatedUsers);
    socket.broadcast.emit("receive_winner_name", winnerName);
  });

  socket.on("send_clearBalls", () => {
    io.emit("receive_clearBalls");
  });

  socket.on("send_showRules", (data) => {
    io.emit("receive_showRules", data);
  });

  socket.on("send_startedGame", (data) => {
    io.emit("receive_gameStarted", data);
  });

  socket.on("sendNextRound", () => {
    io.emit("triggerNextRound"); // Broadcasting to all clients
  });
  socket.on("sendNextStage", () => {
    io.emit("triggerNextStage"); // Broadcasting to all clients
  });
  socket.on("sendExitGame", () => {
    io.emit("triggerExitGame"); // Broadcasting to all clients
  });
  socket.on("sendStartGame", () => {
    io.emit("triggerStartGame"); // Broadcasting to all clients
  });
  socket.on("sendShowRules", () => {
    io.emit("triggerShowRules"); // Broadcasting to all clients
  });

  socket.on("sendVoiceInputName", (user_index) => {
    io.emit("receiveVoiceInputName", user_index); // Broadcasting to all clients
  });

  socket.on("sendVoiceOutputName", (user_index, transcript) => {
    io.emit("receiveVoiceOutputName", user_index, transcript); // Broadcasting to all clients
  });

  socket.on("sendGestureEvent", (gesture) => {
    switch (gesture) {
      case "SWIPE_LEFT":
        io.emit("triggerNextRound");
        break;
      case "SWIPE_UP":
      case "SWIPE_DOWN":
        io.emit("triggerShowRules");
        break;
      case "SWIPE_RIGHT":
        io.emit("triggerExitGame");
        break;
      case "CIRCLE_CLOCKWISE":
      case "CIRCLE_COUNTERCLOCKWISE":
        io.emit("triggerSpinWheel");
        break;
      case "PINCH":
        break;
      default:
        break;
    }
  });

  socket.on("sendNumber", (number) => {
    // Update the currentNumber and broadcast it to all clients
    currentNumber = number;
    io.emit("receiveNumber", currentNumber);

    // Reset the number to 0 after 10 seconds
    setTimeout(() => {
      currentNumber = 0;
      io.emit("receiveNumber", currentNumber);
    }, 3000);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
