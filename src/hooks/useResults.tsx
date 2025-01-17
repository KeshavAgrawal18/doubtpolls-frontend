import { useState } from "react";
import { fetchResultsByPoll, PollResult } from "@/api/resultApi";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

interface UseResultReturn {
  results: PollResult | null;
  isLoading: boolean;
  fetchResults: (pollId: string) => Promise<void>;
}

export const useResults = (): UseResultReturn => {
  const [results, setResults] = useState<PollResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const fetchResults = async (pollId: string) => {
    if (!isAuthenticated) {
      showToast("You must be authenticated to fetch results.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchResultsByPoll(pollId);
      if (response?.data) {
        setResults(response.data);
      } else {
        throw new Error("No data in response");
      }
    } catch (error: any) {
      console.error("Error fetching results:", error.message || error);
      showToast("Failed to load results. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    fetchResults,
  };
};
