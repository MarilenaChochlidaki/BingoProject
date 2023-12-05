import React, { useEffect, useState } from "react";
import styles from "./AugmentedTable.module.css";
import io from "socket.io-client";
import { PlayerTableMain } from "../../components/PlayerTableMain/PlayerTableMain";
import { PlayerTableLogin } from "../../components/PlayerTableLogin/PlayerTableLogin";

const socket = io.connect("http://192.168.1.3:3001");

const AugmentedTable = () => {
  const [users, setUsers] = useState(["", "", "", "", ""]);
  const [numberActive, setNumberActive] = useState(0);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    // Listen for the "namesCleared" event
    socket.on("receiveNumber", (data) => {
      setNumberActive(data); // Clear names on the client side
    });

    socket.on("namesCleared", () => {
      setUsers(["", "", "", "", ""]); // Clear names on the client side
    });
  }, []);

  const handleLogin = (playerData, index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = playerData;
    setUsers(updatedUsers);
  };

  const clearNames = () => {
    socket.emit("clearNames");
  };

  const sendClearBalls = () => {
    socket.emit("send_clearBalls");
  };

  const resetCards = () => {
    socket.emit("resetCards");
  };

  const activateShowRules = () => {
    setShowRules(!showRules);
    console.log(showRules);
    socket.emit("send_showRules", showRules);
  };

  const nextRound = () => {
    sendClearBalls();
    resetCards();
  };

  const endGame = () => {
    clearNames();
    sendClearBalls();
  };

  const colorsChosen = users.map((obj) => obj.color);

  return (
    <div className={styles.tableContainer}>
      <button onClick={nextRound}>Next Round</button>
      <button onClick={endGame}>End Game</button>
      <button onClick={activateShowRules}>Show Rules</button>
      {numberActive}
      <div className={styles.midPlayereCards}>
        {" "}
        {users[0].length <= 1 ? (
          <PlayerTableLogin
            loginUserButtonClick={(playerData) => handleLogin(playerData, 0)}
            disabledButtonColors={colorsChosen}
          />
        ) : (
          <PlayerTableMain
            loginUser={users[0]}
            rotation={90}
            cardNumberActive={numberActive}
          />
        )}
        {users[1].length <= 1 ? (
          <PlayerTableLogin
            loginUserButtonClick={(playerData) => handleLogin(playerData, 1)}
            disabledButtonColors={colorsChosen}
          />
        ) : (
          <PlayerTableMain
            loginUser={users[1]}
            rotation={-90}
            cardNumberActive={numberActive}
          />
        )}
      </div>
      <div className={styles.bottomPlayereCards}>
        {users[2].length <= 1 ? (
          <PlayerTableLogin
            loginUserButtonClick={(playerData) => handleLogin(playerData, 2)}
            disabledButtonColors={colorsChosen}
          />
        ) : (
          <PlayerTableMain
            loginUser={users[2]}
            cardNumberActive={numberActive}
          />
        )}
        {users[3].length <= 1 ? (
          <PlayerTableLogin
            loginUserButtonClick={(playerData) => handleLogin(playerData, 3)}
            disabledButtonColors={colorsChosen}
          />
        ) : (
          <PlayerTableMain
            loginUser={users[3]}
            cardNumberActive={numberActive}
          />
        )}
        {users[4].length <= 1 ? (
          <PlayerTableLogin
            loginUserButtonClick={(playerData) => handleLogin(playerData, 4)}
            disabledButtonColors={colorsChosen}
          />
        ) : (
          <PlayerTableMain
            loginUser={users[4]}
            cardNumberActive={numberActive}
          />
        )}
      </div>
    </div>
  );
};

export default AugmentedTable;
