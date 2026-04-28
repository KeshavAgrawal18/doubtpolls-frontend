import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Send, Link2, Check } from "lucide-react";

interface SocialMediaShareProps {
  url: string;
  message?: string;
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({
  url,
  message,
}) => {
  const [copied, setCopied] = useState(false);

  const text = message || "Check out this decision!";

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${text} ${url}`,
    },
    {
      name: "Telegram",
      icon: Send,
      url: `https://telegram.me/share/url?url=${url}&text=${text}`,
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(
        "Check this out",
      )}&body=${encodeURIComponent(text + " " + url)}`,
    },
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Copy failed");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left: label */}
      <p className="text-sm text-muted-foreground">Share this decision</p>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Copy link (primary) */}
        <Button
          variant="default"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Copy Link
            </>
          )}
        </Button>

        {/* Other share icons */}
        {shareOptions.map((option) => {
          const Icon = option.icon;

          return (
            <Button
              key={option.name}
              variant="ghost"
              size="icon"
              onClick={() => handleShare(option.url)}
              className="h-8 w-8"
            >
              <Icon className="w-4 h-4" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMediaShare;
