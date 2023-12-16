import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MobileLogin from "./MobileLogin/MobileLogin";
import MobileMain from "./MobileMain/MobileMain";
import styles from "./Mobile.module.css";
import { MobileWaiting } from "./MobileWaiting/MobileWaiting";

<<<<<<< HEAD
const socket = io.connect("http://192.168.1.13:3001");
=======
import { SOCKET_URL } from "../../config";
const socket = io.connect(SOCKET_URL);
>>>>>>> b84a6d7dca4f9c91ad46d76b7dff27ec1440c144

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
