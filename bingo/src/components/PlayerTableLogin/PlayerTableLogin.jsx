import React, { useEffect, useState } from "react";
import { ColorsBar } from "../ColorsBar/ColorsBar";
import io from "socket.io-client";
import styles from "./PlayerTableLogin.module.css";
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);

export const PlayerTableLogin = ({
  loginUserButtonClick,
  disabledButtonColors,
}) => {
  const [user, setUser] = useState({ name: "", color: "" });

  useEffect(() => {
    // Check if both name and color are set
    loginUserButtonClick(user);
  }, [user]);

  const handleColorClick = (selectedColor) => {
    setUser({ ...user, color: selectedColor });
  };

  return (
    <div className={styles.logIn}>
      <div className={styles.box}>
        <textarea
          className={styles.txt}
          placeholder="Tap to say your&#10;Name"
          onChange={(event) => {
            setUser({ ...user, name: event.target.value });
          }}
        ></textarea>
      </div>

      <div className={styles.colorBar}>
        <ColorsBar
          onColorClick={handleColorClick}
          disabledColors={disabledButtonColors}
        />
      </div>
    </div>
  );
};
