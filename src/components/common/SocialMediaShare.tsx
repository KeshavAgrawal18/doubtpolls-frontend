import React from "react";
import styles from "./SocialMediaShare.module.scss";

interface SocialMediaShareProps {
  url: string;
  message?: string;
}

const SocialMediaShare: React.FC<SocialMediaShareProps> = ({
  url,
  message,
}) => {
  const shareOptions = [
    {
      platform: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${
        message || "Check out this poll!"
      } ${url}`,
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    },
    {
      platform: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg",
    },
    {
      platform: "Email",
      url: `mailto:?subject=${encodeURIComponent(
        "Check out this poll!"
      )}&body=${encodeURIComponent(
        message || "I found this interesting poll. Check it out here: "
      )} ${url}`,
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    },
    {
      platform: "Telegram",
      url: `https://telegram.me/share/url?url=${url}&text=${
        message || "Check out this poll!"
      }`,
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    },
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <h3>Share this poll:</h3>
      <div className={styles.buttons}>
        {shareOptions.map((option) => (
          <button
            key={option.platform}
            onClick={() => handleShare(option.url)}
            className={styles.socialButton}
          >
            <img
              src={option.icon}
              alt={`${option.platform} icon`}
              className={styles.icon}
            />
            {option.platform}
          </button>
        ))}
      </div>
    </>
  );
};

export default SocialMediaShare;
