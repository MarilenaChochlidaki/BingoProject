import React, { useEffect, useState } from "react";
import styles from "./PlayerCard.module.css";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.3:3001");

const generateBallColumn = (startIndex) => {
  return Array.from({ length: 15 }, (_, index) => ({
    isDealt: false,
    ballIndex: index + startIndex,
  }));
};

export const PlayerCard = ({
  rotation = 0,
  cardNumberActive = 0,
  bingoActivate,
}) => {
  const [ballColumns, setBallColumns] = useState([[], [], [], [], []]);
  const [win, setWin] = useState(false);
  const cardStyle = {
    transform: `rotate(${rotation}deg)`,
  };

  const initialBallColumns = () => {
    const newColumns = [];

    for (let i = 0; i < 5; i++) {
      newColumns[i] = [];
      let dataNotDealt = generateBallColumn(i * 15).filter(
        (item) => !item.isDealt
      );

      for (let j = 0; j < 5; j++) {
        const dataNotDealtHelper = dataNotDealt.filter((item) => !item.isDealt);
        const randomIndex = Math.floor(
          Math.random() * dataNotDealtHelper.length
        );
        const randomObject = dataNotDealtHelper[randomIndex];

        dataNotDealt[randomObject.ballIndex - i * 15].isDealt = true;

        newColumns[i].push({
          ballIndex: randomObject.ballIndex + 1,
          isMarked: false,
        });
      }
    }

    // Sort each column in ascending order based on ballIndex
    newColumns.forEach((column) => {
      column.sort((a, b) => a.ballIndex - b.ballIndex);
    });

    return newColumns;
  };

  useEffect(() => {
    setBallColumns(initialBallColumns());

    socket.on("receive_resetCards", () => {
      setBallColumns(initialBallColumns());
    });
  }, []);

  const checkBingo = () => {
    console.log(ballColumns);
    for (let i = 0; i < 5; i++) {
      if (
        ballColumns[i].every((ball) => ball.isMarked) ||
        ballColumns.every((column) => column[i].isMarked)
      ) {
        bingoActivate();
        return true; // Bingo found
      }
    }

    // Check diagonals
    if (
      ballColumns.every((column, index) => column[index].isMarked) ||
      ballColumns.every((column, index) => column[4 - index].isMarked)
    ) {
      bingoActivate();
      return true; // Bingo found
    }

    return false; // No bingo
  };

  const handleButtonClick = (ballIndex, columnIndex) => {
    // Handle button click logic here
    console.log(`Button ${ballIndex} clicked`);
    setBallColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const ball = newColumns[columnIndex].find(
        (ball) => ball.ballIndex === cardNumberActive
      );

      if (ball) {
        ball.isMarked = true; // Toggle the isMarked property
        setWin(checkBingo());
        console.log(win);
      }

      return newColumns;
    });
  };

  return (
    <div>
      PlayerCard
      {cardNumberActive}
      <div className={styles.cardContainer} style={cardStyle}>
        {ballColumns.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.columnContainer}>
            {column.map((ball, ballIndex) => (
              <button
                key={ballIndex}
                className={`${styles.ballButton} ${
                  ball.isMarked ? styles.marked : ""
                }`}
                onClick={() => handleButtonClick(ball.ballIndex, columnIndex)}
              >
                {ball.ballIndex}
              </button>
            ))}
          </div>
        ))}
      </div>
      {win && <p>BINGO!</p>}
    </div>
  );
};
