import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./AmlTV.module.css";
const socket = io.connect("http://192.168.1.3:3001");

export const AmlTV = () => {
  const [winnerUser, setWinnerUser] = useState("");

  useEffect(() => {
    socket.on("receive_winner_name", (data) => {
      console.log(data);
      setWinnerUser(data);
    });
  }, []);

  return (
    <div>
      <h1 className={styles.homeTitle}>About asdasdasdasdasdasd</h1>
      <p className={styles.slogan}>This is the about page.</p>
      {winnerUser && winnerUser.length > 1
        ? winnerUser + " is the winner!"
        : ""}
    </div>
  );
};
