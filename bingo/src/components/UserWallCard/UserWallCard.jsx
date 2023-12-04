import React from "react";
import styles from "./UserWallCard.module.css";

export const UserWallCard = ({ user }) => {
  return (
    <div className={styles.playerContainer}>
      <p className={styles.playerName}>{user.name}</p>
      <div className={styles.circleContainer}>
        <div className={styles.circle} style={{ backgroundColor: user.color }}>
          <p className={styles.wins}>{user.wins}</p>
        </div>
      </div>
    </div>
  );
};
