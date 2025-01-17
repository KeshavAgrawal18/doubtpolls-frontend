import { getVotesByUser } from "@/api/votesApi";
import { createContext, useContext, useState, useEffect } from "react";

interface Vote {
  id: string;
  pollTitle: string;
  pollId: string;
  choice: string;
}

interface VotesContextValue {
  votes: Vote[];
  isLoading: boolean;
}

const VotesContext = createContext<VotesContextValue | undefined>(undefined);

export const VotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch votes from the API
    const fetchVotes = async () => {
      try {
        const response = await getVotesByUser();

        const data = response?.data;
        if (!data) return [];
        const mappedVotes = data.map((item: any) => {
          const selectedOption = item.poll.options.find(
            (option: any) => option.id === item.optionId
          );

          return {
            id: item.id,
            pollTitle: item.poll.title,
            pollId: item.pollId,
            choice: selectedOption ? selectedOption.label : "Unknown Choice", // Use the label or fallback
          };
        });
        setVotes(mappedVotes);
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();
  }, []);

  return (
    <VotesContext.Provider value={{ votes, isLoading }}>
      {children}
    </VotesContext.Provider>
  );
};

export const useVotes = () => {
  const context = useContext(VotesContext);
  if (!context) {
    throw new Error("useVotes must be used within a VotesProvider");
  }
  return context;
};
