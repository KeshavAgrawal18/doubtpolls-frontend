import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PollDetailsCardProps {
  title?: string;
  description?: string;
  options?: { id: string; label: string; votes?: number }[];
  onVote?: (optionId: string) => void;
  isVotingDisabled: boolean;
}

const PollDetailsCard: React.FC<PollDetailsCardProps> = ({
  title,
  description,
  options,
  onVote,
  isVotingDisabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = () => {
    if (selectedOption && onVote) {
      onVote(selectedOption);
    }
  };

  return (
    <Card className="w-full rounded-2xl shadow-sm border-neutral-200 p-6 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        {title && (
          <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
        )}

        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
      </div>

      {/* Options */}
      {options && (
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedOption === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedOption(option.id)}
                disabled={isVotingDisabled}
                className={`
                  w-full text-left px-4 py-3 rounded-xl border transition
                  ${
                    isSelected
                      ? "border-black bg-neutral-100"
                      : "border-neutral-200 hover:bg-neutral-50"
                  }
                  disabled:opacity-50
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Radio indicator */}
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center
                    ${isSelected ? "border-black" : "border-neutral-300"}`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </div>

                  <span className="text-sm text-neutral-800">
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Vote button */}
          <Button
            onClick={handleVote}
            disabled={!selectedOption || isVotingDisabled}
            className="w-full mt-4"
          >
            {isVotingDisabled ? "Already Voted" : "Submit Vote"}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PollDetailsCard;
