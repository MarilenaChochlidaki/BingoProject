import React, { useState, useEffect, useCallback } from "react";
import styles from "./RulesOverlayMobile.module.css";
import fiveInRowImage from "../../assets/images/five_in_row.png";

export const RulesOverlayMobile = ({ trigger, setTrigger }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (downwards)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = useCallback(() => {
    if (touchEnd && touchStart && touchEnd - touchStart > minSwipeDistance) {
      setTrigger(false);
    }
  }, [touchStart, touchEnd, setTrigger]);

  useEffect(() => {
    const popupElement = document.querySelector(".popup-rules");

    if (trigger && popupElement) {
      popupElement.addEventListener("touchstart", onTouchStart);
      popupElement.addEventListener("touchmove", onTouchMove);
      popupElement.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      if (popupElement) {
        popupElement.removeEventListener("touchstart", onTouchStart);
        popupElement.removeEventListener("touchmove", onTouchMove);
        popupElement.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [trigger, onTouchEnd]);

  return trigger ? (
    <div
      className={styles.showPopupRules}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.showPopupContent}>
        <div className={styles.yellow_line}></div>
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
