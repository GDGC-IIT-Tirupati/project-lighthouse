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

        <div className={styles.information}>
            <div className= {styles.tagline}>
                Track the status of the issues you have flagged across the campus. Every report helps us build a brighter, safer environment for everyone.
            </div>
            <div className={styles.total_issues}>
                <div className = {styles.nos}>14</div>
                <div className= {styles.text_for_nos}>TOTAL ISSUES LOGGED </div>
            </div>
        </div>

      </div>
    </>
  );
}

export default IssueReport;
