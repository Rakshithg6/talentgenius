
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "Dashboard loaded",
      description: "Welcome to your TalentGenius dashboard!",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Welcome to your TalentGenius dashboard. This is where you'll find all your resume analytics and job matching results.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card rounded-xl p-6 text-center">
              <h3 className="font-medium text-xl mb-3">Resumes Analyzed</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center">
              <h3 className="font-medium text-xl mb-3">Job Matches</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center">
              <h3 className="font-medium text-xl mb-3">Interview Questions</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="text-center py-16">
              <p className="text-muted-foreground">No recent activity to display.</p>
              <p className="text-muted-foreground mt-2">Upload your first resume to get started!</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
