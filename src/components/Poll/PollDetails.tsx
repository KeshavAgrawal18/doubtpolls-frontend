import React from "react";

interface PollDetailsProps {
  title: string;
  description: string;
  options: { id: string; label: string; votes: number }[];
}

const PollDetails: React.FC<PollDetailsProps> = ({
  title,
  description,
  options,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            {option.label} - {option.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollDetails;
