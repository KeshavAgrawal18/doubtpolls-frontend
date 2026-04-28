import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Option, DerivedData } from "../types";

interface Props extends DerivedData {
  options: Option[];
}

const VoteDistribution: React.FC<Props> = ({
  options,
  totalVotes,
  maxVotes,
  isTie,
}) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5 space-y-4">
        <p className="text-sm text-muted-foreground">Vote Distribution</p>

        {options.map((opt) => {
          const percent = totalVotes
            ? Math.round((opt.votes / totalVotes) * 100)
            : 0;

          const isWinner = opt.votes === maxVotes && maxVotes > 0;

          return (
            <div key={opt.optionId} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{opt.label}</span>
                <span className="text-xs text-muted-foreground">
                  {percent}%
                </span>
              </div>

              <Progress value={percent} />

              {isWinner && !isTie && <Badge className="mt-1">Top choice</Badge>}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default VoteDistribution;
