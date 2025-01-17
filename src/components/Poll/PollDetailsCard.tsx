import React, { useState } from "react";
import styles from "./PollDetailsCard.module.scss";
import Button from "../common/Button";

interface PollDetailsCardProps {
  title?: string;
  description?: string;
  options?: { id: string; label: string; votes?: number }[];
  onVote?: (optionId: string) => void;
  isVotingDisabled: boolean;
}

const PollDetailsCard: React.FC<PollDetailsCardProps> = ({
  title,
  description,
  options,
  onVote,
  isVotingDisabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = () => {
    if (selectedOption && onVote) {
      onVote(selectedOption);
    }
  };

  return (
    <div className={styles.PollDetailsCard}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {options && (
        <div>
          <ul>
            {options.map((option) => (
              <label key={option.id}>
                <li>
                  <input
                    type="radio"
                    name="pollOption"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                  />
                  {option.label}
                </li>
              </label>
            ))}
          </ul>
          <Button
            onClick={handleVote}
            disabled={!selectedOption || isVotingDisabled}
            className={styles.Button}
          >
            Vote
          </Button>
        </div>
      )}
    </div>
  );
};

export default PollDetailsCard;
