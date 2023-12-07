import React, { useState } from "react";
import styles from "./ColorsBar.module.css";

export const ColorsBar = ({ onColorClick, disabledColors = [] }) => {
  const colorButtons = [
    { color: "#ED1B24", label: "Red" },
    { color: "#ffa500", label: "Orange" },
    { color: "#04D067", label: "Green" },
    { color: "#9966CC", label: "Purple" },
    { color: "#246BCE", label: "Blue" },
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
