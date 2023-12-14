import React from "react";
import io from "socket.io-client";
import styles from "./LogoutButton.module.css";
const socket = io.connect("http://147.52.221.194:3001");

function LogoutButton({ isMobile, userName }) {
  const handleButtonClick = () => {
    // Add your logic here for handling button click when active

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
