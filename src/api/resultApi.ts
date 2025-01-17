import { handleError } from "@/utils/handleError";
import { apiRequest, ApiResponse } from "./apiRequest";

// Define the result type
export type PollResult = {
  pollId: string;
  title: string;
  options: Array<{
    optionId: string;
    label: string;
    votes: number;
  }>;
};

// Fetch poll results for a specific poll
export const fetchResultsByPoll = async (
  pollId: string
): Promise<ApiResponse<PollResult> | undefined> => {
  try {
    return await apiRequest<PollResult>(`/polls/${pollId}/results`, "GET");
  } catch (error) {
    handleError(error as Error);
  }
};
