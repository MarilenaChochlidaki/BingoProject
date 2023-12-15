import React, { useEffect, useState } from "react";
import styles from "./AugmentedTable.module.css";
import io from "socket.io-client";
import { PlayerTableMain } from "../../components/PlayerTableMain/PlayerTableMain";
import { PlayerTableLogin } from "../../components/PlayerTableLogin/PlayerTableLogin";
import { PlayerTableJoin } from "../../components/PlayerTableJoin/PlayerTableJoin";
import { SOCKET_URL } from "../../config";

const socket = io.connect(SOCKET_URL);

const AugmentedTable = () => {
  const [users, setUsers] = useState([{}, {}, {}, {}, {}]);
  const [numberActive, setNumberActive] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [profileGame, setProfileGame] = useState(false);
  const [startedGame, setStartedGame] = useState(false);

  useEffect(() => {
    // Listen for the "namesCleared" event
    socket.on("receiveNumber", (data) => {
      setNumberActive(data); // Clear names on the client side
    });

    socket.on("namesCleared", () => {
      setUsers([{}, {}, {}, {}, {}]); // Clear names on the client side
    });
    socket.on("userLoggedOut", (logoutName) => {
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.name !== logoutName)
      );
    });

    // Cleanup on unmount
    return () => {
      socket.off("userLoggedOut");
    };
  }, []);

  useEffect(() => {
    socket.emit("send_showRules", showRules);
  }, [showRules]);

  useEffect(() => {
    socket.emit("send_startedGame", startedGame);
  }, [startedGame]);

  const handleJoin = (playerData, index) => {
    setUsers((currentUsers) => {
      const updatedUsers = [...currentUsers];
      // Merge playerData into the existing user data
      updatedUsers[index] = { ...updatedUsers[index], ...playerData };
      return updatedUsers;
    });
  };

  const handleLogin = (playerData, index) => {
    setUsers((users) =>
      users.map((user, idx) =>
        idx === index ? { ...user, ...playerData } : user
      )
    );
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
    setShowRules((prevShowRules) => !prevShowRules);
  };

  const nextRound = () => {
    sendClearBalls();
    resetCards();
  };

  const endGame = () => {
    clearNames();
    sendClearBalls();
  };

  const handleNext = () => {
    console.log(users);
    setProfileGame(true);
  };

  const handleStart = () => {
    setStartedGame(true);
  };

  const colorsChosen = users.map((obj) => obj.color);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.logo_join}></div>
      <button onClick={nextRound}>Next Round</button>
      {/* <div className={styles.logo_edit}></div> */}
      <button className={styles.b_b} onClick={endGame}></button>
      <button className={styles.rules} onClick={activateShowRules}></button>
      <button className={styles.y_b} onClick={handleNext}>
        Next
      </button>
      <button className={styles.p_b} onClick={handleStart}>
        Play
      </button>
      {numberActive}
      <div className={styles.midPlayereCards}>
        {" "}
        {users[0] && users[0].joined && profileGame ? (
          startedGame ? (
            <PlayerTableMain
              loginUser={users[0]}
              rotation={90}
              cardNumberActive={numberActive}
            />
          ) : (
            <PlayerTableLogin
              loginUserButtonClick={(playerData) => handleLogin(playerData, 0)}
              disabledButtonColors={colorsChosen}
            />
          )
        ) : (
          <PlayerTableJoin
            joinUserButtonClick={(playerData) => handleJoin(playerData, 0)}
          />
        )}
        {users[1] && users[1].joined && profileGame ? (
          startedGame ? (
            <PlayerTableMain
              loginUser={users[1]}
              rotation={-90}
              cardNumberActive={numberActive}
            />
          ) : (
            <PlayerTableLogin
              loginUserButtonClick={(playerData) => handleLogin(playerData, 1)}
              disabledButtonColors={colorsChosen}
            />
          )
        ) : (
          <PlayerTableJoin
            joinUserButtonClick={(playerData) => handleJoin(playerData, 1)}
          />
        )}
      </div>
      <div className={styles.bottomPlayereCards}>
        {users[2] && users[2].joined && profileGame ? (
          startedGame ? (
            <PlayerTableMain
              loginUser={users[2]}
              cardNumberActive={numberActive}
            />
          ) : (
            <PlayerTableLogin
              loginUserButtonClick={(playerData) => handleLogin(playerData, 2)}
              disabledButtonColors={colorsChosen}
            />
          )
        ) : (
          <PlayerTableJoin
            joinUserButtonClick={(playerData) => handleJoin(playerData, 2)}
          />
        )}
        {users[3] && users[3].joined && profileGame ? (
          startedGame ? (
            <PlayerTableMain
              loginUser={users[3]}
              cardNumberActive={numberActive}
            />
          ) : (
            <PlayerTableLogin
              loginUserButtonClick={(playerData) => handleLogin(playerData, 3)}
              disabledButtonColors={colorsChosen}
            />
          )
        ) : (
          <PlayerTableJoin
            joinUserButtonClick={(playerData) => handleJoin(playerData, 3)}
          />
        )}
        {users[4] && users[4].joined && profileGame ? (
          startedGame ? (
            <PlayerTableMain
              loginUser={users[4]}
              cardNumberActive={numberActive}
            />
          ) : (
            <PlayerTableLogin
              loginUserButtonClick={(playerData) => handleLogin(playerData, 4)}
              disabledButtonColors={colorsChosen}
            />
          )
        ) : (
          <PlayerTableJoin
            joinUserButtonClick={(playerData) => handleJoin(playerData, 4)}
          />
        )}
      </div>
    </div>
  );
};

export default AugmentedTable;
