import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";

interface PollCardProps {
  id: string;
  title: string;
  description?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewResults?: (id: string) => void;
}

const PollCard: React.FC<PollCardProps> = ({
  id,
  title,
  description,
  onEdit,
  onDelete,
  onViewResults,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (pollId: string) => navigate(`/polls/${pollId}`);

  const actions = (
    <>
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onEdit && onEdit(id);
        }}
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="danger"
        onClick={(e) => {
          e.stopPropagation();
          onDelete && onDelete(id);
        }}
      >
        Delete
      </Button>
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onViewResults && onViewResults(id);
        }}
      >
        View Results
      </Button>
    </>
  );

  return (
    <Card
      id={id}
      title={title}
      description={description}
      onClick={handleNavigate}
      actions={actions}
    />
  );
};

export default PollCard;
