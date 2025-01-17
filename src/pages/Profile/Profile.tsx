import React, { useState } from "react";
import styles from "./Profile.module.scss";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import PollCard from "@/components/Poll/PollCard";
import VotesList from "@/components/Votes/VotesList";
import ConfirmModal from "@/components/common/Modal/ConfirmModal";
import { useAuth } from "@/contexts/AuthContext";
import { usePoll } from "@/contexts/PollContext";
import { useVotes } from "@/contexts/VotesContext";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { polls, isLoading: isPollsLoading, deletePoll } = usePoll();
  const { votes, isLoading: isVotesLoading } = useVotes();
  const navigate = useNavigate();

  const [modalState, setModalState] = useState({
    isOpen: false,
    pollToDelete: null as string | null,
  });

  const openModal = (pollId: string) =>
    setModalState({ isOpen: true, pollToDelete: pollId });

  const closeModal = () => setModalState({ isOpen: false, pollToDelete: null });

  const confirmDelete = () => {
    if (modalState.pollToDelete) {
      deletePoll(modalState.pollToDelete);
    }
    closeModal();
  };

  const handleNavigation = (path: string) => navigate(path);

  const renderPolls = () => {
    if (isPollsLoading)
      return <p className={styles.loadingMessage}>Loading your polls...</p>;
    if (!polls.length)
      return (
        <p className={styles.noPollsMessage}>
          You have no polls yet. Create one to get started!
        </p>
      );

    return (
      <div className={styles.pollsGrid}>
        {polls.map(({ id, title, description }) => (
          <PollCard
            key={id}
            id={id}
            title={title}
            description={description}
            onEdit={() => handleNavigation(`/polls/${id}/edit`)}
            onDelete={() => openModal(id)}
            onViewResults={() => handleNavigation(`/results/${id}`)}
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

      <section className={styles.votesSection}>
        <h2 className={styles.sectionTitle}>My Votes</h2>
        <VotesList votes={votes} isLoading={isVotesLoading} />
      </section>

      <ConfirmModal
        isModalOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Profile;
