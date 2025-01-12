// Define a generic interface for ApiResponse
export interface ApiResponse<T = any> {
  message?: string;
  success?: boolean;
  token?: string;
  data: T; // Allow data to be any type, defaulting to 'any'
}

// Update the apiRequest function to use the generic type
export const apiRequest = async <T = any>(
  endpoint: string,
  method: string,
  body?: object
): Promise<ApiResponse<T>> => {
  const apiUrl: string = import.meta.env.VITE_API_URL as string;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Retrieve auth token from localStorage if it exists
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      // Handle specific error cases based on the response from the backend
      if (result.message) {
        throw new Error(result.message);
      }
      throw new Error("Request failed. Please try again.");
    }

    return result;
  } catch (error) {
    console.error("Error in API request:", (error as Error).message);
    throw error; // Rethrow to handle specific errors in calling functions
  }
};
