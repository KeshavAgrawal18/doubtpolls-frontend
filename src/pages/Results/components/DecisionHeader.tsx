import { Badge } from "@/components/ui/badge";
import { Poll, DerivedData } from "../types";

interface Props extends DerivedData {
  poll: Poll;
}

const DecisionHeader: React.FC<Props> = ({
  poll,
  totalVotes,
  topPercentage,
}) => {
  const status =
    totalVotes === 0
      ? "Waiting"
      : topPercentage >= 70
        ? "Strong Consensus"
        : "Needs Discussion";

  return (
    <div className="text-center space-y-3 max-w-2xl mx-auto">
      <p className="text-xs uppercase text-muted-foreground">
        Decision Summary
      </p>

      <h1 className="text-3xl font-semibold">{poll.title}</h1>

      {poll.description && (
        <p className="text-sm text-muted-foreground">{poll.description}</p>
      )}

      <div className="flex justify-center gap-2 pt-2">
        <Badge variant="secondary">{totalVotes} participants</Badge>
        <Badge>{status}</Badge>
      </div>
    </div>
  );
};

export default DecisionHeader;
