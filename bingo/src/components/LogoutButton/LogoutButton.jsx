import React from "react";
import io from "socket.io-client";
import styles from "./LogoutButton.module.css";
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);

function LogoutButton({ isMobile, userName }) {
  const handleButtonClick = () => {
    socket.emit("send_logout_name", { logoutName: userName });
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${isMobile ? styles.buttonMobile : styles.buttonTable}`}
    ></button>
  );
}

export default LogoutButton;
