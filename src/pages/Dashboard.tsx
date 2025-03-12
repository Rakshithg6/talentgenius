
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileCheck, Search, Filter, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { jobData, JobData } from "@/data/jobData";
import JobCard from "@/components/jobs/JobCard";
import JobSearch from "@/components/jobs/JobSearch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const fetchJobs = async (): Promise<JobData[]> => {
  return jobData;
};

// Application type definition
interface Application {
  id: string;
  jobId: string;
  company: string;
  position: string;
  appliedDate: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  interviewDate?: string;
  interviewTime?: string;
  interviewer?: string;
  offerDetails?: string;
  offerAmount?: string;
  offerDeadline?: string;
}

// Mock application data
const mockApplications: Application[] = [
  {
    id: 'app1',
    jobId: 'job1',
    company: 'TechCorp Solutions',
    position: 'Senior Frontend Developer',
    appliedDate: '2025-02-15',
    status: 'applied',
  },
  {
    id: 'app2',
    jobId: 'job2',
    company: 'Innovative Systems',
    position: 'UX/UI Designer',
    appliedDate: '2025-02-18',
    status: 'applied',
  },
  {
    id: 'app3',
    jobId: 'job3',
    company: 'Global Tech Enterprises',
    position: 'Full Stack Developer',
    appliedDate: '2025-01-25',
    status: 'interview',
    interviewDate: '2025-03-15',
    interviewTime: '14:00',
    interviewer: 'Sarah Johnson'
  },
  {
    id: 'app4',
    jobId: 'job4',
    company: 'Future Innovations',
    position: 'Product Manager',
    appliedDate: '2025-01-10',
    status: 'interview',
    interviewDate: '2025-03-18',
    interviewTime: '10:30',
    interviewer: 'Michael Chen'
  },
  {
    id: 'app5',
    jobId: 'job5',
    company: 'Tech Solutions Inc.',
    position: 'DevOps Engineer',
    appliedDate: '2025-01-05',
    status: 'offer',
    offerDetails: 'Full-time position with remote work options',
    offerAmount: '$120,000/year',
    offerDeadline: '2025-03-25'
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [detailsType, setDetailsType] = useState<'applications' | 'interviews' | 'offers'>('applications');
  
  // Check if user is logged in and is a candidate
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { userType: "candidate", directLogin: true } });
    } else if (user.role !== "candidate") {
      navigate("/hr-dashboard");
    }
  }, [user, navigate]);
  
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
  
  // Filter applications by status
  const applications = mockApplications.filter(app => app.status === 'applied');
  const interviews = mockApplications.filter(app => app.status === 'interview');
  const offers = mockApplications.filter(app => app.status === 'offer');
  
  // Show details dialog for applications, interviews, or offers
  const showDetails = (type: 'applications' | 'interviews' | 'offers') => {
    setDetailsType(type);
    setShowDetailsDialog(true);
  };
  
  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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
        <Card 
          className="cursor-pointer transition-all hover:shadow-md" 
          onClick={() => showDetails('applications')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-sm text-muted-foreground">Jobs applied</p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer transition-all hover:shadow-md" 
          onClick={() => showDetails('interviews')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviews.length}</div>
            <p className="text-sm text-muted-foreground">Upcoming interviews</p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer transition-all hover:shadow-md" 
          onClick={() => showDetails('offers')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-green-500" />
              Offers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers.length}</div>
            <p className="text-sm text-muted-foreground">Received offers</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Application Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {detailsType === 'applications' ? 'Your Applications' : 
               detailsType === 'interviews' ? 'Your Interviews' : 
               'Your Offers'}
            </DialogTitle>
            <DialogDescription>
              {detailsType === 'applications' ? 'View all your job applications' : 
               detailsType === 'interviews' ? 'View upcoming interview details' : 
               'Review received job offers'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {detailsType === 'applications' && (
              applications.length > 0 ? applications.map(app => (
                <Card key={app.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{app.position}</CardTitle>
                    <CardDescription>{app.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Applied on:</span>
                        <span>{formatDate(app.appliedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Application Submitted
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-end">
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              )) : (
                <div className="text-center p-8 border rounded-lg">
                  <p className="text-lg font-medium">No applications yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Apply for jobs to see them here
                  </p>
                </div>
              )
            )}
            
            {detailsType === 'interviews' && (
              interviews.length > 0 ? interviews.map(app => (
                <Card key={app.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{app.position}</CardTitle>
                    <CardDescription>{app.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Applied on:</span>
                        <span>{formatDate(app.appliedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Interview Date:</span>
                        <span>{formatDate(app.interviewDate || '')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Interview Time:</span>
                        <span>{app.interviewTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Interviewer:</span>
                        <span>{app.interviewer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Interview Scheduled
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button size="sm" onClick={() => navigate('/interview')}>Join Interview</Button>
                  </CardFooter>
                </Card>
              )) : (
                <div className="text-center p-8 border rounded-lg">
                  <p className="text-lg font-medium">No interviews scheduled</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Apply for more jobs to increase your chances
                  </p>
                </div>
              )
            )}
            
            {detailsType === 'offers' && (
              offers.length > 0 ? offers.map(app => (
                <Card key={app.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{app.position}</CardTitle>
                    <CardDescription>{app.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Applied on:</span>
                        <span>{formatDate(app.appliedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Offer Details:</span>
                        <span>{app.offerDetails}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Compensation:</span>
                        <span className="font-medium">{app.offerAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Decision Deadline:</span>
                        <span>{formatDate(app.offerDeadline || '')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Offer Received
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Negotiate</Button>
                    <Button size="sm" variant="outline">Decline</Button>
                    <Button size="sm">Accept Offer</Button>
                  </CardFooter>
                </Card>
              )) : (
                <div className="text-center p-8 border rounded-lg">
                  <p className="text-lg font-medium">No offers received</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete interviews successfully to receive offers
                  </p>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
      
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
