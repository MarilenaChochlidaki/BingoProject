import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./SurroundWall.module.css";
const socket = io.connect("http://localhost:3001");
function SurroundWall() {
  const data = Array.from({ length: 75 }, (_, index) => `${index + 1}`);
  const elementsPerRow = 15;

  var rows = data
    .map(function (data) {
      // map content to html elements
      return <div className={styles.ballContainer}>{data}</div>;
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

  const [usersReceived, setUsersReceived] = useState([]);
  const [numberToSend, setNumberToSend] = useState(0);

  useEffect(() => {
    // Emit the number when the component mounts or when numberToSend changes
    socket.emit("sendNumber", numberToSend);
  }, [numberToSend]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
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
    // Set the number you want to send
    const number = 42; // Change this to the desired number

    // Send the number to the backend
    setNumberToSend(number);
  };

  return (
    <div>
      {usersReceived === "" ? (
        <p>Waiting for Players...</p>
      ) : (
        <div>
          {usersReceived.map((user, index) => (
            <div key={index}>{user.name}</div>
          ))}
          <button onClick={clearNames}>Clear Names</button>
          <button onClick={sendNumberOnce}>Send Number Once</button>
        </div>
      )}
      <div className={styles.bingoBoard}>{rows}</div>
    </div>
  );
}

export default SurroundWall;
