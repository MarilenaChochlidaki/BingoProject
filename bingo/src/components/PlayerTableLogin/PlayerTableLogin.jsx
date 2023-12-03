import React, { useEffect, useState } from "react";
import { ColorsBar } from "../ColorsBar/ColorsBar";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.3:3001");

export const PlayerTableLogin = ({
  loginUserButtonClick,
  disabledButtonColors,
}) => {
  const [user, setUser] = useState({ name: "", color: "" });

  const logIn = () => {
    socket.emit("send_login_name", { loginUser: user });
    loginUserButtonClick(user);
  };

  const handleColorClick = (selectedColor) => {
    setUser({ ...user, color: selectedColor });
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
      <ColorsBar
        onColorClick={handleColorClick}
        disabledColors={disabledButtonColors}
      />
    </div>
  );
};
