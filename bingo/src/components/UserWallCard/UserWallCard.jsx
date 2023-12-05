import React from "react";
import styles from "./UserWallCard.module.css";

export const UserWallCard = ({ user }) => {
  return (
    <div>
      <p>{user.name}</p>
      <p>Wins: {user.wins}</p>
      <div
        className={styles.circle}
        style={{ backgroundColor: user.color }}
      ></div>
    </div>
  );
};
