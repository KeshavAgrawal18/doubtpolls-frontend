import React from "react";
import styles from "./Profile.module.scss";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import PollCard from "@/components/Poll/PollCard";
import { useAuth } from "@/contexts/AuthContext";
import { usePoll } from "@/contexts/PollContext";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { polls, isLoading } = usePoll();

  const renderPolls = () => {
    if (isLoading) {
      return <p className={styles.loadingMessage}>Loading your polls...</p>;
    }

    if (polls.length === 0) {
      return (
        <p className={styles.noPollsMessage}>
          You have no polls yet. Create one to get started!
        </p>
      );
    }

    return (
      <div className={styles.pollsGrid}>
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            id={poll.id}
            title={poll.title}
            description={poll.description}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Profile</h1>
      <ProfileInfo email={user?.email} username={user?.username} />

      <section className={styles.pollsSection}>
        <h2 className={styles.sectionTitle}>My Polls</h2>
        {renderPolls()}
      </section>
    </div>
  );
};

export default Profile;
