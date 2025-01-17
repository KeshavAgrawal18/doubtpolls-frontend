import { useState, useEffect } from "react";
import { fetchPollById } from "@/api/pollApi";

interface PollDetailsOption {
  id: string;
  label: string;
}

interface PollData {
  title?: string;
  options?: PollDetailsOption[];
  description?: string;
}

interface UseFetchPollReturn {
  poll: PollData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetchPoll = (id: string | undefined): UseFetchPollReturn => {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoll = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchPollById(id);
      if (!response?.data) throw new Error();

      setPoll(response.data);
    } catch {
      setError("Failed to fetch poll details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

  return { poll, isLoading, error, refetch: fetchPoll };
};

export default useFetchPoll;
