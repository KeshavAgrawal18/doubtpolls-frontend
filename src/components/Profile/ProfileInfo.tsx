import React from "react";
import styles from "./Profile.module.scss";

interface ProfileInfoProps {
  name: string;
  email: string;
  bio: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, email, bio }) => {
  return (
    <div className={styles.profileInfo}>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
    </div>
  );
};

export default ProfileInfo;
