import React, { useState } from "react";
import styles from "./PlayerTableJoin.module.css";

export const PlayerTableJoin = ({ joinUserButtonClick }) => {
  const [userJoined, setUserJoined] = useState({ joined: false });

  const handlePlayerJoin = () => {
    setUserJoined((currentUserJoined) => {
      const newUserJoined = {
        ...currentUserJoined,
        joined: !currentUserJoined.joined,
      };
      joinUserButtonClick(newUserJoined); // Pass the new state
      return newUserJoined;
    });
  };

  return (
    <button
      className={`${styles.joinButton} ${
        userJoined.joined ? styles.joined : ""
      }`}
      onClick={handlePlayerJoin}
    ></button>
  );
};
