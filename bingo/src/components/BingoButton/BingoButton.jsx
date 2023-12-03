import React from "react";
import io from "socket.io-client";
import styles from "./BingoButton.module.css";
const socket = io.connect("http://192.168.1.3:3001");

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