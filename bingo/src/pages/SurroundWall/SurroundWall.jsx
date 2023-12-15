// export default SurroundWall;
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./SurroundWall.module.css";
import { UserWallCard } from "../../components/UserWallCard/UserWallCard";
import { BallDisplay } from "../../components/BallDisplay/BallDisplay";
import MicrophoneSpeech from "../../components/MicrophoneSpeech/MicrophoneSpeech";
const socket = io.connect("http://192.168.1.13:3001");

function SurroundWall() {
  const elementsPerRow = 15;
  const [data, setData] = useState(
    Array.from({ length: 75 }, (_, index) => ({
      isDrawn: false,
      ballIndex: index,
    }))
  );
  var rows = data
    .map((item, index) => {
      // map content to html elements
      return (
        // <div
        //   key={index}
        //   className={`${styles.ballContainer} ${
        //     item.isDrawn ? styles.drawn : ""
        //   }`}
        // >
        //   {index + 1}
        // </div>
        <BallDisplay
          key={index}
          number={index + 1}
          ballDimension={50}
          numberSize={25}
          isDrawn={item.isDrawn}
        />
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

  const clearBalls = () => {
    setData(
      Array.from({ length: 75 }, (_, index) => ({
        isDrawn: false,
        ballIndex: index,
      }))
    );
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

    socket.on("receive_clearBalls", () => {
      clearBalls(); // Clear names on the client side
    });

    // Listen for the user logout event
    socket.on("userLoggedOut", (logoutName) => {
      setUsersReceived((currentUsers) =>
        currentUsers.filter((user) => user.name !== logoutName)
      );
    });
  }, []);

  const sendNumberOnce = () => {
    data[numberToSend - 1].isDrawn = true;
    // Send the number to the backend
    const randnumber = randomizeNumber();
    setNumberToSend(randnumber);
    socket.emit("sendNumber", numberToSend);
  };

  return (
    <div className={styles.align}>
      <MicrophoneSpeech />
      {usersReceived.length === 0 ? (
        <p></p>
      ) : (
        <div className={styles.bingoPlayers}>
          {usersReceived.map((wall_user) => (
            <UserWallCard key={wall_user.name} user={wall_user} />
          ))}
          <button className={styles.sendNumberButton} onClick={sendNumberOnce}>
            Send Number Once
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurroundWall;
