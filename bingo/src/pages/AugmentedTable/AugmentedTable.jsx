import React, { useEffect, useState } from "react";
import styles from "./AugmentedTable.module.css";
import io from "socket.io-client";
import { PlayerTable } from "../../components/PlayerTable/PlayerTable";
import { SOCKET_URL } from "../../config";

const socket = io.connect(SOCKET_URL);

const AugmentedTable = () => {
  const [users, setUsers] = useState([{}, {}, {}, {}, {}]);
  const [numberActive, setNumberActive] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [profileGame, setProfileGame] = useState(false);
  const [startedGame, setStartedGame] = useState(false);
  const [winnerUser, setWinnerUser] = useState("");

  const allPlayersLoggedIn = () => {
    return users.every(
      (user) =>
        !user.joined ||
        (user.joined &&
          user.name &&
          user.name !== "" &&
          user.color &&
          user.color !== "")
    );
  };

  useEffect(() => {
    // Listen for the "namesCleared" event
    socket.on("receiveNumber", (data) => {
      setNumberActive(data); // Clear names on the client side
    });

    socket.on("namesCleared", () => {
      setUsers([{}, {}, {}, {}, {}]); // Clear names on the client side
      setStartedGame(false);
      setProfileGame(false);
    });
    socket.on("userLoggedOut", (logoutName) => {
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.name !== logoutName)
      );
    });
    socket.on("triggerNextRound", () => {
      if (winnerUser && winnerUser.length > 0) {
        nextRound();
      }
    });
    socket.on("triggerNextStage", () => {
      if (!profileGame) {
        handleNext();
      }
    });
    socket.on("triggerExitGame", () => {
      endGame();
    });
    socket.on("triggerStartGame", () => {
      if (profileGame && !startedGame) {
        handleStart();
      }
    });
    socket.on("triggerShowRules", () => {
      activateShowRules();
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

  socket.on("receive_winner_name", (data) => {
    setWinnerUser(data);
  });

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
    users.forEach((user) => {
      if (user.name && user.color) {
        socket.emit("send_login_name", { loginUser: user });
      }
    });
    setStartedGame(true);
  };

  const colorsChosen = users.map((obj) => obj.color);

  return (
    <div className={styles.tableContainer}>
      {!startedGame && (
        <div className={styles.logo_join}></div> // Logo is shown only if the game has not started
      )}
      {startedGame && (
        <div className={styles.logo}></div> // Logo is shown only if the game has started
      )}
      {winnerUser && winnerUser.length > 0 && (
        <div className={styles.endGameButtons}>
          {winnerUser}
          <button className={styles.nextRoundButton} onClick={endGame}>
            End Game
          </button>
          <button className={styles.nextRoundButton} onClick={nextRound}>
            Next Round
          </button>
        </div>
      )}

      {/* <div className={styles.logo_edit}></div> */}
      <button className={styles.b_b} onClick={endGame}></button>
      <button className={styles.rules} onClick={activateShowRules}></button>

      {!profileGame && (
        <button className={styles.y_b} onClick={handleNext}>
          Next
        </button>
      )}

      {profileGame && !startedGame && (
        <button
          className={styles.p_b}
          onClick={handleStart}
          disabled={!allPlayersLoggedIn()}
        >
          Play
        </button>
      )}
      <div className={styles.midPlayereCards}>
        {" "}
        <PlayerTable
          user={users[0]}
          index={0}
          rotation={90}
          profileGame={profileGame}
          startedGame={startedGame}
          numberActive={numberActive}
          handleLogin={handleLogin}
          handleJoin={handleJoin}
          disabledButtonColors={colorsChosen}
        />
        <PlayerTable
          user={users[1]}
          index={1}
          rotation={-90}
          profileGame={profileGame}
          startedGame={startedGame}
          numberActive={numberActive}
          handleLogin={handleLogin}
          handleJoin={handleJoin}
          disabledButtonColors={colorsChosen}
        />
      </div>
      <div className={styles.bottomPlayereCards}>
        <PlayerTable
          user={users[2]}
          index={2}
          profileGame={profileGame}
          startedGame={startedGame}
          numberActive={numberActive}
          handleLogin={handleLogin}
          handleJoin={handleJoin}
          disabledButtonColors={colorsChosen}
        />
        <PlayerTable
          user={users[3]}
          index={3}
          profileGame={profileGame}
          startedGame={startedGame}
          numberActive={numberActive}
          handleLogin={handleLogin}
          handleJoin={handleJoin}
          disabledButtonColors={colorsChosen}
        />
        <PlayerTable
          user={users[4]}
          index={4}
          profileGame={profileGame}
          startedGame={startedGame}
          numberActive={numberActive}
          handleLogin={handleLogin}
          handleJoin={handleJoin}
          disabledButtonColors={colorsChosen}
        />
      </div>
    </div>
  );
};

export default AugmentedTable;
