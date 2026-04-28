import { Card } from "@/components/ui/card";

interface Props {
  label: string;
  value: string | number;
  hint?: string;
}

const StatsCard: React.FC<Props> = ({ label, value, hint }) => {
  return (
    <Card className="p-5 rounded-2xl border bg-muted/40 hover:bg-muted/60 transition">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </Card>
  );
};

export default StatsCard;
