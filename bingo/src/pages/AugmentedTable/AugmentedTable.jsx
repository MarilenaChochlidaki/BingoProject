import React, { useEffect, useState } from "react";
import styles from "./AugmentedTable.module.css";
import io from "socket.io-client";
import { PlayerTableMain } from "../../components/PlayerTableMain/PlayerTableMain";
import { PlayerTableLogin } from "../../components/PlayerTableLogin/PlayerTableLogin";

const socket = io.connect("http://192.168.1.3:3001");

const AugmentedTable = () => {
  const [users, setUsers] = useState(["", "", "", "", ""]);
  const [numberActive, setNumberActive] = useState(0);

  useEffect(() => {
    // Listen for the "namesCleared" event
    socket.on("receiveNumber", (data) => {
      console.log(data);
      setNumberActive(data); // Clear names on the client side
    });
  }, []);

  const handleLogin = (playerName, index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = playerName;
    setUsers(updatedUsers);
  };

  return (
    <div className={styles.tableContainer}>
      {numberActive}
      <div className={styles.midPlayereCards}>
        {" "}
        {users[0].length <= 1 ? (
          <PlayerTableLogin
            loginNameButtonClick={(playerName) => handleLogin(playerName, 0)}
          />
        ) : (
          <PlayerTableMain
            loginName={users[0]}
            rotation={90}
            cardNumberActive={numberActive}
          />
        )}
        {users[1].length <= 1 ? (
          <PlayerTableLogin
            loginNameButtonClick={(playerName) => handleLogin(playerName, 1)}
          />
        ) : (
          <PlayerTableMain
            loginName={users[1]}
            rotation={-90}
            cardNumberActive={numberActive}
          />
        )}
      </div>
      <div className={styles.bottomPlayereCards}>
        {users[2].length <= 1 ? (
          <PlayerTableLogin
            loginNameButtonClick={(playerName) => handleLogin(playerName, 2)}
          />
        ) : (
          <PlayerTableMain
            loginName={users[2]}
            cardNumberActive={numberActive}
          />
        )}
        {users[3].length <= 1 ? (
          <PlayerTableLogin
            loginNameButtonClick={(playerName) => handleLogin(playerName, 3)}
          />
        ) : (
          <PlayerTableMain
            loginName={users[3]}
            cardNumberActive={numberActive}
          />
        )}
        {users[4].length <= 1 ? (
          <PlayerTableLogin
            loginNameButtonClick={(playerName) => handleLogin(playerName, 4)}
          />
        ) : (
          <PlayerTableMain
            loginName={users[4]}
            cardNumberActive={numberActive}
          />
        )}
      </div>
    </div>
  );
};

export default AugmentedTable;
