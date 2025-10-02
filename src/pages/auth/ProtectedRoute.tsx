import React from "react";
import { Navigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-56px)]">
        {" "}
        <FiLoader className="w-6 h-6 text-coal animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
