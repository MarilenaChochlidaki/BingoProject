import React, { useState, useEffect } from "react";
import styles from "./PlayerTableMain.module.css";
import io from "socket.io-client";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import BingoButton from "../BingoButton/BingoButton";
import LogoutButton from "../LogoutButton/LogoutButton";

import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);

export const PlayerTableMain = ({
  loginUser = { name: "", color: "" },
  rotation = 0,
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
    <div>
      <PlayerCard
        rotation={rotation}
        cardNumberActive={cardNumberActive}
        bingoActivate={handleBingoButton}
        color={loginUser.color}
      />
      <BingoButton isActive={bingoActive} userName={loginUser.name} />
      {loginUser.name}
      {loginUser.color}
      <LogoutButton isMobile={false} userName={loginUser.name} />
    </div>
  );
};
