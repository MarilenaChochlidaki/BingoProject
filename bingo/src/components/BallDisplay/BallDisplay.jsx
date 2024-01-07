import React from "react";
import styles from "./BallDisplay.module.css";

export const BallDisplay = ({ number, ballDimension, numberSize, isDrawn }) => {
  const ballClass = isDrawn ? styles.ballDrawn : styles.ballNotDrawn;
  return (
    <div
      style={{
        width: `${ballDimension}px`,
        height: `${ballDimension}px`,
        fontSize: numberSize,
        backgroundColor: "#ffe500",
      }}
      className={`${styles.ballContainer} ${ballClass}`}
    >
      {isDrawn && number}
    </div>
  );
};
