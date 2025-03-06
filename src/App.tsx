
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import JobPosting from "./pages/JobPosting";
import InterviewSchedule from "./pages/InterviewSchedule";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import ResumeBuilder from "./pages/ResumeBuilder";
import Chatbot from "./components/chat/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected candidate routes */}
            <Route path="/upload" element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <Upload />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/resume-builder" element={
              <ProtectedRoute allowedRoles={["candidate"]}>
                <ResumeBuilder />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Protected HR routes */}
            <Route path="/hr-dashboard" element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <HRDashboard />
              </ProtectedRoute>
            } />
            <Route path="/job-posting" element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <JobPosting />
              </ProtectedRoute>
            } />
            <Route path="/interview-schedule" element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <InterviewSchedule />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Global Chatbot */}
          <Chatbot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
