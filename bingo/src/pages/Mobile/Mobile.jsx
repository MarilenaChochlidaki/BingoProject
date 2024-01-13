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
    socket.on("namesCleared", () => {
      setUser(""); // Clear names on the client side
    });

    socket.on("receive_gameStarted", (data) => {
      setGameStarted(data);
    });

    socket.on("userLoggedOut", (logoutName) => {
      console.log(user.name);
      console.log(logoutName);
      if (user.name === logoutName) {
        setUser("");
      }
    });
  }, []);

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
