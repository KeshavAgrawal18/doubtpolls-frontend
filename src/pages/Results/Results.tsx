import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useResults } from "@/hooks/useResults";
import useFetchPoll from "@/hooks/useFetchPoll";

import DecisionHeader from "./components/DecisionHeader";
import DecisionInsights from "./components/DecisionInsights";
import DecisionResult from "./components/DecisionResult";
import VoteDistribution from "./components/VoteDistribution";

import { Option, DerivedData, Insight } from "./types";

const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { results, isLoading, fetchResults } = useResults();
  const { poll } = useFetchPoll(id);

  useEffect(() => {
    if (id) fetchResults(id);
  }, [id]);

  const options: Option[] = results?.options ?? [];

  const derived: DerivedData = useMemo(() => {
    const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

    const maxVotes =
      options.length > 0
        ? Math.max(...options.map((option) => option.votes))
        : 0;

    const winningOptions = options.filter(
      (option) => option.votes === maxVotes && maxVotes > 0,
    );

    const isTie = winningOptions.length > 1;

    const topPercentage =
      totalVotes > 0 ? Math.round((maxVotes / totalVotes) * 100) : 0;

    const tieCount = winningOptions.length;

    const confidenceScore =
      totalVotes === 0
        ? 0
        : isTie
          ? Math.max(10, topPercentage - tieCount * 10)
          : topPercentage;

    const riskLevel: DerivedData["riskLevel"] =
      totalVotes === 0
        ? "High"
        : isTie
          ? "High"
          : topPercentage >= 70
            ? "Low"
            : "Medium";

    const insight: Insight = (() => {
      if (totalVotes === 0) {
        return {
          status: "No Votes Yet",
          message:
            "No one has voted yet. Share this decision with your team to get input.",
          tone: "neutral",
          action: "share",
        };
      }

      if (isTie) {
        return {
          status: "Split Decision",
          message:
            "Your team is evenly divided. A discussion is needed before moving forward.",
          tone: "warning",
          action: "discuss",
        };
      }

      if (topPercentage >= 70) {
        return {
          status: "Strong Agreement",
          message:
            "Most participants agree on this option. You can confidently proceed.",
          tone: "success",
          action: "proceed",
        };
      }

      return {
        status: "Partial Agreement",
        message:
          "There is some alignment, but not enough to confidently decide. Consider reviewing options.",
        tone: "info",
        action: "review",
      };
    })();

    return {
      totalVotes,
      maxVotes,
      winningOptions,
      isTie,
      topPercentage,
      confidenceScore,
      riskLevel,
      insight,
    };
  }, [options]);

  const safePoll = {
    title: poll?.title ?? "Untitled Decision",
    description: poll?.description ?? "",
    options: poll?.options ?? [],
  };

  if (!id) {
    return <p className="py-10 text-center text-sm">Decision not found</p>;
  }

  if (isLoading) {
    return (
      <p className="py-10 text-center text-sm">Loading decision results...</p>
    );
  }

  if (!results || !poll) {
    return <p className="py-10 text-center text-sm">No data available</p>;
  }

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10">
      <main className="mx-auto max-w-4xl space-y-6">
        <DecisionHeader poll={safePoll} {...derived} />

        <DecisionInsights {...derived} />

        <DecisionResult {...derived} />

        <VoteDistribution options={options} {...derived} />
      </main>
    </div>
  );
};

export default Results;
