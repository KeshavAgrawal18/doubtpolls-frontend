import React from "react";
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Profile</h1>
      <p className={styles.description}>
        Manage your personal information and account settings here.
      </p>
    </div>
  );
};

export default Profile;
