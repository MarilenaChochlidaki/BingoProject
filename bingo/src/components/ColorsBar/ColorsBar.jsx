import React from "react";
import styles from "./ColorsBar.module.css";

export const ColorsBar = ({ onColorClick }) => {
  const colorButtons = [
    { color: "#ff0000", label: "Red" },
    { color: "#ffa500", label: "Orange" },
    { color: "#00ff00", label: "Green" },
    { color: "#800080", label: "Purple" },
    { color: "#0000ff", label: "Blue" },
  ];
  return (
    <div>
      {colorButtons.map((button, index) => (
        <button
          key={index}
          style={{
            backgroundColor: button.color,
          }}
          className={styles.colorButton}
          onClick={() => onColorClick(button.color)}
        ></button>
      ))}
    </div>
  );
};
