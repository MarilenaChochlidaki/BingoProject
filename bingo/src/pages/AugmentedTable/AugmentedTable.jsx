import React from "react";
import styles from "./AugmentedTable.module.css";
import { PlayerTableCard } from "../../components/PlayerTableCard/PlayerTableCard";

const AugmentedTable = () => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.midPlayereCards}>
        {" "}
        <PlayerTableCard rotation={90}></PlayerTableCard>
        <PlayerTableCard rotation={-90}></PlayerTableCard>
      </div>
      <div className={styles.bottomPlayereCards}>
        <PlayerTableCard></PlayerTableCard>
        <PlayerTableCard></PlayerTableCard>
        <PlayerTableCard></PlayerTableCard>
      </div>
    </div>
  );
};

export default AugmentedTable;
