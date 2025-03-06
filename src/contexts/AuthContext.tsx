
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// User types
export type UserRole = "hr" | "candidate" | null;

type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string, provider?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("talentGenius_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Determine user role based on email domain
  const determineUserRole = (email: string): UserRole => {
    // Company domains typically end with company name
    // This is a simple check - in production, you'd have a list of allowed company domains
    const isCompanyEmail = !email.endsWith("@gmail.com") && 
                            !email.endsWith("@yahoo.com") && 
                            !email.endsWith("@hotmail.com") &&
                            !email.endsWith("@outlook.com") &&
                            email.includes("@");
                            
    return isCompanyEmail ? "hr" : "candidate";
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to verify credentials
      const role = determineUserRole(email);
      
      // Create mock user
      const mockUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0], // Just a placeholder
        role
      };
      
      setUser(mockUser);
      localStorage.setItem("talentGenius_user", JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      
      // Redirect based on role
      navigate(role === "hr" ? "/hr-dashboard" : "/dashboard");
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, name: string, password: string, provider?: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine role based on email domain
      const role = determineUserRole(email);
      
      // For HR users, require company email
      if (provider !== "google" && provider !== "linkedin" && role === "hr") {
        const isCompanyEmail = !email.endsWith("@gmail.com") && 
                               !email.endsWith("@yahoo.com") && 
                               !email.endsWith("@hotmail.com") &&
                               !email.endsWith("@outlook.com") &&
                               email.includes("@");
        
        if (!isCompanyEmail) {
          throw new Error("HR users must use a company email address");
        }
      }
      
      // Create mock user
      const mockUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem("talentGenius_user", JSON.stringify(mockUser));
      
      toast({
        title: "Account created",
        description: `Welcome to TalentGenius, ${name}!`,
      });
      
      // Redirect based on role
      navigate(role === "hr" ? "/hr-dashboard" : "/dashboard");
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Please check your information and try again.";
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("talentGenius_user");
    navigate("/");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
