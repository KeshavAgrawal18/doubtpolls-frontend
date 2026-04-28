import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/contexts/ToastContext";

import { DerivedData, Insight } from "../types";

type ButtonVariant = "default" | "secondary" | "outline";

const toneStyles: Record<
  Insight["tone"],
  {
    border: string;
    badge: string;
    button: ButtonVariant;
  }
> = {
  success: {
    border: "border-l-green-500",
    badge: "bg-muted text-muted-foreground",
    button: "default",
  },
  warning: {
    border: "border-l-amber-500",
    badge: "bg-muted text-muted-foreground",
    button: "outline",
  },
  info: {
    border: "border-l-blue-500",
    badge: "bg-muted text-muted-foreground",
    button: "secondary",
  },
  neutral: {
    border: "border-l-muted-foreground",
    badge: "bg-muted text-muted-foreground",
    button: "secondary",
  },
};

const actionLabel: Record<Insight["action"], string> = {
  share: "Share with Team",
  discuss: "Start Discussion",
  proceed: "Finalize Decision",
  review: "Gather More Input",
};

const getConfidenceLabel = (score: number) => {
  if (score >= 75) return "High Confidence";
  if (score >= 50) return "Moderate Confidence";
  if (score >= 25) return "Low Confidence";
  return "Very Low Confidence";
};

const getConfidenceMessage = (score: number) => {
  if (score >= 75) return "Clear team alignment. Safe to proceed.";
  if (score >= 50) return "Some agreement, but minor uncertainty exists.";
  if (score >= 25) return "Decision is unclear. More input recommended.";
  return "High disagreement. Avoid finalizing now.";
};

const getConfidenceColor = (score: number) => {
  if (score >= 75) return "text-green-600";
  if (score >= 50) return "text-amber-600";
  if (score >= 25) return "text-amber-600";
  return "text-red-600";
};

const DecisionInsights: React.FC<DerivedData> = ({
  insight,
  confidenceScore,
  totalVotes,
  riskLevel,
}) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const styles = toneStyles[insight.tone];
  const label = actionLabel[insight.action];

  const copyLink = async () => {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(window.location.href);
  };

  const handleAction = async () => {
    setLoading(true);

    try {
      if (insight.action === "share" || insight.action === "review") {
        await copyLink();
        showToast("Link copied. Share it with your team.", "success");
      } else if (insight.action === "discuss") {
        showToast("Start a discussion before deciding.", "info");
      } else if (insight.action === "proceed") {
        showToast("Decision looks strong. You can proceed.", "success");
      }
    } catch {
      showToast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <Card
        className={`rounded-2xl border-l-4 bg-background shadow-sm ${styles.border}`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  {insight.status}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${styles.badge}`}
                >
                  {insight.action}
                </span>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {insight.message}
              </p>

              <div className="rounded-xl border bg-muted/30 px-4 py-3">
                <p
                  className={`text-sm font-medium ${getConfidenceColor(
                    confidenceScore,
                  )}`}
                >
                  {getConfidenceLabel(confidenceScore)} · {confidenceScore}%
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {getConfidenceMessage(confidenceScore)}
                </p>
              </div>
            </div>

            <Button
              variant={styles.button}
              className="w-full md:w-auto"
              onClick={handleAction}
              disabled={loading}
            >
              {loading ? "Processing..." : label}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl bg-background shadow-sm">
        <CardContent className="grid grid-cols-1 divide-y p-0 md:grid-cols-3 md:divide-x md:divide-y-0">
          <Metric
            label="Decision Confidence"
            value={`${confidenceScore}%`}
            helper="How safe it is to proceed"
          />

          <Metric
            label="Total Responses"
            value={`${totalVotes}`}
            helper="Votes collected so far"
          />

          <Metric
            label="Decision Risk"
            value={riskLevel}
            helper="Chance of disagreement"
          />
        </CardContent>
      </Card>
    </section>
  );
};

const Metric = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) => (
  <div className="px-4 py-5 text-center">
    <p className="text-2xl font-semibold tracking-tight">{value}</p>
    <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-1 text-[11px] leading-4 text-muted-foreground/80">
      {helper}
    </p>
  </div>
);

export default DecisionInsights;
