import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileCheck, Search, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { jobData, JobData } from "@/data/jobData";
import JobCard from "@/components/jobs/JobCard";
import JobSearch from "@/components/jobs/JobSearch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const fetchJobs = async (): Promise<JobData[]> => {
  return jobData;
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  
  useEffect(() => {
    if (jobs.length > 0) {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleApply = (jobId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to apply for jobs",
        variant: "destructive",
      });
      navigate("/login", { state: { userType: "candidate", directLogin: true } });
      return;
    }
    
    toast({
      title: "Application submitted",
      description: "Your application has been successfully submitted",
    });
    
    console.log(`Applied for job ${jobId}`);
  };
  
  const handleResumeBuilder = () => {
    if (!user) {
      navigate("/login", { state: { userType: "candidate", directLogin: true } });
      return;
    }
    navigate('/resume-builder');
  };
  
  const applicationStats = {
    applied: 4,
    interviews: 2,
    offers: 1,
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Dashboard</h1>
          <p className="text-muted-foreground">Find and apply for jobs that match your skills</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={handleResumeBuilder} className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Update Resume
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.applied}</div>
            <p className="text-sm text-muted-foreground">Jobs applied</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.interviews}</div>
            <p className="text-sm text-muted-foreground">Upcoming interviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-green-500" />
              Offers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.offers}</div>
            <p className="text-sm text-muted-foreground">Received offers</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold">Find Jobs</h2>
          <div className="flex items-center gap-2">
            <JobSearch searchTerm={searchQuery} onSearch={handleSearch} />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="text-center py-12">Loading jobs...</div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">Error loading jobs</div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No jobs found matching your search criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onApply={() => handleApply(job.id)} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommended" className="mt-0">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Personalized job recommendations coming soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-0">
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't saved any jobs yet</p>
            </div>
          </TabsContent>
          
          <TabsContent value="applied" className="mt-0">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your applied jobs will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
