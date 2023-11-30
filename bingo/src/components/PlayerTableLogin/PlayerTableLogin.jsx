import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.3:3001");
export const PlayerTableLogin = ({ loginNameButtonClick }) => {
  const [user, setUser] = useState("");

  const logIn = () => {
    socket.emit("send_login_name", { loginUser: user });
    loginNameButtonClick(user);
  };

  return (
    <div className="logIn">
      <label>Login</label>
      <input
        placeholder="Name"
        onChange={(event) => {
          setUser({ ...user, name: event.target.value });
        }}
      ></input>
      <button onClick={logIn}>Login</button>
    </div>
  );
};
