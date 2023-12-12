import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./AmlTV.module.css";
import { RulesOverlayTV } from "../../components/RulesOverlayTV/RulesOverlayTV";
import { BallDisplay } from "../../components/BallDisplay/BallDisplay";
import QrCodeGenerator from "../../components/QrCodeGenerator/QrCodeGenerator";
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
    <div className={styles.back}>
      {winnerUser && winnerUser.length > 1
        ? winnerUser + " is the winner!"
        : ""}
      <video autoplay playsinline muted loop controls className={styles.video}>
        <source src="../assets/videos/videoBg.mp4" type="video/mp4" />
      </video>
      <BallDisplay number={numberActive} ballDimension={100} numberSize={25} />
      <RulesOverlayTV trigger={showRules} />
      <QrCodeGenerator />
    </div>
  );
};
