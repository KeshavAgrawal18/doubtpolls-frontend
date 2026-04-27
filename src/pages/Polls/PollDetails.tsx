import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { castVote } from "@/api/votesApi";
import useFetchPoll from "@/hooks/useFetchPoll";

import { useToast } from "@/contexts/ToastContext";
import { useVotes } from "@/contexts/VotesContext";

import PollDetailsCard from "@/components/Poll/PollDetailsCard";
import PollVoteStatus from "@/components/Poll/PollVoteStatus";
import PollDecisionStatus from "@/components/Poll/PollDecisionStatus";
import PollShareCard from "@/components/Poll/PollShareCard";
import { Loader2 } from "lucide-react";

const PollDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { votes, isLoading: votesLoading } = useVotes();

  const { poll, isLoading: pollLoading, error, refetch } = useFetchPoll(id);
  const [isVoting, setIsVoting] = useState(false);

  if (!id) return null;

  // Derive hasVoted from global votes
  const existingVote = votes.find((v) => v.pollId === id);
  const hasVoted = !!existingVote;
  const selectedChoice = existingVote?.choice ?? null;

  const options = poll?.options ?? [];

  const handleVote = async (optionId: string) => {
    if (hasVoted || isVoting) return;

    const selectedOption = options.find((o) => o.id === optionId);
    if (!selectedOption) return;

    try {
      setIsVoting(true);

      await castVote(id, optionId);

      showToast("Your input has been recorded", "success");
      refetch();
    } catch (err) {
      showToast("Failed to record input. Try again.", "error");
    } finally {
      setIsVoting(false);
    }
  };

  const votedOption = options.find((o) => o.label === selectedChoice);
  const shareUrl = `${window.location.origin}/polls/${id}`;

  if (votesLoading || pollLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex items-center gap-2 text-neutral-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading decision...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <PollDetailsCard
          title={poll?.title}
          description={poll?.description}
          options={options}
          onVote={handleVote}
          isVotingDisabled={hasVoted || isVoting}
        />

        {!hasVoted && (
          <p className="text-sm text-center text-muted-foreground">
            Contribute your input to see team alignment
          </p>
        )}

        {hasVoted && votedOption && (
          <PollVoteStatus
            votedOptionLabel={votedOption.label}
            pollId={id}
            navigateToResults={(pollId) => navigate(`/polls/${pollId}/results`)}
          />
        )}

        <PollDecisionStatus hasVoted={hasVoted} />
        <PollShareCard shareUrl={shareUrl} />
      </div>
    </div>
  );
};

export default PollDetailsPage;
