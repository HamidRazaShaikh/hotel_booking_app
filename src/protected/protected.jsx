import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }

  return children;
};
