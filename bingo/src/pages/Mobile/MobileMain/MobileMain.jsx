import React, { useEffect, useState } from "react";
import { PlayerCard } from "../../../components/PlayerCard/PlayerCard";
import { RulesOverlayMobile } from "../../../components/RulesOverlayMobile/RulesOverlayMobile";
import io from "socket.io-client";
import styles from "./MobileMain.module.css";
import BingoButton from "../../../components/BingoButton/BingoButton";
import { SOCKET_URL } from "../../../config";
const socket = io.connect(SOCKET_URL);

function MobileMain({ loginUser }) {
  const [numberActive, setNumberActive] = useState(0);
  const [bingoActive, setBingoActive] = useState(false);
  const [winnerUser, setWinnerUser] = useState("");
  const [showRules, setShowRules] = useState(false);

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

  const activateShowRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div>
      <div className={styles.name}>{loginUser && loginUser.name}</div>
      {numberActive}
      <PlayerCard
        cardNumberActive={numberActive}
        bingoActivate={handleBingoButton}
        color={loginUser.color}
      ></PlayerCard>
      <BingoButton isActive={bingoActive} userName={loginUser.name} />
      {winnerUser && winnerUser.length > 1
        ? winnerUser + " is the winner!"
        : ""}
      {loginUser.color}
      <button className={styles.rules} onClick={activateShowRules}>
        Show Rules
      </button>
      <RulesOverlayMobile trigger={showRules} setTrigger={setShowRules} />
    </div>
  );
}

export default MobileMain;
