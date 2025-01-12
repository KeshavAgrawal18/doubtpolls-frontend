import { apiRequest, ApiResponse } from "./apiRequest";
import { handleError } from "../utils/handleError";
import { v4 as uuidv4 } from "uuid";

// Define the structure of a poll option
interface PollOption {
  id: string;
  label: string;
}

// Define the structure of the poll data in the API response
interface PollDetails {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  updatedAt: string;
}

// Define the structure of the data required for creating a poll
interface CreatePollDetails {
  title: string;
  description?: string;
  options: string[];
  expiresAt?: string;
}

// Define the structure of the data required for updating a poll
interface UpdatePollDetails {
  title?: string;
  description?: string;
  options?: PollOption[];
  expiresAt?: string;
}

// Create a new poll
export const createPoll = async (
  pollDetails: CreatePollDetails
): Promise<ApiResponse<PollDetails> | undefined> => {
  try {
    // Transform the options to include unique IDs
    const pollOptions = pollDetails.options.map((option) => ({
      label: option,
      id: uuidv4(),
    }));

    const updatedPollDetails = {
      ...pollDetails,
      options: pollOptions,
    };

    const response = await apiRequest<PollDetails>(
      "/polls",
      "POST",
      updatedPollDetails
    );
    console.log(response);
    return response;
  } catch (error) {
    handleError(error as Error);
  }
};

// Update an existing poll
export const updatePoll = async (
  pollId: string,
  pollUpdates: UpdatePollDetails
): Promise<ApiResponse<PollDetails> | undefined> => {
  try {
    return await apiRequest<PollDetails>(
      `/polls/${pollId}`,
      "PUT",
      pollUpdates
    );
  } catch (error) {
    handleError(error as Error);
  }
};

// Fetch a specific poll by ID
export const fetchPollById = async (
  pollId: string
): Promise<ApiResponse<PollDetails> | undefined> => {
  try {
    return await apiRequest<PollDetails>(`/polls/${pollId}`, "GET");
  } catch (error) {
    handleError(error as Error);
  }
};

// Delete a poll by ID
export const deletePoll = async (
  pollId: string
): Promise<ApiResponse<void> | undefined> => {
  try {
    return await apiRequest<void>(`/polls/${pollId}`, "DELETE");
  } catch (error) {
    handleError(error as Error);
  }
};

// Fetch all polls for a specific user
export const fetchPollsByUser = async (): Promise<
  ApiResponse<PollDetails[]> | undefined
> => {
  try {
    return await apiRequest<PollDetails[]>(`/polls/all`, "GET");
  } catch (error) {
    handleError(error as Error);
  }
};
