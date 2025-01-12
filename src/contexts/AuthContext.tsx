import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/api/authApi";
import { useToast } from "./ToastContext";

// Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  register: (user: User) => void;
  login: (credentials: Credential) => void;
  logout: () => void;
}

interface User {
  id?: string;
  email: string;
  password: string;
  username: string;
}

interface Credential {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Helper function to handle errors
  const handleErrors = (
    error: Error,
    defaultMessage: string,
    customMessages: Record<string, string>
  ) => {
    const errorMessage = error.message;
    for (const key in customMessages) {
      if (errorMessage.includes(key)) {
        showToast(customMessages[key], "error");
        return;
      }
    }
    showToast(defaultMessage, "error");
  };

  // Load user info from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Common logic for updating auth state
  const updateAuthState = (loggedInUser?: User, authToken?: string) => {
    if (!loggedInUser || !authToken) {
      showToast("Failed to authenticate. Please try again.", "error");
      return;
    }
    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("authToken", authToken);
    showToast("Login successful!", "success");
    navigate("/");
  };

  const register = async (user: User) => {
    try {
      const response = await registerUser(user);
      if (response?.success) {
        showToast("User registered successfully!", "success");
        showToast("Please Login to Continue", "info");
        navigate("/");
      } else {
        showToast(response?.message || "Registration failed.", "error");
      }
    } catch (error) {
      handleErrors(
        error as Error,
        "An unexpected error occurred during registration. Please try again.",
        {
          email: "Invalid email format or email already in use.",
          username: "Username already exists. Please choose another.",
          password:
            "Password must meet the required criteria. Please try again.",
        }
      );
    }
  };

  const login = async (credentials: Credential) => {
    try {
      const response = await loginUser(credentials);
      updateAuthState(
        response?.data?.user as User | undefined,
        response?.data?.token
      );
    } catch (error) {
      handleErrors(
        error as Error,
        "An unexpected error occurred during login. Please try again.",
        {
          email: "Invalid email or email not registered.",
          password: "Incorrect password. Please try again.",
        }
      );
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    showToast("Logged out successfully.", "info");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
