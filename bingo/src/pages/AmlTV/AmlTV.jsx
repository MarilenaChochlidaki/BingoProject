import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./AmlTV.module.css";
import { RulesOverlayTV } from "../../components/RulesOverlayTV/RulesOverlayTV";
import { BallDisplay } from "../../components/BallDisplay/BallDisplay";
const socket = io.connect("http://192.168.1.3:3001");

export const AmlTV = () => {
  const [winnerUser, setWinnerUser] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [numberActive, setNumberActive] = useState(0);

  useEffect(() => {
    socket.on("receive_winner_name", (data) => {
      setWinnerUser(data);
    });

    socket.on("receive_resetCards", () => {
      setWinnerUser("");
    });

    socket.on("receive_showRules", (data) => {
      setShowRules(data);
    });

    socket.on("receiveNumber", (data) => {
      setNumberActive(data); // Clear names on the client side
    });
  }, []);

  return (
    <div>
      <h1 className={styles.homeTitle}>Table</h1>
      {winnerUser && winnerUser.length > 1
        ? winnerUser + " is the winner!"
        : ""}
      <BallDisplay number={numberActive} ballDimension={100} numberSize={25} />
      <RulesOverlayTV trigger={showRules} />
    </div>
  );
};
