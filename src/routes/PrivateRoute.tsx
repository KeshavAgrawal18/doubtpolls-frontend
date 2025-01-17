import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
  );
};

export default PrivateRoutes;
