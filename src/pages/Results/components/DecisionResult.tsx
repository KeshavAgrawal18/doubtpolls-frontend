import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DerivedData } from "../types";

const DecisionResult: React.FC<DerivedData> = ({
  totalVotes,
  isTie,
  winningOptions,
  topPercentage,
}) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6">
        {totalVotes === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No responses yet
          </p>
        ) : !isTie ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between">
            <div>
              <p className="text-xs text-green-700">Leading Decision</p>
              <p className="font-semibold text-green-900">
                {winningOptions[0]?.label}
              </p>
            </div>
            <Badge>{topPercentage}%</Badge>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground">No clear winner</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {winningOptions.map((opt) => (
                <Badge key={opt.optionId} variant="outline">
                  {opt.label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DecisionResult;
