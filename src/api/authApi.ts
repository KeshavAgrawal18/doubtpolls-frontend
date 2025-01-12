import { apiRequest, ApiResponse } from "./apiRequest";
import { handleError } from "@/utils/handleError";

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

// Define a specific type for the data in the API response
interface AuthResponseData {
  user?: {
    id: string;
    username: string;
    email: string;
  };
  token?: string;
}

// Register function
export const registerUser = async (
  userData: UserData
): Promise<ApiResponse<AuthResponseData> | undefined> => {
  try {
    return await apiRequest<AuthResponseData>(
      "/users/register",
      "POST",
      userData
    );
  } catch (error) {
    handleError(error as Error);
  }
};

// Login function
export const loginUser = async (
  credentials: Credentials
): Promise<ApiResponse<AuthResponseData> | undefined> => {
  try {
    return await apiRequest<AuthResponseData>(
      "/users/login",
      "POST",
      credentials
    );
  } catch (error) {
    handleError(error as Error);
  }
};
