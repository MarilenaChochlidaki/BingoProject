import React, { useState } from "react";
import MobileLogin from "./MobileLogin/MobileLogin";
import MobileMain from "./MobileMain/MobileMain";

export const Mobile = () => {
  const [user, setUser] = useState("");

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
