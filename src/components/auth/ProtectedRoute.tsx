
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

const ProtectedRoute = ({ children, allowedRoles = ["hr", "candidate"] }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If user doesn't have permission for this route, redirect to appropriate dashboard
  if (user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "hr" ? "/hr-dashboard" : "/dashboard"} replace />;
  }

  // If user is authorized, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
