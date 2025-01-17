import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PollDetails.module.scss";
import PollDetailsCard from "@/components/Poll/PollDetailsCard";
import SocialMediaShare from "@/components/common/SocialMediaShare";
import { useToast } from "@/contexts/ToastContext";
import { useVotes } from "@/contexts/VotesContext";
import { castVote } from "@/api/votesApi";
import useFetchPoll from "@/hooks/useFetchPoll";

const PollDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const { votes } = useVotes();

  const { poll, isLoading, error, refetch } = useFetchPoll(id);
  const [hasVoted, setHasVoted] = useState<boolean>(
    votes.some((vote) => vote.pollId === id)
  );

  const handleVote = async (optionId: string) => {
    if (!id || hasVoted) return;

    try {
      await castVote(id, optionId);
      setHasVoted(true);
      showToast(
        "Vote successfully cast! Thank you for your response.",
        "success"
      );
      refetch();
    } catch (err: any) {
      const errorMessage =
        err.message === "User has already voted in this poll"
          ? "You have already voted in this poll."
          : "Failed to cast vote. Please try again.";
      showToast(errorMessage, "error");
    }
  };

  if (isLoading) return <div className={styles.poll}>Loading...</div>;
  if (error) return <div className={styles.poll}>{error}</div>;

  const shareUrl = `${window.location.origin}/polls/${id}`;

  return (
    <div className={styles.poll}>
      <PollDetailsCard
        title={poll?.title}
        description={poll?.description}
        options={poll?.options}
        onVote={handleVote}
        isVotingDisabled={hasVoted}
      />
      <div className={styles.social_share}>
        <SocialMediaShare url={shareUrl} message="Check out this poll!" />
      </div>
    </div>
  );
};

export default PollDetails;
