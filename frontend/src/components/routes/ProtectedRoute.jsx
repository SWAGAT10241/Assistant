import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../common/Spinner";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-950 flex flex-col items-center justify-center gap-4 text-white">
        <Spinner size="lg" />
        <p className="text-gray-400 text-sm">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If user has not configured their assistant yet, route them to customize
  const isCustomized = user.assistantImage && user.assistantName;
  if (!isCustomized && location.pathname !== "/customize" && location.pathname !== "/customize2") {
    return <Navigate to="/customize" replace />;
  }

  return children;
}

export default ProtectedRoute;
