import React from "react";
import styles from "./PollDetails.module.scss";

interface PollDetailsProps {
  title: string;
  options: { option: string; votes: number }[];
}

const PollDetails: React.FC<PollDetailsProps> = ({ title, options }) => {
  return (
    <div className={styles.pollDetails}>
      <h1 className={styles.pollDetails__title}>{title}</h1>
      <ul className={styles.pollDetails__options}>
        {options.map((opt, index) => (
          <li key={index} className={styles.pollDetails__option}>
            {opt.option} - {opt.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollDetails;
