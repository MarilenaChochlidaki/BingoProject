import React from "react";
import io from "socket.io-client";
import styles from "./BingoButton.module.css";
import useSound from "use-sound";
import winnerSound from "../../assets/sounds/winner.mp3";
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);

function BingoButton({ isActive, userName, isMobile }) {
  const [playWinnerSound] = useSound(winnerSound);
  const handleButtonClick = () => {
    // Add your logic here for handling button click when active
    playWinnerSound();
    socket.emit("send_winner_name", { winnerName: userName });
  };
  return (
    <button
      onClick={handleButtonClick}
      className={`${styles.buttonContainer} ${
        isActive ? "" : styles.inactiveButton
      }
      ${isMobile ? styles.mobileBingoContainer : ""}`}
      disabled={!isActive}
    >
      BINGO
    </button>
  );
}

export default BingoButton;
