import { handleError } from "@/utils/handleError";
import { apiRequest, ApiResponse } from "./apiRequest";

// Cast a vote for a specific poll option
export const castVote = async (
  pollId: string,
  optionId: string
): Promise<ApiResponse<void> | undefined> => {
  try {
    const voteDetails = {
      pollId,
      optionId,
    };

    return await apiRequest<void>(`/voting`, "POST", voteDetails);
  } catch (error) {
    handleError(error as Error);
  }
};

// Fetch votes cast by a specific user
export const getVotesByUser = async (): Promise<
  | ApiResponse<
      Array<{
        pollId: string;
        optionId: string;
        title: string;
        options: string[];
      }>
    >
  | undefined
> => {
  try {
    return await apiRequest<
      Array<{
        pollId: string;
        optionId: string;
        title: string;
        options: string[];
      }>
    >(`/voting/user`, "GET");
  } catch (error) {
    handleError(error as Error);
  }
};
