import React, { useEffect } from "react";
import spinTheWheelImage from "../../assets/images/spinTheWheel.png";
import showRulesImage from "../../assets/images/showRules.png";
import finishGameImage from "../../assets/images/finishGame.png";
import nextRoundImage from "../../assets/images/nextRound.png";
import fiveInRowImage from "../../assets/images/five_in_row.png";
import styles from "./RulesOverlayTV.module.css";

export const RulesOverlayTV = ({ trigger }) => {
  return trigger ? (
    <div className={styles.showPopupRules}>
      <div className={styles.showPopupContent}>
        <div className={styles.instructionsHeader}>GAME INSTRUCTIONS</div>
        <h2>Bingo Rules:</h2>
        <div className={styles.bingoRules}>
          <p>
            <strong>1.</strong> Bingo Card: Each player has a 5x5 bingo card
            with 25 spaces filled with random numbers.
          </p>
          <p>
            <strong>2.</strong> Number Calls: A wheel gives numbers randomly one
            by one.
          </p>
          <p>
            <strong>3.</strong> Marking Numbers: Players mark called numbers on
            their cards.
          </p>
          <p>
            <strong>4.</strong> Winning Patterns: To win, complete a specific
            pattern "Five in a Row".
          </p>
          <p>
            <strong>5.</strong> Calling "Bingo": When a player completes the
            required pattern, they shout "Bingo" to signal a win.
          </p>
          <p>
            <strong>6.</strong> Verification: The game checks the player's card
            to confirm the win.
          </p>
          <p>
            <strong>7.</strong> Continuation: You can play multiple rounds with
            different patterns or end the game at your discretion.
          </p>
        </div>
        <div className={styles.bingoVoiceCommands}>
          <p>“Bingo Start Game”</p>
          <p>“Bingo Finish Game”</p>
          <p>“Bingo Next Round”</p>
          <p>“Bingo Show Rules”</p>
          <p>“Bingo Hide Rules”</p>
          <p>“Bingo Stop Wheel”</p>
        </div>
        <div className={styles.bingoGestures}>
          <ul>
            <li>
              Spin the Wheel:
              <img src={spinTheWheelImage} alt="Spin the Wheel" />
            </li>
            <li>
              Show Rules:
              <img src={showRulesImage} alt="Show Rules" />
            </li>
            <li>
              Hide Rules:
              <img src={showRulesImage} alt="Show Rules" />
            </li>
            <li>
              Next Round:
              <img src={nextRoundImage} alt="Next Round" />
            </li>
            <li>
              Finish Game:
              <img src={finishGameImage} alt="Finish Game" />
            </li>
          </ul>
        </div>
        <div className={styles.bingoVisual}>
          <img src={fiveInRowImage} alt="Five in a Row" />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
