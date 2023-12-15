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
    <div style={rotationStyle}>
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
          joinUserButtonClick={(playerData) => handleJoin(playerData, index)}
        />
      )}
    </div>
  );
};
