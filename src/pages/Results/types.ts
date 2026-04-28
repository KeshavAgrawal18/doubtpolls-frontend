export interface Option {
  optionId: string;
  label: string;
  votes: number;
}

export interface PollOption {
  id: string;
  label: string;
}

export interface Poll {
  title: string;
  description?: string;
  options: PollOption[];
}

// Insight System (UX Layer)
export type InsightTone = "neutral" | "info" | "warning" | "success";

export type InsightAction = "share" | "discuss" | "proceed" | "review";

export interface Insight {
  status: string; // "Split Decision"
  message: string; // user-facing explanation
  tone: InsightTone;
  action: InsightAction;
}

// Derived Data (Computed State)
export interface DerivedData {
  totalVotes: number;
  maxVotes: number;
  winningOptions: Option[];
  isTie: boolean;
  topPercentage: number;
  confidenceScore: number;
  riskLevel: "Low" | "Medium" | "High";
  insight: Insight;
}
