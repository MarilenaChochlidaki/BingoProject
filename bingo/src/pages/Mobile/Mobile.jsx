import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login";
export const Mobile = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Mobile</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Increment</button>
      <button onClick={() => navigate("/")}> go Home </button>
      <Login />
    </div>
  );
};
