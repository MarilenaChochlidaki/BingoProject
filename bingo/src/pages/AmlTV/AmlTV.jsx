import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./AmlTV.module.css";
import { RulesOverlayTV } from "../../components/RulesOverlayTV/RulesOverlayTV";
import { BallDisplay } from "../../components/BallDisplay/BallDisplay";
<<<<<<< HEAD
const socket = io.connect("http://192.168.1.13:3001");
=======
import QrCodeGenerator from "../../components/QrCodeGenerator/QrCodeGenerator";
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);
>>>>>>> b84a6d7dca4f9c91ad46d76b7dff27ec1440c144

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
      <div className={styles.logo}> </div>
      {winnerUser && winnerUser.length > 1
        ? winnerUser + " is the winner!"
        : ""}
      <BallDisplay number={numberActive} ballDimension={100} numberSize={25} />
      <RulesOverlayTV trigger={showRules} />
      <div className={styles.qr}>
        <QrCodeGenerator />
      </div>
    </div>
  );
};
