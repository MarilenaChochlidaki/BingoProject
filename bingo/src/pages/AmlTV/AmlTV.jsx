import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./AmlTV.module.css";
import { RulesOverlayTV } from "../../components/RulesOverlayTV/RulesOverlayTV";
import { BallDisplay } from "../../components/BallDisplay/BallDisplay";
import QrCodeGenerator from "../../components/QrCodeGenerator/QrCodeGenerator";
import { SOCKET_URL } from "../../config";
import wheelVideo from "../../assets/videos/wheel_2.mp4";
const socket = io.connect(SOCKET_URL);

export const AmlTV = () => {
  const [winnerUser, setWinnerUser] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [numberActive, setNumberActive] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

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

    socket.on("receive_gameStarted", (data) => {
      setGameRunning(data);
    });
  }, []);

  return (
    <div className={styles.back}>
      <div className={styles.logo}> </div>
      <div className={styles.winnerLabel}>
        {winnerUser && winnerUser.length > 1
          ? winnerUser + " is the winner!"
          : ""}
      </div>

      <RulesOverlayTV trigger={showRules} />
      <div className={styles.qr}>
        <QrCodeGenerator isInactive={gameRunning} />
      </div>
      <div className={styles.midContainer}>
        <div
          className={`${styles.videoContainer} ${
            gameRunning ? "" : styles.inactiveVideo
          }`}
        >
          <video
            src={wheelVideo}
            width="100%"
            controls
            autoPlay
            loop
            muted
            className={styles.video}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          style={gameRunning ? {} : { display: "none" }}
          className={styles.ballDealtContainer}
        >
          <div className={styles.blackBackground}>
            <BallDisplay
              number={numberActive}
              ballDimension={200}
              numberSize={70}
              isDrawn={numberActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
