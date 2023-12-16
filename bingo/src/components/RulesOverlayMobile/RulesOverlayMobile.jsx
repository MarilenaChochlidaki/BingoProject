import React, { useEffect } from "react";
import styles from "./RulesOverlayMobile.module.css";
import fiveInRowImage from "../../assets/images/five_in_row.png";

export const RulesOverlayMobile = ({ trigger, setTrigger }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the popup if the click is outside the popup
      if (trigger && !event.target.closest(".popup-rules")) {
        setTrigger(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trigger, setTrigger]);

  return trigger ? (
    <div className={styles.showPopupRules}>
      <div className={styles.showPopupContent}>
        <p>
          <strong>1.</strong> Bingo Card: Each player has a 5x5 bingo card with
          25 spaces filled with random numbers.
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
          pattern, such as "Five in a Row".
        </p>
        <p>
          <strong>5.</strong> Calling "Bingo": When a player completes the
          required pattern, they shout "Bingo" to signal a win.
        </p>
        <p>
          <strong>6.</strong> Verification: The game checks the player's card to
          confirm the win.
        </p>
        <p>
          <strong>7.</strong> Continuation: You can play multiple rounds with
          different patterns or end the game at your discretion.
        </p>
        <div className={styles.imageContainer}>
          <img src={fiveInRowImage} alt="Five in a Row" />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
