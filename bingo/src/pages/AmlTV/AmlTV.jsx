import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AmlTV.module.css";
export const AmlTV = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className={styles.homeTitle}>About asdasdasdasdasdasd</h1>
      <p className={styles.slogan}>This is the about page.</p>
      <div className={styles.pageButtons}>
        <button onClick={() => navigate("/mobile")}> go Mobile </button>
        <button onClick={() => navigate("/mobile")}> go Mobile </button>
        <button onClick={() => navigate("/mobile")}> go Mobile </button>
        <button onClick={() => navigate("/mobile")}> go Mobile </button>
        <button onClick={() => navigate("/mobile")}> go Mobile </button>
        <button onClick={() => navigate("/mobile")}> go Mobile </button>
      </div>
    </div>
  );
};
