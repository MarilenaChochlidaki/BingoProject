import React from "react";
import io from "socket.io-client";
import styles from "./BingoButton.module.css";
<<<<<<< HEAD
const socket = io.connect("http://192.168.1.13:3001");
=======
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);
>>>>>>> b84a6d7dca4f9c91ad46d76b7dff27ec1440c144

function BingoButton({ isActive, userName }) {
  const handleButtonClick = () => {
    // Add your logic here for handling button click when active

    socket.emit("send_winner_name", { winnerName: userName });
  };
  return (
    <button
      onClick={handleButtonClick}
      className={`${styles.buttonContainer} ${
        isActive ? "" : styles.inactiveButton
      }`}
      disabled={!isActive}
    >
      BINGO
    </button>
  );
}

export default BingoButton;
