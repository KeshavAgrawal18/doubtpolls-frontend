import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Vote {
  id: string;
  pollTitle: string;
  pollId: string;
  choice: string;
}

interface VotesListProps {
  votes: Vote[];
  isLoading: boolean;
}

const VotesList: React.FC<VotesListProps> = ({ votes, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Loading your votes...</p>
    );
  }

  if (votes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          You haven’t voted on any decisions yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {votes.map((vote) => (
        <Card
          key={vote.id}
          className="rounded-2xl cursor-pointer hover:shadow-md transition-all border"
          onClick={() => navigate(`/decisions/${vote.pollId}`)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              {vote.pollTitle}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            {/* Left Info */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Your choice</p>
              <p className="font-medium">{vote.choice}</p>
            </div>

            {/* Actions */}
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/decisions/${vote.pollId}/results`);
              }}
            >
              View Results
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VotesList;
