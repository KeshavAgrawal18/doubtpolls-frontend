import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePoll } from "@/contexts/PollContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface PollOption {
  id: string;
  label: string;
}

const EditPoll: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { polls, updatePoll } = usePoll();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    options: [] as PollOption[],
  });

  // Populate formData based on id
  useEffect(() => {
    if (!id || !polls) return;

    const selected = polls.find((p: any) => String(p.id) === String(id));

    if (!selected) return;

    setFormData({
      title: selected.title || "",
      description: selected.description || "",
      options: (selected.options || []).map((opt: any, i: number) =>
        typeof opt === "string"
          ? { id: String(i), label: opt } // normalize
          : {
              id: opt.id ?? String(i),
              label: opt.label ?? "",
            },
      ),
    });
  }, [id, polls]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.options];
      updated[index] = { ...updated[index], label: value };
      return { ...prev, options: updated };
    });
  };

  const removeOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    updatePoll(id, formData);
    navigate(`/decisions/${id}`);
  };
  console.log("polls:", polls);
  console.log("id:", id);

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* LEFT: EDIT FORM */}
        <Card className="rounded-2xl shadow-sm border-neutral-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Edit Decision
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Update your question and options carefully.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Which tech stack should we use?"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">
                  Description (optional)
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Add context to help others decide"
                  className="resize-none"
                />
              </div>

              <Separator />

              {/* Options */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Options
                </p>

                {formData.options.map((option, index) => (
                  <div
                    key={option.id || index}
                    className="flex items-center gap-2"
                  >
                    <Input
                      value={option.label}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeOption(index)}
                      className="px-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                Editing options may affect existing votes.
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

                <Button className="shadow-sm hover:shadow-md transition">
                  Save Changes
                </Button>
              </div>
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
                {formData.title || "Your question will appear here"}
              </p>

              {formData.description && (
                <p className="text-sm text-muted-foreground">
                  {formData.description}
                </p>
              )}

              <div className="space-y-2">
                {formData.options
                  .filter((o) => o.label.trim() !== "")
                  .map((opt, i) => (
                    <div
                      key={i}
                      className="border rounded-lg px-3 py-2 text-sm bg-muted/40"
                    >
                      {opt.label}
                    </div>
                  ))}

                {formData.options.filter((o) => o.label.trim() !== "")
                  .length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Options will appear here
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-neutral-200">
            <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Info</p>
              <p>• Changes are saved when you click Save</p>
              <p>• Keep options clear and distinct</p>
              <p>• Avoid editing after votes begin</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditPoll;
