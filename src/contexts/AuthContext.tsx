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
  signup: (email: string, name: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  validateEmail: (email: string, forRole?: UserRole) => { valid: boolean; message?: string };
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

  // Personal email domains that are not allowed for HR professionals
  const personalEmailDomains = [
    "@gmail.com", 
    "@yahoo.com", 
    "@hotmail.com", 
    "@outlook.com",
    "@aol.com",
    "@icloud.com",
    "@me.com",
    "@mail.com",
    "@protonmail.com",
    "@zoho.com"
  ];

  // Determine if email is a company email
  const isCompanyEmail = (email: string): boolean => {
    return !personalEmailDomains.some(domain => email.toLowerCase().endsWith(domain)) && email.includes("@");
  };

  // Determine user role based on email domain
  const determineUserRole = (email: string): UserRole => {
    return isCompanyEmail(email) ? "hr" : "candidate";
  };

  // Email validation function
  const validateEmail = (email: string, forRole?: UserRole): { valid: boolean; message?: string } => {
    if (!email || !email.includes('@')) {
      return { valid: false, message: "Please enter a valid email address" };
    }

    // If role is explicitly HR, validate it's a company email
    if (forRole === "hr") {
      if (!isCompanyEmail(email)) {
        return { 
          valid: false, 
          message: "HR professionals must use a company email (not gmail, yahoo, outlook, etc.)" 
        };
      }
    }

    return { valid: true };
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Check if the email is valid
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        throw new Error(emailValidation.message);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine role based on email domain
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
      if (role === "hr") {
        navigate("/hr-dashboard");
      } else if (role === "candidate") {
        navigate("/dashboard");
      }
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, name: string, password: string, role?: UserRole) => {
    setIsLoading(true);
    
    try {
      // Validate the email based on role or determined role
      const determineRole = role || determineUserRole(email);
      const emailValidation = validateEmail(email, determineRole);
      
      if (!emailValidation.valid) {
        throw new Error(emailValidation.message);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For HR users, require company email
      if (determineRole === "hr" && !isCompanyEmail(email)) {
        throw new Error("HR professionals must use a company email address");
      }
      
      // Create mock user
      const mockUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: determineRole
      };
      
      setUser(mockUser);
      localStorage.setItem("talentGenius_user", JSON.stringify(mockUser));
      
      toast({
        title: "Account created",
        description: `Welcome to TalentGenius, ${name}!`,
      });
      
      // Redirect based on role
      if (determineRole === "hr") {
        navigate("/hr-dashboard");
      } else if (determineRole === "candidate") {
        navigate("/dashboard");
      }
      
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
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, validateEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
