import React from "react";
import io from "socket.io-client";
import styles from "./BingoButton.module.css";
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);

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
