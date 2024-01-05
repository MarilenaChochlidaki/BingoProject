import styles from "./PlayerTable.module.css";
import { PlayerTableMain } from "../PlayerTableMain/PlayerTableMain";
import { PlayerTableLogin } from "../PlayerTableLogin/PlayerTableLogin";
import { PlayerTableJoin } from "../PlayerTableJoin/PlayerTableJoin";

export const PlayerTable = ({
  user,
  index,
  rotation,
  profileGame,
  startedGame,
  numberActive,
  handleLogin,
  handleJoin,
  disabledButtonColors,
}) => {
  const rotationStyle = {
    transform: `rotate(${rotation}deg)`,
    // Add any additional styles needed for correct positioning and display
  };

  return (
    <div style={rotationStyle} className={styles.playerTableContainer}>
      {user && user.joined && profileGame ? (
        startedGame ? (
          <PlayerTableMain loginUser={user} cardNumberActive={numberActive} />
        ) : (
          <PlayerTableLogin
            loginUserButtonClick={(playerData) =>
              handleLogin(playerData, index)
            }
            disabledButtonColors={disabledButtonColors}
          />
        )
      ) : (
        <PlayerTableJoin
          disabledCompletelyJoin={startedGame}
          disabledJoin={profileGame}
          joinUserButtonClick={(playerData) => handleJoin(playerData, index)}
        />
      )}
    </div>
  );
};
