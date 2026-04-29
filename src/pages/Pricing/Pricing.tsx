import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For individuals and small experiments.",
    features: [
      "Up to 5 decisions",
      "Basic voting",
      "Basic decision insights",
      "Shareable decision links",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499",
    description: "For growing teams that make decisions regularly.",
    features: [
      "Unlimited decisions",
      "Consensus insights",
      "Smart recommendations",
      "Team collaboration",
      "Decision history",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "Custom",
    description: "For teams that need advanced control and workflows.",
    features: [
      "Everything in Pro",
      "Admin controls",
      "Team analytics",
      "Workspace management",
      "Priority support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-primary">Pricing</p>

        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Simple pricing for better decisions.
        </h1>

        <p className="mt-5 text-lg text-muted-foreground">
          Start free, upgrade when your team needs more decisions, insights, and
          collaboration.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`rounded-2xl ${
              plan.highlighted ? "border-primary shadow-lg" : ""
            }`}
          >
            <CardContent className="flex h-full flex-col p-6">
              {plan.highlighted && (
                <div className="mb-4 w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}

              <h2 className="text-xl font-semibold">{plan.name}</h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {plan.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-semibold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / month
                  </span>
                )}
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="mt-8"
                variant={plan.highlighted ? "default" : "outline"}
              >
                <Link to="/register">{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Pricing page is currently for product demonstration. Payments can be
        integrated later with Stripe or Razorpay.
      </p>
    </main>
  );
};

export default Pricing;
