// Assuming userData and credentials are objects with specific fields
interface UserData {
  username: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface ApiResponse {
  message?: string;
  success?: boolean;
  token?: string;
  data?: {
    user?: {
      id: string;
      username: string;
      email: string;
    };
    token?: string;
  };
}

const apiUrl: string = import.meta.env.VITE_API_URL as string;

// Register function
export const registerUser = async (
  userData: UserData
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      // Handle specific error cases based on the response from the backend
      if (result.message) {
        throw new Error(result.message);
      }
      throw new Error("Registration failed. Please try again.");
    }

    return result;
  } catch (error) {
    console.error("Error registering user:", (error as Error).message);

    // Provide user-friendly error messages
    if ((error as Error).message.includes("email")) {
      throw new Error("Invalid email format or email already in use.");
    } else if ((error as Error).message.includes("username")) {
      throw new Error("Username already exists. Please choose another.");
    } else if ((error as Error).message.includes("password")) {
      throw new Error(
        "Password must meet the required criteria. Please try again."
      );
    } else {
      throw error; // For other generic errors
    }
  }
};

// Login function
export const loginUser = async (
  credentials: Credentials
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      // Handle specific error cases based on the response from the backend
      if (result.message) {
        throw new Error(result.message);
      }
      throw new Error("Login failed. Please try again.");
    }

    return result;
  } catch (error) {
    console.error("Error logging in:", (error as Error).message);

    // Provide user-friendly error messages
    if ((error as Error).message.includes("email")) {
      throw new Error("Invalid email or email not registered.");
    } else if ((error as Error).message.includes("password")) {
      throw new Error("Incorrect password. Please try again.");
    } else {
      throw error; // For other generic errors
    }
  }
};
