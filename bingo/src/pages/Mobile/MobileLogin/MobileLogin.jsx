import React, { useState } from "react";
import io from "socket.io-client";
import { RulesOverlayMobile } from "../../../components/RulesOverlayMobile/RulesOverlayMobile";
import { ColorsBar } from "../../../components/ColorsBar/ColorsBar";

const socket = io.connect("http://192.168.1.3:3001");

export const MobileLogin = ({ loginUserButtonClick }) => {
  const [user, setUser] = useState({ name: "", color: "" });
  const [showRules, setShowRules] = useState(false);

  const logIn = () => {
    socket.emit("send_login_name", { loginUser: user });
    loginUserButtonClick(user);
  };

  const handleColorClick = (selectedColor) => {
    setUser({ ...user, color: selectedColor });
  };

  const activateShowRules = () => {
    setShowRules(!showRules);
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
      <ColorsBar onColorClick={handleColorClick} />
      <button onClick={logIn}>Login</button>
      <button onClick={activateShowRules}>Show Rules</button>
      <RulesOverlayMobile trigger={showRules} setTrigger={setShowRules} />
    </div>
  );
};

export default MobileLogin;
