import React, { useState, useEffect } from "react";
import styles from "./PlayerTableMain.module.css";
import io from "socket.io-client";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import BingoButton from "../BingoButton/BingoButton";
import LogoutButton from "../LogoutButton/LogoutButton";

<<<<<<< HEAD
const socket = io.connect("http://192.168.1.13:3001");
=======
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);
>>>>>>> b84a6d7dca4f9c91ad46d76b7dff27ec1440c144

export const PlayerTableMain = ({
  loginUser = { name: "", color: "" },
  cardNumberActive = 0,
}) => {
  const [bingoActive, setBingoActive] = useState(false);
  const [winnerUser, setWinnerUser] = useState("");

  useEffect(() => {
    socket.on("receive_winner_name", (data) => {
      setWinnerUser(data);
    });

    socket.on("receive_resetCards", () => {
      setWinnerUser("");
    });
  }, []);

  useEffect(() => {
    if (winnerUser.length > 1) {
      setBingoActive(false);
    }
  }, [winnerUser]);

  const handleBingoButton = () => {
    setBingoActive(true);
  };

  const handleLogout = () => {};

  return (
    <div className={styles.playerTableContainer}>
      <div className={styles.logoutContainer}>
        <LogoutButton isMobile={false} userName={loginUser.name} />
      </div>
      <div className={styles.loginUserName}>{loginUser.name}</div>

      <PlayerCard
        cardNumberActive={cardNumberActive}
        bingoActivate={handleBingoButton}
        color={loginUser.color}
      />

      <BingoButton isActive={bingoActive} userName={loginUser.name} />
    </div>
  );
};
