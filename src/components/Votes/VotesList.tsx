import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import styles from "./VotesList.module.scss";

interface Vote {
  id: string;
  pollTitle: string;
  pollId: string;
  choice: string;
}

interface VotesListProps {
  votes: Vote[];
  isLoading: boolean;
}

const VotesList: React.FC<VotesListProps> = ({ votes, isLoading }) => {
  const navigate = useNavigate();

  const handleNavigate = (pollId: string) => {
    navigate(`/polls/${pollId}`);
  };

  const handleViewResults = (pollId: string) => {
    navigate(`/results/${pollId}`);
  };

  if (isLoading) {
    return <p className={styles.loadingMessage}>Loading your votes...</p>;
  }

  if (votes.length === 0) {
    return (
      <p className={styles.noVotesMessage}>
        You have not voted on any polls yet.
      </p>
    );
  }

  return (
    <ul className={styles.voteList}>
      {votes.map((vote) => (
        <Card
          id={vote.pollId}
          title={`Poll: ${vote.pollTitle}`}
          description={`My Choice: ${vote.choice}`}
          onClick={handleNavigate}
          actions={
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleViewResults(vote.pollId);
              }}
            >
              View Results
            </Button>
          }
        />
      ))}
    </ul>
  );
};

export default VotesList;
