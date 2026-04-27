import React from "react";
import { Card } from "@/components/ui/card";
import SocialMediaShare from "@/components/common/SocialMediaShare";

interface PollShareCardProps {
  shareUrl: string;
}

const PollShareCard: React.FC<PollShareCardProps> = ({ shareUrl }) => {
  return (
    <Card className="p-4 flex justify-between items-center">
      <p className="text-sm text-muted-foreground">
        Invite others to contribute
      </p>
      <SocialMediaShare
        url={shareUrl}
        message="Join this decision and share your input"
      />
    </Card>
  );
};

export default PollShareCard;
