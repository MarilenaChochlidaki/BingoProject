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

  const logIn = () => {
    socket.emit("send_login_name", { loginUser: user });
    loginUserButtonClick(user);
  };

  const handleColorClick = (selectedColor) => {
    setUser({ ...user, color: selectedColor });
  };

  return (
    <div className={styles.logIn}>
      <div className={styles.box}>
        <input
          className={styles.txt}
          placeholder="Tap to say your Name"
          onChange={(event) => {
            setUser({ ...user, name: event.target.value });
          }}
        ></input>

        <button className={styles.ready} onClick={logIn}>
          Ready
        </button>
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
