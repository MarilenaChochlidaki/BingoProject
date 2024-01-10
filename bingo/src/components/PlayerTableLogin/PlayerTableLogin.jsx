import React, { useEffect, useState } from "react";
import { ColorsBar } from "../ColorsBar/ColorsBar";
import io from "socket.io-client";
import styles from "./PlayerTableLogin.module.css";
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);

export const PlayerTableLogin = ({
  userIndex,
  loginUserButtonClick,
  disabledButtonColors,
  playerInputting,
  indexInputting,
}) => {
  const [user, setUser] = useState({ name: "", color: "" });
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [isWaitingForName, setWaitingForName] = useState(false);

  useEffect(() => {
    socket.on("receiveVoiceOutputName", (receiveUserIndex, transcript) => {
      console.log(transcript);
      if (userIndex + 1 === receiveUserIndex) {
        playerInputting(0);
        setIsNameEntered(true);
        setWaitingForName(false);
        setUser({ ...user, name: transcript });
      }
    });
  }, []);

  useEffect(() => {
    // Check if both name and color are set
    loginUserButtonClick(user);
  }, [user]);

  const handleColorClick = (selectedColor) => {
    setUser({ ...user, color: selectedColor });
  };

  useEffect(() => {
    console.log(userIndex);
    console.log(indexInputting);
    setWaitingForName(indexInputting > 0 && indexInputting != userIndex + 1);
  }, [indexInputting]);

  const handleVoiceInput = () => {
    playerInputting(userIndex + 1);

    socket.emit("sendVoiceInputName", userIndex + 1);
  };

  return (
    <div className={styles.logIn}>
      <button
        className={`${styles.box} ${
          isWaitingForName ? styles.boxWaitingForName : ""
        } `}
        onClick={handleVoiceInput}
        disabled={isWaitingForName}
      >
        {!isNameEntered ? (
          <div className={styles.txt}>Tap to Say Your Name</div>
        ) : (
          <div className={styles.txt}>{user.name}</div>
        )}
      </button>

      <div className={styles.colorBar}>
        <ColorsBar
          onColorClick={handleColorClick}
          disabledColors={disabledButtonColors}
        />
      </div>
    </div>
  );
};
