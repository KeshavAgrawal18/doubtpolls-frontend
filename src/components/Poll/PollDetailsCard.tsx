import React from "react";
import styles from "./PollDetailsCard.module.scss";

interface PollDetailsCardProps {
  title?: string;
  description?: string;
  options?: { id: string; label: string; votes?: number }[];
}

const PollDetailsCard: React.FC<PollDetailsCardProps> = ({
  title,
  description,
  options,
}) => {
  return (
    <div className={styles.PollDetailsCard}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {options && (
        <ul>
          {options.map((option) => (
            <li key={option.id}>{option.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PollDetailsCard;
