import React from "react";
import ResultsChart from "@/components/Results/ResultsChart";
import styles from "./Results.module.scss";

const Results: React.FC = () => {
  const dummyResults = [
    { option: "Option A", votes: 50 },
    { option: "Option B", votes: 30 },
    { option: "Option C", votes: 20 },
  ];

  return (
    <div className={styles.resultsContainer}>
      <h1 className={styles.title}>Poll Results</h1>
      <ResultsChart pollTitle="Example Poll" results={dummyResults} />
    </div>
  );
};

export default Results;
