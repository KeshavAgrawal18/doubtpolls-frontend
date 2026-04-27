import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PollVoteStatusProps {
  votedOptionLabel?: string;
  pollId: string;
  navigateToResults: (id: string) => void;
}

const PollVoteStatus: React.FC<PollVoteStatusProps> = ({
  votedOptionLabel,
  pollId,
  navigateToResults,
}) => {
  return (
    <Card className="p-5 space-y-4 border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-green-700">
          ✓ Your input has been recorded
        </p>
        <span className="text-xs text-muted-foreground">
          Decision in progress
        </span>
      </div>

      {votedOptionLabel && (
        <div className="rounded-lg border bg-muted/40 px-3 py-2">
          <p className="text-xs text-muted-foreground">Your choice</p>
          <p className="text-sm font-medium">{votedOptionLabel}</p>
        </div>
      )}

      <div className="h-px bg-neutral-200" />

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          See how your team is leaning
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigateToResults(pollId)}
        >
          View Results
        </Button>
      </div>
    </Card>
  );
};

export default PollVoteStatus;
