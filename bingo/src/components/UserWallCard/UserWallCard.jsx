// import React from "react";
// import styles from "./UserWallCard.module.css";

import React from "react";
import styles from "./UserWallCard.module.css";

export const UserWallCard = ({ user }) => {
  return (
    <div className={styles.playerContainer}>
<<<<<<< HEAD
      <p className={styles.playerName}>{user.name}</p>
=======
      <p
        className={styles.playerName}
        style={{ borderBottom: `5px solid ${user.color}` }}
      >
        {user.name}
      </p>
>>>>>>> b84a6d7dca4f9c91ad46d76b7dff27ec1440c144
      <div className={styles.circleContainer}>
        <div className={styles.circle} style={{ backgroundColor: user.color }}>
          <p className={styles.wins}>{user.wins}</p>
        </div>
      </div>
    </div>
  );
};
