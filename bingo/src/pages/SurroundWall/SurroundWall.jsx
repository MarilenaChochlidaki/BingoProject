import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./SurroundWall.module.css";
const socket = io.connect("http://192.168.1.3:3001");

let data = Array.from({ length: 75 }, (_, index) => ({
  isDrawn: false,
  ballIndex: index,
}));

function SurroundWall() {
  const elementsPerRow = 15;

  var rows = data
    .map((item, index) => {
      // map content to html elements
      return (
        <div
          key={index}
          className={`${styles.ballContainer} ${
            item.isDrawn ? styles.drawn : ""
          }`}
        >
          {index + 1}
        </div>
      );
    })
    .reduce(function (r, element, index) {
      // create element groups with size 3, result looks like:
      // [[elem1, elem2, elem3], [elem4, elem5, elem6], ...]
      index % elementsPerRow === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, [])
    .map(function (rowContent, index) {
      // surround every group with 'row'
      return (
        <div key={index} className={styles.ballsRow}>
          {rowContent}
        </div>
      );
    });
  const randomizeNumber = () => {
    // Filter data to get only objects with value 0
    const dataNotDrawn = data.filter((item) => item.isDrawn === false);
    const randomIndex = Math.floor(Math.random() * dataNotDrawn.length);
    const randomObject = dataNotDrawn[randomIndex];
    // Set the number you want to send
    return randomObject.ballIndex + 1;
  };
  const [usersReceived, setUsersReceived] = useState([]);
  const [numberToSend, setNumberToSend] = useState(randomizeNumber);

  useEffect(() => {
    socket.on("receiveUsers", (data) => {
      setUsersReceived(data);
    });

    // Listen for the "namesCleared" event
    socket.on("namesCleared", () => {
      setUsersReceived([]); // Clear names on the client side
    });
  }, []);

  const clearNames = () => {
    socket.emit("clearNames");
  };

  const sendNumberOnce = () => {
    data[numberToSend - 1].isDrawn = true;
    // Send the number to the backend
    const randnumber = randomizeNumber();
    setNumberToSend(randnumber);
    console.log("number to send next" + randnumber);
    socket.emit("sendNumber", numberToSend);
    console.log("After emit");
  };

  const nextRound = () => {};

  const endGame = () => {};

  return (
    <div>
      {usersReceived.length === 0 ? (
        <p>Waiting for Players...</p>
      ) : (
        <div>
          {usersReceived.map((user, index) => (
            <div key={index}>{user.name}</div>
          ))}
          <button onClick={clearNames}>Clear Names</button>
          <button onClick={sendNumberOnce}>Send Number Once</button>
          <button onClick={nextRound}>Next Round</button>
          <button onClick={endGame}>End Game</button>
        </div>
      )}
      <div className={styles.bingoBoard}>{rows}</div>
    </div>
  );
}

export default SurroundWall;
