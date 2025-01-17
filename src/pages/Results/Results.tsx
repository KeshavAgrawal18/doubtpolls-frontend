import React, { useEffect } from "react";
import ResultsChart from "@/components/Results/ResultsChart";
import styles from "./Results.module.scss";
import { useResults } from "@/hooks/useResults";
import { useParams } from "react-router-dom";

const Results: React.FC = () => {
  const { results, isLoading, fetchResults } = useResults();
  const { pollId } = useParams<{ pollId: string }>();

  useEffect(() => {
    if (pollId) {
      fetchResults(pollId);
    }
  }, [pollId]);

  if (!pollId) return <div className={styles.error}>Poll does not exist.</div>;

  if (isLoading)
    return <div className={styles.loading}>Loading results...</div>;

  if (!results)
    return <div className={styles.error}>Results do not exist.</div>;

  // Calculate the winning option and check for a tie
  const calculateInsights = () => {
    if (!results.options || results.options.length === 0) return null;

    const maxVotes = Math.max(...results.options.map((option) => option.votes));
    const winningOptions = results.options.filter(
      (option) => option.votes === maxVotes
    );

    const isTie = winningOptions.length > 1;
    return {
      winningOptions,
      isTie,
      maxVotes,
    };
  };

  const insights = calculateInsights();

  return (
    <div className={styles.resultsContainer}>
      <h1 className={styles.title}>Poll Results</h1>

      <div className={styles.insights}>
        {insights && insights.isTie ? (
          <p className={styles.tieMessage}>It&apos;s a tie between:</p>
        ) : (
          <p className={styles.winningMessage}>
            Winning Option: {insights?.winningOptions[0]?.label} with{" "}
            {insights?.maxVotes} votes
          </p>
        )}
        {insights && insights.isTie && (
          <ul className={styles.tieList}>
            {insights.winningOptions.map((option, index) => (
              <li key={index}>
                {option.label} ({option.votes} votes)
              </li>
            ))}
          </ul>
        )}
      </div>

      <ResultsChart title={results.title} options={results.options} />
    </div>
  );
};

export default Results;
