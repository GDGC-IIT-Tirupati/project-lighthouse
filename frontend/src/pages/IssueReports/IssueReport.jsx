import React from "react";

import styles from "./issue_report.module.css";

function IssueReport() {
  return (
    <>
      <div className={styles.mainarea}>
        <div className={styles.maintitle}>
          <div className={styles.my}>MY</div>
          <div className={styles.report}>TICKETS</div>
        </div>
      </div>
    </>
  );
}

export default IssueReport;
