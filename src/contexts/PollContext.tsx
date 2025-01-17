import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  createPoll,
  fetchPollsByUser,
  deletePoll as apiDeletePoll,
  updatePoll as apiUpdatePoll,
} from "@/api/pollApi";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

interface Poll {
  id: string;
  title: string;
  description?: string;
  options: { id: string; label: string }[];
}

interface PollContextProps {
  polls: Poll[];
  isLoading: boolean;
  addPoll: (poll: {
    title: string;
    description?: string;
    options: string[];
  }) => Promise<void>;
  updatePollVotes: (pollId: string, optionId: string) => void;
  deletePoll: (pollId: string) => Promise<void>;
  updatePoll: (pollId: string, updatedPoll: Partial<Poll>) => Promise<void>;
}

const PollContext = createContext<PollContextProps | undefined>(undefined);

export const PollProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { user } = useAuth();

  const ensureAuthenticated = () => {
    if (!user?.id) {
      return false;
    }
    return true;
  };

  const fetchUserPolls = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPollsByUser();
      setPolls(response?.data || []);
    } catch (error) {
      console.error("Error fetching user polls:", error);
      showToast("Failed to load polls. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!ensureAuthenticated()) return;

    fetchUserPolls();
  }, [user]);

  // Add a new poll
  const addPoll = async (poll: {
    title: string;
    description?: string;
    options: string[];
  }) => {
    if (!ensureAuthenticated()) return;

    setIsLoading(true);
    try {
      const response = await createPoll(poll);
      if (response?.data) {
        setPolls((prevPolls) => [...prevPolls, response.data]);
        showToast("Poll created successfully!", "success");
      } else {
        showToast("Failed to create poll. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      showToast("Failed to create poll. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePollVotes = (pollId: string, optionId: string) => {
    if (!ensureAuthenticated()) return;

    console.log({ pollId, optionId });
    showToast("Vote recorded successfully!", "info");
  };

  const deletePoll = async (pollId: string) => {
    if (!ensureAuthenticated()) return;

    setIsLoading(true);
    try {
      setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== pollId));
      apiDeletePoll(pollId);
      showToast("Poll deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting poll:", error);
      showToast("Failed to delete poll. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePoll = async (pollId: string, updatedPoll: Partial<Poll>) => {
    if (!ensureAuthenticated()) return;
    setIsLoading(true);
    try {
      const response = await apiUpdatePoll(pollId, updatedPoll);

      if (response?.success) {
        showToast("Poll updated successfully!", "success");
      } else {
        showToast("Failed to update poll. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating poll:", error);
      showToast("Failed to update poll. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PollContext.Provider
      value={{
        polls,
        isLoading,
        addPoll,
        updatePollVotes,
        deletePoll,
        updatePoll,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export const usePoll = (): PollContextProps => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error("usePoll must be used within a PollProvider");
  }
  return context;
};
