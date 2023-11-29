import React, { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.3:3001");

function MobileLogin({ loginNameButtonClick }) {
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
      <h1>Player Names</h1>
    </div>
  );
}

export default MobileLogin;
