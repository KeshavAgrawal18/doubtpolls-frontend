import React from "react";
import styles from "./ProfileInfo.module.scss";

interface ProfileInfoProps {
  email?: string;
  username?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ email, username }) => {
  return (
    <div className={styles.profileInfo}>
      <div className={styles.profileHeader}>
        <p className={styles.username}>Username: {username}</p>
      </div>
      <p className={styles.email}>Email: {email}</p>
    </div>
  );
};

export default ProfileInfo;
