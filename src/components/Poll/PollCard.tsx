import React from "react";
import styles from "./PollCard.module.scss";

interface PollCardProps {
  title: string;
  description: string;
  votesCount: number;
  onClick: () => void;
}

const PollCard: React.FC<PollCardProps> = ({
  title,
  description,
  votesCount,
  onClick,
}) => {
  return (
    <div className={styles.pollCard} onClick={onClick}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.votes}>Votes: {votesCount}</span>
    </div>
  );
};

export default PollCard;
