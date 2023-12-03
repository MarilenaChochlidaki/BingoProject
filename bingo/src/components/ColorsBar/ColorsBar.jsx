import React, { useState } from "react";
import styles from "./ColorsBar.module.css";

export const ColorsBar = ({ onColorClick, disabledColors = [] }) => {
  const colorButtons = [
    { color: "#ff0000", label: "Red" },
    { color: "#ffa500", label: "Orange" },
    { color: "#00ff00", label: "Green" },
    { color: "#800080", label: "Purple" },
    { color: "#0000ff", label: "Blue" },
  ];

  const [chosenColor, setChosenColor] = useState();

  const handleColorClick = (color) => {
    onColorClick(color);
    setChosenColor(color);
  };

  return (
    <div>
      {colorButtons.map((button, index) => (
        <button
          key={index}
          style={{
            backgroundColor: button.color,
            border: chosenColor === button.color ? "2px solid black" : "none",
          }}
          className={styles.colorButton}
          onClick={() => handleColorClick(button.color)}
          disabled={disabledColors.includes(button.color)}
        ></button>
      ))}
    </div>
  );
};
