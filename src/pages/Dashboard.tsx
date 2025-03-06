
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";
import JobSearch from "@/components/jobs/JobSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Building, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock job data
const jobListings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp",
    location: "Bangalore, India",
    type: "Full-time",
    postedAt: "2 days ago",
    skills: ["React", "Node.js", "TypeScript"],
    salary: "₹15L - ₹25L"
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "WebInnovate",
    location: "Bangalore, India (Remote)",
    type: "Full-time",
    postedAt: "1 week ago",
    skills: ["JavaScript", "React", "CSS"],
    salary: "₹12L - ₹18L"
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Bangalore, India",
    type: "Contract",
    postedAt: "3 days ago",
    skills: ["Java", "Spring Boot", "MySQL"],
    salary: "₹18L - ₹30L"
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "AppWorks",
    location: "Bangalore, India (Hybrid)",
    type: "Full-time",
    postedAt: "Just now",
    skills: ["React", "Node.js", "MongoDB"],
    salary: "₹20L - ₹35L"
  }
];

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobListings);

  React.useEffect(() => {
    toast({
      title: "Dashboard loaded",
      description: "Welcome to your TalentGenius dashboard!",
    });
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredJobs(jobListings);
      return;
    }
    
    const filtered = jobListings.filter(job => {
      const lowerQuery = query.toLowerCase();
      return (
        job.title.toLowerCase().includes(lowerQuery) ||
        job.company.toLowerCase().includes(lowerQuery) ||
        job.location.toLowerCase().includes(lowerQuery) ||
        job.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
      );
    });
    
    setFilteredJobs(filtered);
  };

  // Handle apply to job
  const handleApply = (jobId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in or sign up to apply for jobs.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Application submitted",
      description: "Your application has been sent to the employer.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {user ? "Your Dashboard" : "Job Search"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {user 
                ? "Find opportunities that match your skills and experience." 
                : "Discover job opportunities in your field."}
            </p>
            
            <JobSearch 
              className="mb-12" 
              onSearch={handleSearch}
              defaultValue={searchQuery}
            />
          </div>
          
          {user && (
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
          )}
          
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>
                  {searchQuery 
                    ? `Jobs matching "${searchQuery}"`
                    : "Recent Job Listings"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredJobs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="border p-6 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                              <div className="flex items-center text-muted-foreground">
                                <Building className="h-4 w-4 mr-1" />
                                {job.company}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {job.type}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {job.postedAt}
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="font-medium">Skills:</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {job.skills.map((skill, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="mt-3 text-sm font-medium">Salary: {job.salary}</p>
                          </div>
                          
                          <div className="md:self-center">
                            <Button onClick={() => handleApply(job.id)}>
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No jobs found matching your search criteria.</p>
                    <Button variant="outline" className="mt-4" onClick={() => handleSearch("")}>
                      View All Jobs
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {user && (
            <div className="glass-card rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="text-center py-16">
                <p className="text-muted-foreground">No recent activity to display.</p>
                <p className="text-muted-foreground mt-2">Upload your first resume to get started!</p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
