import { getVotesByUser } from "@/api/votesApi";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@/contexts/AuthContext";

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

export const VotesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [votes, setVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If user not logged in → don’t call API
    if (!user) {
      setVotes([]);
      setIsLoading(false);
      return;
    }

    const fetchVotes = async () => {
      try {
        const res = await getVotesByUser();
        const data = res?.data ?? [];

        const mapped: Vote[] = data.map((item: any) => {
          const option = item.poll?.options?.find(
            (o: any) => o.id === item.optionId,
          );

          return {
            id: item.id,
            pollTitle: item.poll?.title ?? "",
            pollId: item.pollId,
            choice: option?.label ?? "Unknown",
          };
        });

        setVotes(mapped);
      } catch (err) {
        console.error("Failed to fetch votes", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotes();
  }, [user]);

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
