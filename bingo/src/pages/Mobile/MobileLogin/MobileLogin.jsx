import React, { useState } from "react";
import io from "socket.io-client";
import { RulesOverlayMobile } from "../../../components/RulesOverlayMobile/RulesOverlayMobile";
import { ColorsBar } from "../../../components/ColorsBar/ColorsBar";
import styles from "./MobileLogin.module.css";

<<<<<<< HEAD
const socket = io.connect("http://192.168.1.13:3001");
=======
import { SOCKET_URL } from "../../../config";
const socket = io.connect(SOCKET_URL);
>>>>>>> b84a6d7dca4f9c91ad46d76b7dff27ec1440c144

export const MobileLogin = ({ loginUserButtonClick }) => {
  const [user, setUser] = useState({ name: "", color: "" });
  const [showRules, setShowRules] = useState(false);

  const logIn = () => {
    socket.emit("send_login_name", { loginUser: user });
    loginUserButtonClick(user);
  };

  const handleColorClick = (selectedColor) => {
    setUser({ ...user, color: selectedColor });
  };

  const activateShowRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className={styles.logIn}>
      <div className={styles.logo}></div>
      {/* <video width="320" height="240" controls autoplay muted>
        <source
          src="C:\Users\maril\OneDrive\Υπολογιστής\csd\7o\hy469\Project\bingo\BingoProject\bingo\public\videos\videoBg.mp4"
          type="video/mp4"
        ></source>
      </video> */}
      <h1 className={styles.h}>Create your Profile</h1>
      <div className={styles.nameContainer}>
        <input
          className={styles.input}
          placeholder="Enter your name"
          onChange={(event) => {
            setUser({ ...user, name: event.target.value });
          }}
        ></input>
      </div>

      <div className={styles.colorContainer}>
        <p className={styles.txt}>Choose theme color</p>
        <ColorsBar onColorClick={handleColorClick} />
      </div>

      <div className={styles.readyButtonContainer}>
        <button className={styles.readyButton} onClick={logIn}>
          Ready
        </button>
      </div>

      <div className={styles.rulesButton}>
        <div className={styles.icon}></div>
        <button className={styles.rules} onClick={activateShowRules}>
          Learn how to play{" "}
        </button>
      </div>

      <RulesOverlayMobile trigger={showRules} setTrigger={setShowRules} />
    </div>
  );
};

export default MobileLogin;
