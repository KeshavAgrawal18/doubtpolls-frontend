import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  onVote: () => void;
  onView: () => void;
}

const PriorityCard: React.FC<Props> = ({
  title,
  description,
  onVote,
  onView,
}) => {
  return (
    <Card className="p-6 rounded-2xl border bg-blue-50/60 dark:bg-blue-950/30 hover:shadow-md transition">
      {/* Top Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Status Badge */}
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 whitespace-nowrap">
          Pending
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span>Needs your vote</span>
        <span>Active</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button size="sm" className="flex-1" onClick={onVote}>
          Vote Now
        </Button>

        <Button size="sm" variant="ghost" onClick={onView}>
          View
        </Button>
      </div>
    </Card>
  );
};

export default PriorityCard;
