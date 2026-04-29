import { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning";

type ToastContextType = {
  showToast: (
    message: string,
    type?: ToastType,
    options?: ToastOptions,
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const variantStyles: Record<ToastType, string> = {
  success:
    "border-green-500/40 text-foreground ring-1 ring-black/5 dark:ring-white/10",
  error:
    "border-red-500/40 text-foreground ring-1 ring-black/5 dark:ring-white/10",
  info: "border-blue-500/40 text-foreground ring-1 ring-black/5 dark:ring-white/10",
  warning:
    "border-yellow-500/40 text-foreground ring-1 ring-black/5 dark:ring-white/10",
};

const iconMap: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="text-green-500" size={18} />,
  error: <AlertCircle className="text-red-500" size={18} />,
  info: <Info className="text-blue-500" size={18} />,
  warning: <AlertTriangle className="text-yellow-500" size={18} />,
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = (
    message: string,
    type: ToastType = "info",
    options?: ToastOptions,
  ) => {
    toast(
      <div className="flex items-center gap-3">
        {iconMap[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>,
      {
        ...options,
        className: [
          "rounded-lg border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-md",
          variantStyles[type],
          options?.className,
        ]
          .filter(Boolean)
          .join(" "),
      },
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeButton={false}
        toastClassName="!p-0 !bg-transparent !shadow-none"
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
