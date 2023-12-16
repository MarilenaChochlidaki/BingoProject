import React, { useEffect } from "react";
import styles from "./RulesOverlayTV.module.css";

export const RulesOverlayTV = ({ trigger }) => {
  return trigger ? (
    <div className={styles.showPopupRules}>
      <div className={styles.showPopupContent}></div>
    </div>
  ) : (
    ""
  );
};
