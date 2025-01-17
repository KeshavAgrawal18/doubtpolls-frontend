import { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define custom styles for different toast types
const baseToastStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "'Roboto', sans-serif",
};

const successStyle = {
  backgroundColor: "#4caf50", // Green for success
  color: "#fff",
  ...baseToastStyle,
};

const errorStyle = {
  backgroundColor: "#f44336", // Red for error
  color: "#fff",
  ...baseToastStyle,
};

const infoStyle = {
  backgroundColor: "#2196f3", // Blue for info
  color: "#fff",
  ...baseToastStyle,
};

const warningStyle = {
  backgroundColor: "#ff9800", // Orange for warning
  color: "#fff",
  ...baseToastStyle,
};

type ToastContextType = {
  showToast: (
    message: string,
    type: "success" | "error" | "info" | "warning",
    options?: ToastOptions
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning",
    options?: ToastOptions
  ) => {
    let style;

    // Set style based on toast type
    switch (type) {
      case "success":
        style = successStyle;
        break;
      case "error":
        style = errorStyle;
        break;
      case "info":
        style = infoStyle;
        break;
      case "warning":
        style = warningStyle;
        break;
      default:
        style = baseToastStyle;
    }

    // Show the toast with the appropriate style
    toast(message, { ...options, style: { ...style, ...options?.style } });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        closeButton={false}
        rtl={false}
        theme="dark"
        limit={2}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
