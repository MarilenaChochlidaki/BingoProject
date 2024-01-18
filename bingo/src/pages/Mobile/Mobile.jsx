import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MobileLogin from "./MobileLogin/MobileLogin";
import MobileMain from "./MobileMain/MobileMain";
import styles from "./Mobile.module.css";
import { MobileWaiting } from "./MobileWaiting/MobileWaiting";

import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);

export const Mobile = () => {
  const [user, setUser] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleNamesCleared = () => {
      setUser({}); // Clear user data
    };

    const handleGameStarted = (data) => {
      setGameStarted(data);
    };

    const handleUserLoggedOut = (logoutName) => {
      if (user.name === logoutName) {
        setUser({});
      }
    };

    socket.on("namesCleared", handleNamesCleared);
    socket.on("receive_gameStarted", handleGameStarted);
    socket.on("userLoggedOut", handleUserLoggedOut);

    // Cleanup function to remove event listeners
    return () => {
      socket.off("namesCleared", handleNamesCleared);
      socket.off("receive_gameStarted", handleGameStarted);
      socket.off("userLoggedOut", handleUserLoggedOut);
    };
  }, [user]);

  const handleLogin = (loginUser) => {
    setUser(loginUser);
  };

  return (
    <div>
      {user && user.name ? (
        gameStarted ? (
          <MobileMain loginUser={user} />
        ) : (
          <MobileWaiting />
        )
      ) : (
        <MobileLogin loginUserButtonClick={handleLogin} />
      )}
    </div>
  );
};
