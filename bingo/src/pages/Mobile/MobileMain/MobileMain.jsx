import React, { useEffect, useState } from "react";
import { PlayerCard } from "../../../components/PlayerCard/PlayerCard";
import io from "socket.io-client";
import styles from "./MobileMain.module.css";
import BingoButton from "../../../components/BingoButton/BingoButton";
const socket = io.connect("http://192.168.1.3:3001");

function MobileMain({ loginUser }) {
  const [numberActive, setNumberActive] = useState(0);
  const [bingoActive, setBingoActive] = useState(false);
  const [winnerUser, setWinnerUser] = useState("");

  useEffect(() => {
    // Listen for the "namesCleared" event
    socket.on("receiveNumber", (data) => {
      setNumberActive(data); // Clear names on the client side
    });
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

  return (
    <div>
      {loginUser && loginUser.name + "---------"}
      {numberActive}
      <PlayerCard
        cardNumberActive={numberActive}
        bingoActivate={handleBingoButton}
      ></PlayerCard>
      <BingoButton isActive={bingoActive} userName={loginUser.name} />
      {winnerUser && winnerUser.length > 1
        ? winnerUser + " is the winner!"
        : ""}
      {loginUser.color}
    </div>
  );
}

export default MobileMain;
