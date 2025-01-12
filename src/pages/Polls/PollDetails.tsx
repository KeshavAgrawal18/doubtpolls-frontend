import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PollDetails.module.scss";
import { fetchPollById } from "@/api/pollApi";
import PollDetailsCard from "@/components/Poll/PollDetailsCard";

interface PollDetailsOption {
  id: string;
  label: string;
}

interface PollData {
  title?: string;
  options?: PollDetailsOption[];
  description?: string;
}

const PollDetails: React.FC = () => {
  // Extract `id` from the route parameters
  const { id } = useParams<{ id: string }>();

  // State to manage poll details
  const [poll, setPoll] = useState<PollData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoll = async () => {
      if (!id) return; // Ensure `id` exists
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPollById(id); // Fetch poll details
        if (!response?.data) throw Error;
        setPoll(response.data);
      } catch (err) {
        setError("Failed to fetch poll details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  // Render loading state
  if (isLoading) {
    return <div className={styles.poll}>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div className={styles.poll}>{error}</div>;
  }

  // Render poll details
  console.log({ poll });

  return (
    <PollDetailsCard
      title={poll?.title}
      description={poll?.description}
      options={poll?.options}
    />
  );
};

export default PollDetails;
