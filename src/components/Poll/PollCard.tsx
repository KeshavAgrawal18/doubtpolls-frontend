import React from "react";
import styles from "./PollCard.module.scss";
import { useNavigate } from "react-router-dom";

interface PollCardProps {
  id: string;
  title: string;
  description?: string;
}

const PollCard: React.FC<PollCardProps> = ({ id, title, description }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.pollCard}
      onClick={() => navigate(`/polls/${id}`)}
      role="button"
      tabIndex={0}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      {description && (
        <p className={styles.description}>
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>
      )}
    </div>
  );
};

export default PollCard;
