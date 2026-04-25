import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { castVote } from "@/api/votesApi";
import useFetchPoll from "@/hooks/useFetchPoll";

import { useToast } from "@/contexts/ToastContext";
import { useVotes } from "@/contexts/VotesContext";

import PollDetailsCard from "@/components/Poll/PollDetailsCard";
import SocialMediaShare from "@/components/common/SocialMediaShare";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Info } from "lucide-react";

const PollDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { votes } = useVotes();

  const { poll, isLoading, error, refetch } = useFetchPoll(id);

  const [hasVoted, setHasVoted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const options = poll?.options ?? [];

  // Sync from existing votes
  useEffect(() => {
    if (!id || !votes) return;

    const existingVote = votes.find((v) => v.pollId === id);

    if (existingVote) {
      setHasVoted(true);
      setSelectedChoice(existingVote.choice); // ✅ FIX
    }
  }, [votes, id]);

  const handleVote = async (optionId: string) => {
    if (!id || hasVoted) return;

    const selectedOption = options.find((o) => o.id === optionId);

    try {
      // optimistic UI
      setSelectedChoice(selectedOption?.label || null);
      setHasVoted(true);

      await castVote(id, optionId);

      showToast("Your input has been recorded", "success");
      refetch();
    } catch (err: any) {
      // rollback
      setSelectedChoice(null);
      setHasVoted(false);

      showToast("Failed to record input. Try again.", "error");
    }
  };

  // match using label
  const votedOption = options.find((o) => o.label === selectedChoice);

  const shareUrl = `${window.location.origin}/polls/${id}`;

  /* Loading */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex items-center gap-2 text-neutral-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading decision...
        </div>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="p-6 text-center">
          <p className="text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Decision */}
        <PollDetailsCard
          title={poll?.title}
          description={poll?.description}
          options={options}
          onVote={handleVote}
          isVotingDisabled={hasVoted}
        />

        {/* Pre-vote */}
        {!hasVoted && (
          <p className="text-sm text-center text-muted-foreground">
            Contribute your input to see team alignment
          </p>
        )}

        {/* After vote */}
        {hasVoted && (
          <Card className="p-5 space-y-4 border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-green-700">
                ✓ Your input has been recorded
              </p>
              <span className="text-xs text-muted-foreground">
                Decision in progress
              </span>
            </div>

            {votedOption && (
              <div className="rounded-lg border bg-muted/40 px-3 py-2">
                <p className="text-xs text-muted-foreground">Your choice</p>
                <p className="text-sm font-medium">{votedOption.label}</p>
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
                onClick={() => navigate(`/polls/${id}/results`)}
              >
                View Results
              </Button>
            </div>
          </Card>
        )}

        {/* Status */}
        <Card className="p-4 space-y-3 text-sm">
          <p className="font-medium flex items-center gap-2">
            <Info className="w-4 h-4" />
            Decision Status
          </p>

          {!hasVoted ? (
            <div className="space-y-1 text-muted-foreground">
              <p>• You haven’t contributed yet</p>
              <p>• Share your input to participate</p>
              <p>• Alignment visible after contribution</p>
            </div>
          ) : (
            <div className="space-y-1 text-muted-foreground">
              <p>• Your input is part of this decision</p>
              <p>• You can now view team alignment</p>
              <p>• Invite others to strengthen it</p>
            </div>
          )}
        </Card>

        {/* Share */}
        <Card className="p-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Invite others to contribute
          </p>

          <SocialMediaShare
            url={shareUrl}
            message="Join this decision and share your input"
          />
        </Card>
      </div>
    </div>
  );
};

export default PollDetails;
