import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const openQuestions = [
  "Who approved this?",
  "Why did we choose option B?",
  "Was everyone aligned?",
  "Where is the final decision?",
];

const useCases = [
  [
    "Product teams",
    "Choose what to build next, compare priorities, and keep the reasoning visible.",
  ],
  [
    "Design reviews",
    "Collect feedback on variants without turning every small choice into a meeting.",
  ],
  [
    "Engineering teams",
    "Decide on tradeoffs like build vs buy, refactor timing, or technical approaches.",
  ],
  [
    "Small teams",
    "Make hiring, planning, and process decisions without losing track of who agreed to what.",
  ],
];

const Product = () => {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-primary">
          DecisionFlow for teams
        </p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Stop making team decisions in scattered chats.
        </h1>

        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Give every decision a clear place to live — with context, options,
          votes, consensus, and a final outcome your team can come back to.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/register">Create a decision</Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link to="/login">Explore the product</Link>
          </Button>
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-3xl border bg-background p-3 shadow-sm md:p-4">
          <img
            src="/demo.png"
            alt="DecisionFlow decision page showing votes and consensus"
            className="w-full rounded-2xl border"
          />
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          A decision page with context, voting, consensus, and a saved outcome.
        </p>
      </section>

      <section className="mt-24 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="text-sm font-medium text-primary">The real problem</p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Most decisions do not fail because people disagree.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            They fail because context is in one place, opinions are in another,
            and the final call gets buried somewhere in chat. A week later, the
            team remembers the outcome but not the reason behind it.
          </p>
        </div>

        <div className="rounded-3xl border bg-muted/30 p-6">
          {openQuestions.map((question) => (
            <div
              key={question}
              className="border-b py-4 text-sm font-medium last:border-b-0"
            >
              {question}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 rounded-3xl border bg-background p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-muted/30 p-6">
            <p className="text-sm font-medium text-muted-foreground">Before</p>

            <h3 className="mt-3 text-xl font-semibold">
              Decision scattered across chat
            </h3>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>• Context shared in one long message</li>
              <li>• Votes collected through emoji reactions</li>
              <li>• Concerns mixed with unrelated replies</li>
              <li>• Final call made verbally or buried later</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-primary p-6 text-primary-foreground">
            <p className="text-sm font-medium text-primary-foreground/70">
              With DecisionFlow
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              One page for the full decision
            </h3>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-primary-foreground/85">
              <li>• Question, context, and options stay together</li>
              <li>• Votes are tied to clear choices</li>
              <li>• Consensus is visible before moving forward</li>
              <li>• Final outcome is saved as a decision record</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Where it fits</p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Useful when a decision is too important to disappear in chat.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            DecisionFlow is not for every small yes/no question. It is for
            decisions where context, alignment, and a visible record matter.
          </p>
        </div>

        <div className="mt-8 divide-y rounded-3xl border">
          {useCases.map(([title, description]) => (
            <div
              key={title}
              className="grid gap-3 p-6 md:grid-cols-[220px_1fr]"
            >
              <h3 className="font-semibold">{title}</h3>

              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 rounded-3xl border bg-muted/30 p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-medium text-primary">
              What makes it different
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              It treats decisions as records, not temporary polls.
            </h2>
          </div>

          <p className="leading-7 text-muted-foreground">
            A poll only tells you what people picked. DecisionFlow keeps the
            question, context, votes, alignment, and outcome together so the
            team can understand not just what was decided, but why it was
            decided.
          </p>
        </div>
      </section>

      <section className="mt-24 rounded-3xl border bg-primary px-8 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-semibold tracking-tight">
          Give your next team decision a proper home.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/80">
          Create the decision, share the link, collect input, and move forward
          with a clear record of what was decided.
        </p>

        <Button asChild size="lg" variant="secondary" className="mt-8">
          <Link to="/register">Create a decision</Link>
        </Button>
      </section>
    </main>
  );
};

export default Product;
