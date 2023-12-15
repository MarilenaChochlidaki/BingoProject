import React from "react";
import styles from "./MobileWaiting.module.css";
import { CircleLoader } from "../../../components/CircleLoader/CircleLoader";

export const MobileWaiting = () => {
  return (
    <div className={styles.mobileWaitingContainer}>
      <div className={styles.logo}></div>

      <div className={styles.joinGameContainer}>
        <h1>Joining Game</h1>
        <p>Wait until all the players are ready</p>
        <CircleLoader />
      </div>
    </div>
  );
};
