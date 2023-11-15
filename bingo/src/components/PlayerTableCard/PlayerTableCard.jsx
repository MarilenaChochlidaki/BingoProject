import React from "react";
import styles from "./PlayerTableCard.module.css";

export const PlayerTableCard = ({ rotation = 0 }) => {
  const cardStyle = {
    transform: `rotate(${rotation}deg)`,
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        buttons.push(
          <button key={`${i}-${j}`} className={styles.cardButton}>
            Button {i * 5 + j + 1}
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className={styles.cardContainer} style={cardStyle}>
      playerTableCard
      <div className={styles.buttonContainer}>{renderButtons()}</div>
    </div>
  );
};
