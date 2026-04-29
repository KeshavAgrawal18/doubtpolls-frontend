import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-5xl font-semibold tracking-tight">404</h1>

        <h2 className="text-xl sm:text-2xl font-medium">Page not found</h2>

        <p className="text-muted-foreground text-sm sm:text-base">
          The page you're looking for doesn’t exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Button onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Back to home
          </Button>

          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
