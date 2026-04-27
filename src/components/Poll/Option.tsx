import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface OptionProps {
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  canDelete: boolean;
  isDisabled?: boolean;
  className?: string;
}

const Option: React.FC<OptionProps> = ({
  value,
  index,
  onChange,
  onDelete,
  canDelete,
  isDisabled,
  className = "",
}) => {
  return (
    <div className="flex items-center gap-2 group">
      {/* Input */}
      <Input
        type="text"
        value={value}
        placeholder={`Option ${index + 1}`}
        disabled={isDisabled}
        onChange={(e) => onChange(index, e.target.value)}
        className={`
          flex-1 rounded-xl border transition
          focus-visible:ring-1 focus-visible:ring-neutral-400
          ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}
          ${className}
        `}
      />

      {/* Delete */}
      {canDelete && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onDelete(index)}
          disabled={isDisabled}
          className="
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          <X className="w-4 h-4 text-neutral-400 hover:text-red-500" />
        </Button>
      )}
    </div>
  );
};

export default Option;
