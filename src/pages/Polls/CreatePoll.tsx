import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePoll } from "@/contexts/PollContext";
import Option from "@/components/Poll/Option";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

const CreatePoll: React.FC = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    options: [""],
  });

  const { addPoll, isLoading } = usePoll();
  const navigate = useNavigate();

  const handleInputChange = (
    field: string,
    value: string | string[],
    index?: number,
  ) => {
    setFormState((prev) => {
      if (field === "options" && index !== undefined) {
        const updated = [...prev.options];
        updated[index] = value as string;
        return { ...prev, options: updated };
      }
      return { ...prev, [field]: value };
    });
  };

  const modifyOptions = (action: "add" | "delete", index?: number) => {
    setFormState((prev) => {
      const updated =
        action === "add"
          ? [...prev.options, ""]
          : prev.options.filter((_, i) => i !== index);

      return { ...prev, options: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filtered = formState.options.filter((o) => o.trim() !== "");

    // minimal guard (no strict UX blocking)
    if (!formState.title.trim() || filtered.length === 0) return;

    // ✅ KEEP ORIGINAL LOGIC (string[])
    await addPoll({
      title: formState.title,
      description: formState.description,
      options: filtered,
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* LEFT: FORM */}
        <Card className="rounded-2xl shadow-sm border-neutral-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Create a Decision
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Frame a decision and gather input from your team
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <Input
                placeholder="e.g. Which database should we use for MVP?"
                value={formState.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                disabled={isLoading}
              />

              {/* Description */}
              <Textarea
                placeholder="Add context to help your team decide (optional)"
                value={formState.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                disabled={isLoading}
                className="resize-none"
              />

              {/* Options */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Options
                </p>

                {formState.options.map((option, index) => {
                  const isDuplicate =
                    formState.options.filter(
                      (o) =>
                        o.trim().toLowerCase() === option.trim().toLowerCase(),
                    ).length > 1;

                  return (
                    <Option
                      key={index}
                      value={option}
                      index={index}
                      onChange={(i, value) =>
                        handleInputChange("options", value, i)
                      }
                      onDelete={(i) => modifyOptions("delete", i)}
                      canDelete={formState.options.length > 1}
                      isDisabled={isLoading}
                    />
                  );
                })}

                {/* Soft guidance */}
                {formState.options.length < 2 && (
                  <p className="text-xs text-amber-500">
                    Add at least 2 options to compare outcomes
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  Clear and distinct options lead to better decisions
                </p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => modifyOptions("add")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full shadow-sm hover:shadow-md transition"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Start Decision
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT: PREVIEW */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-neutral-200">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="font-medium">
                {formState.title || "Your decision will appear here"}
              </p>

              {formState.description && (
                <p className="text-sm text-muted-foreground">
                  {formState.description}
                </p>
              )}

              <div className="space-y-2">
                {formState.options
                  .filter((o) => o.trim() !== "")
                  .map((opt, i) => (
                    <div
                      key={i}
                      className="border rounded-lg px-3 py-2 text-sm bg-muted/40 hover:bg-muted transition cursor-pointer"
                    >
                      {opt}
                    </div>
                  ))}

                {formState.options.filter((o) => o.trim() !== "").length ===
                  0 && (
                  <p className="text-sm text-muted-foreground">
                    Add options to shape the decision
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="rounded-2xl border-neutral-200">
            <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Tips</p>
              <ul className="space-y-1 list-disc ml-4">
                <li>Keep your question clear and specific</li>
                <li>Limit options to 2–5 choices</li>
                <li>Avoid overlapping answers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
