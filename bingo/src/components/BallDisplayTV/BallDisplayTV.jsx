import React from "react";
import styles from "./BallDisplayTV.module.css";

export const BallDisplayTV = ({ number }) => {
  return <div className={styles.ballContainer}>{number}</div>;
};
