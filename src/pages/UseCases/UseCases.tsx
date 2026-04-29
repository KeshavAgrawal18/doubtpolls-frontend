import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type UseCase = {
  title: string;
  description: string;
  points: string[];
};

const useCases: UseCase[] = [
  {
    title: "Product teams",
    description:
      "Decide what to build next without losing the reasoning behind the choice.",
    points: [
      "Prioritize roadmap items",
      "Compare feature tradeoffs",
      "Record stakeholder input",
    ],
  },
  {
    title: "Engineering teams",
    description:
      "Make technical calls with enough context for the team to understand the tradeoff.",
    points: [
      "Choose an approach",
      "Discuss architecture options",
      "Decide refactor timing",
    ],
  },
  {
    title: "Startups",
    description:
      "Move fast without making important decisions invisible or forgotten.",
    points: ["Founder alignment", "Hiring decisions", "Go-to-market choices"],
  },
  {
    title: "Student groups",
    description:
      "Keep group decisions clear when everyone has a different opinion.",
    points: ["Project topics", "Meeting times", "Event planning"],
  },
];

const UseCases = () => {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-primary">Use cases</p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          For decisions that should not disappear in chat.
        </h1>

        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          DecisionFlow is useful when the team needs more than a quick yes or no
          — when context, alignment, and the final outcome need to stay visible.
        </p>
      </section>

      {/* Use case list (non-generic, human layout) */}
      <section className="mt-20 rounded-3xl border">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="grid gap-6 border-b p-6 last:border-b-0 md:grid-cols-[240px_1fr]"
          >
            <div>
              <h2 className="text-xl font-semibold">{useCase.title}</h2>
            </div>

            <div>
              <p className="leading-7 text-muted-foreground">
                {useCase.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {useCase.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border bg-muted/40 px-3 py-1 text-sm text-muted-foreground"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Philosophy section */}
      <section className="mt-20 grid gap-8 rounded-3xl border bg-muted/30 p-8 md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div>
          <p className="text-sm font-medium text-primary">A simple rule</p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Use it when the reason matters as much as the result.
          </h2>
        </div>

        <p className="leading-7 text-muted-foreground">
          A normal poll tells you what people picked. DecisionFlow keeps the
          question, context, options, votes, and final outcome together — so the
          team understands not just what was decided, but why it was decided.
        </p>
      </section>

      {/* Final CTA */}
      <section className="mt-20 rounded-3xl border bg-primary px-8 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-semibold tracking-tight">
          Start with one decision your team keeps revisiting.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/80">
          Put the context, options, votes, and outcome in one place — then move
          forward without repeating the same conversation.
        </p>

        <Button asChild size="lg" variant="secondary" className="mt-8">
          <Link to="/register">Create a decision</Link>
        </Button>
      </section>
    </main>
  );
};

export default UseCases;
