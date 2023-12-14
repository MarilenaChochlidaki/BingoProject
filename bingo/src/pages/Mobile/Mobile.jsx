import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MobileLogin from "./MobileLogin/MobileLogin";
import MobileMain from "./MobileMain/MobileMain";
import styles from "./Mobile.module.css";
import { MobileWaiting } from "./MobileWaiting/MobileWaiting";

const socket = io.connect("http://147.52.221.194:3001");

export const Mobile = () => {
  const [user, setUser] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on("namesCleared", () => {
      setUser(""); // Clear names on the client side
    });

    socket.on("receive_gameStarted", () => {
      setGameStarted(true);
    });
  }, []);

  const handleLogin = (loginUser) => {
    setUser(loginUser);
  };

  return (
    <div>
      <p>{gameStarted ? "hello" : "no"}</p>
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
