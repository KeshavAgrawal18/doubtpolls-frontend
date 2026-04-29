import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatsCard from "@/components/dashboard/StatsCard";
import SectionWrapper from "@/components/layout/SectionWrapper";
import PriorityCard from "@/components/dashboard/PriorityCard";

import PollCard from "@/components/Poll/PollCard";
import VotesList from "@/components/Votes/VotesList";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/AuthContext";
import { usePoll } from "@/contexts/PollContext";
import { useVotes } from "@/contexts/VotesContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { polls, isLoading: pollsLoading, deletePoll } = usePoll();
  const { votes, isLoading: votesLoading } = useVotes();
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const votedPollIds = useMemo(
    () => new Set(votes.map((v) => v.pollId)),
    [votes],
  );

  const priorityPolls = useMemo(
    () => polls?.filter((p) => !votedPollIds.has(p.id)).slice(0, 2) || [],
    [polls, votedPollIds],
  );

  const participation = useMemo(() => {
    if (!polls?.length) return 0;
    return Math.round((votes.length / polls.length) * 100);
  }, [polls, votes]);

  const confirmDelete = () => {
    if (deleteId) deletePoll(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back, {user?.username}
        </h1>
        <p className="text-muted-foreground text-sm">
          Here’s what needs your attention today
        </p>
      </div>

      {/* Priority HERO */}
      {priorityPolls.length > 0 ? (
        <div className="space-y-4 p-6 rounded-2xl bg-muted/40 border">
          <h2 className="text-lg font-semibold">⚡ Needs Your Response</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {priorityPolls.map((p) => (
              <PriorityCard
                key={p.id}
                title={p.title}
                description={p.description ?? ""}
                onVote={() => navigate(`/decisions/${p.id}`)}
                onView={() => navigate(`/decisions/${p.id}/results`)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-muted text-sm text-muted-foreground">
          You're all caught up. No pending decisions.
        </div>
      )}

      {/* Meaningful Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatsCard
          label="Pending Decisions"
          value={priorityPolls.length}
          hint="Needs your input"
        />

        <StatsCard
          label="Participation"
          value={`${participation}%`}
          hint={participation < 60 ? "Low engagement" : "Healthy"}
        />

        <StatsCard
          label="Total Decisions"
          value={polls.length}
          hint="Created by you"
        />
      </div>

      {/* Decisions */}
      <SectionWrapper
        title="Your Decisions"
        action={
          <Button size="sm" onClick={() => navigate("/decisions/create")}>
            New Decision
          </Button>
        }
      >
        {pollsLoading && (
          <p className="text-sm text-muted-foreground">Loading decisions...</p>
        )}

        {!pollsLoading && !polls.length && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No decisions yet</p>
            <Button
              className="mt-3"
              onClick={() => navigate("/decisions/create")}
            >
              Create Decision
            </Button>
          </div>
        )}

        {!pollsLoading && polls.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {polls.map((p) => (
              <PollCard
                key={p.id}
                {...p}
                onEdit={() => navigate(`/decisions/${p.id}/edit`)}
                onDelete={() => setDeleteId(p.id)}
                onViewResults={() => navigate(`/decisions/${p.id}/results`)}
              />
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Responses */}
      <div className="pt-6 border-t">
        <SectionWrapper title="Your Responses">
          <VotesList votes={votes} isLoading={votesLoading} />
        </SectionWrapper>
      </div>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Delete Decision?"
        description="This will permanently remove the decision and all associated votes."
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Dashboard;
