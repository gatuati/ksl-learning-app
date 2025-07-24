// components/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  // If no user or not an admin, redirect
  if (!user || !user.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  // Else render the protected admin component
  return children;
};

export default ProtectedAdminRoute;
