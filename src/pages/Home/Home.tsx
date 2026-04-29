import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [joinOpen, setJoinOpen] = useState(false);
  const [pollLink, setPollLink] = useState("");

  const handleCreatePoll = () => {
    if (!user) {
      navigate("/login?redirect=/polls/create");
      return;
    }

    navigate("/polls/create");
  };

  const handleJoinPoll = () => {
    const value = pollLink.trim();

    if (!value) return;

    try {
      const url = new URL(value);
      const pollId = url.pathname.split("/").filter(Boolean).pop();

      if (pollId) {
        navigate(`/polls/${pollId}`);
      }
    } catch {
      navigate(`/polls/${value}`);
    }
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-4xl space-y-12 text-center">
        {/* Hero */}
        <div className="mx-auto max-w-3xl space-y-5">
          <p className="text-sm font-medium text-muted-foreground">
            For teams that need a decision, not another meeting
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Make decisions without meetings
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
            Create a decision, share it with your team, and move forward with
            clear input from everyone.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={handleCreatePoll}>
            Start a Decision
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setJoinOpen((prev) => !prev)}
          >
            Join with Link
          </Button>
        </div>

        {/* Join input */}
        {joinOpen && (
          <div className="mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border bg-muted/30 p-4 sm:flex-row">
            <Input
              value={pollLink}
              onChange={(e) => setPollLink(e.target.value)}
              placeholder="Paste decision link or poll ID"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleJoinPoll();
              }}
            />

            <Button onClick={handleJoinPoll}>Join</Button>
          </div>
        )}

        {/* Flow */}
        <p className="text-sm text-muted-foreground">
          Create → Share → Vote → Decide
        </p>

        {/* Demo Card */}
        <div className="mx-auto max-w-2xl rounded-2xl border bg-background p-6 text-left shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-medium">
                Where should we host the next team offsite?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                20 teammates responded
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs">
              Needs discussion
            </span>
          </div>

          <div className="space-y-5 text-sm">
            <div>
              <div className="mb-2 flex justify-between">
                <span>🏝 Goa</span>
                <span>60%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[60%] rounded-full bg-foreground" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span>🏔 Manali</span>
                <span>40%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[40%] rounded-full bg-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border bg-muted/40 p-4">
            <p className="text-sm font-medium">Suggested next step</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Goa is ahead, but the vote is close. Discuss trade-offs before
              finalizing.
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <p className="text-sm text-muted-foreground">
          Built for decisions that need input, not another long discussion.
        </p>
      </section>
    </main>
  );
};

export default Home;
