import React, { useEffect } from "react";
import styles from "./RulesOverlayMobile.module.css";

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
        <b>This are the Mobile rules</b>
      </div>
    </div>
  ) : (
    ""
  );
};
