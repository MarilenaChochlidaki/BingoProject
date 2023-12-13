import React from "react";
import io from "socket.io-client";
import styles from "./LogoutButton.module.css";
const socket = io.connect("http://192.168.1.3:3001");

function LogoutButton({ isMobile, userName }) {
  const handleButtonClick = () => {
    // Add your logic here for handling button click when active

    socket.emit("send_logout_name", { logoutName: userName });
  };
  return (
    <button
      onClick={handleButtonClick}
      className={`${isMobile ? styles.buttonMobile : styles.buttonTable}`}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
