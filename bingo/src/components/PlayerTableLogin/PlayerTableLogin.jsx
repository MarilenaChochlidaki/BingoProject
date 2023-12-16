import React, { useEffect, useState } from "react";
import { ColorsBar } from "../ColorsBar/ColorsBar";
import io from "socket.io-client";
import styles from "./PlayerTableLogin.module.css";

<<<<<<< HEAD
const socket = io.connect("http://192.168.1.13:3001");
=======
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);
>>>>>>> b84a6d7dca4f9c91ad46d76b7dff27ec1440c144

export const PlayerTableLogin = ({
  loginUserButtonClick,
  disabledButtonColors,
}) => {
  const [user, setUser] = useState({ name: "", color: "" });
  const [isReady, setIsReady] = useState(false);

  const logIn = () => {
    if (!user.name || !user.color) {
      return;
    }
    setIsReady(true);
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
