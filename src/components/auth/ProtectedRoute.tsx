
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

const ProtectedRoute = ({ children, allowedRoles = ["hr", "candidate"] }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if authenticated but wrong role
    return <Navigate to={user.role === "hr" ? "/hr-dashboard" : "/dashboard"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
