import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MobileLogin from "./MobileLogin/MobileLogin";
import MobileMain from "./MobileMain/MobileMain";

const socket = io.connect("http://192.168.1.3:3001");

export const Mobile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    socket.on("namesCleared", () => {
      setUser(""); // Clear names on the client side
    });
  }, []);

  const handleLogin = (playerName) => {
    setUser(playerName);
  };

  return (
    <div>
      <h1>Mobile</h1>
      {user.length <= 1 ? (
        <MobileLogin loginNameButtonClick={handleLogin} />
      ) : (
        <MobileMain loginName={user} />
      )}
    </div>
  );
};
