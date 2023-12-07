import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MobileLogin from "./MobileLogin/MobileLogin";
import MobileMain from "./MobileMain/MobileMain";
import styles from "./Mobile.module.css";

const socket = io.connect("http://192.168.1.13:3001");

export const Mobile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    socket.on("namesCleared", () => {
      setUser(""); // Clear names on the client side
    });
  }, []);

  const handleLogin = (loginUser) => {
    setUser(loginUser);
  };

  return (
    <div>
      {user.length <= 1 ? (
        <MobileLogin loginUserButtonClick={handleLogin} />
      ) : (
        <MobileMain loginUser={user} />
      )}
    </div>
  );
};
