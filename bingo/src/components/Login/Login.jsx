import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");

  const logIn = () => {};
  return (
    <div className="logIn">
      <label>Login</label>
      <input
        placeholder="Name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <button onClick={logIn}>Login</button>
    </div>
  );
}

export default Login;
