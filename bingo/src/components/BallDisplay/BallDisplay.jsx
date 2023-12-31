import React from "react";
import styles from "./BallDisplay.module.css";

export const BallDisplay = ({ number, ballDimension, numberSize, isDrawn }) => {
  return (
    <div
      style={{
        width: `${ballDimension}px`,
        height: `${ballDimension}px`,
        fontSize: numberSize,
        backgroundColor: isDrawn ? "yellow" : "black",
      }}
      className={styles.ballContainer}
    >
      {number}
    </div>
  );
};
