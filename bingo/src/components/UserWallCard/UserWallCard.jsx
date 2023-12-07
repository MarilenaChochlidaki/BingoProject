// import React from "react";
// import styles from "./UserWallCard.module.css";

import React from "react";
import styles from "./UserWallCard.module.css";

export const UserWallCard = ({ user }) => {
  return (
    <div>
      <p className={styles.name}>{user.name}</p>
      <p className={styles.bingos}>{user.wins}</p>
      <div
        className={styles.line}
        style={{ backgroundColor: user.color }}
      ></div>
      <div
        className={styles.circle}
        style={{ backgroundColor: user.color }}
      ></div>
    </div>
  );
};
