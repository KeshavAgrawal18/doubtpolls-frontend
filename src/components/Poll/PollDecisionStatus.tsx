import React from "react";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface PollDecisionStatusProps {
  hasVoted: boolean;
}

const PollDecisionStatus: React.FC<PollDecisionStatusProps> = ({
  hasVoted,
}) => {
  return (
    <Card className="p-4 space-y-3 text-sm">
      <p className="font-medium flex items-center gap-2">
        <Info className="w-4 h-4" />
        Decision Status
      </p>

      <div className="space-y-1 text-muted-foreground">
        {!hasVoted ? (
          <>
            <p>• You haven’t contributed yet</p>
            <p>• Share your input to participate</p>
            <p>• Alignment visible after contribution</p>
          </>
        ) : (
          <>
            <p>• Your input is part of this decision</p>
            <p>• You can now view team alignment</p>
            <p>• Invite others to strengthen it</p>
          </>
        )}
      </div>
    </Card>
  );
};

export default PollDecisionStatus;
