import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Pencil, Trash2 } from "lucide-react";

interface PollCardProps {
  id: string;
  title: string;
  description?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewResults?: (id: string) => void;
}

const PollCard: React.FC<PollCardProps> = ({
  id,
  title,
  description,
  onEdit,
  onDelete,
  onViewResults,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/polls/${id}`)}
      className="cursor-pointer rounded-2xl border-neutral-200 shadow-sm hover:shadow-md transition p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-neutral-900">{title}</h3>

          {description && (
            <p className="text-sm text-neutral-500 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Optional menu-style actions */}
        <div className="flex items-center gap-1 shrink-0">
          {onViewResults && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onViewResults(id);
              }}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          )}

          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          )}

          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          )}
        </div>
      </div>

      {/* Footer hint */}
      <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
        <span>Click to open decision</span>
        <span>Active</span>
      </div>
    </Card>
  );
};

export default PollCard;
