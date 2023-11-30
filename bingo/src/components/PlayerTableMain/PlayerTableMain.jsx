import React, { useState, useEffect } from "react";
import styles from "./PlayerTableMain.module.css";
import io from "socket.io-client";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import BingoButton from "../BingoButton/BingoButton";

const socket = io.connect("http://192.168.1.3:3001");

export const PlayerTableMain = ({
  loginName = { name: "" },
  rotation = 0,
  cardNumberActive = 0,
}) => {
  const [bingoActive, setBingoActive] = useState(false);
  const [winnerUser, setWinnerUser] = useState("");

  useEffect(() => {
    socket.on("receive_winner_name", (data) => {
      console.log(data);
      setWinnerUser(data);
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

  return (
    <div>
      <PlayerCard
        rotation={rotation}
        cardNumberActive={cardNumberActive}
        bingoActivate={handleBingoButton}
      />
      <BingoButton isActive={bingoActive} userName={loginName.name} />
    </div>
  );
};
