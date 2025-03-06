
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, PlusCircle, Users, Video, MapPin, CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const InterviewSchedule = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Form state
  const [candidateName, setCandidateName] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [interviewers, setInterviewers] = useState("");
  
  // Mock upcoming interviews data
  const upcomingInterviews = [
    {
      id: 1,
      candidateName: "Maria Garcia",
      position: "UX Designer",
      date: "2023-12-15",
      time: "10:00 AM",
      type: "Video Call",
      interviewers: "John Smith, Lisa Johnson"
    },
    {
      id: 2,
      candidateName: "Alex Johnson",
      position: "Senior Frontend Developer",
      date: "2023-12-16",
      time: "2:30 PM",
      type: "In-person",
      interviewers: "Jane Doe, Michael Brown"
    },
    {
      id: 3,
      candidateName: "Raj Patel",
      position: "Product Manager",
      date: "2023-12-18",
      time: "11:00 AM",
      type: "Video Call",
      interviewers: "Susan Wilson, David Lee"
    }
  ];
  
  // Mock completed interviews data
  const completedInterviews = [
    {
      id: 4,
      candidateName: "Sarah Williams",
      position: "Marketing Specialist",
      date: "2023-12-10",
      time: "3:00 PM",
      type: "Video Call",
      interviewers: "John Smith, Michael Brown",
      status: "Accepted"
    },
    {
      id: 5,
      candidateName: "James Anderson",
      position: "Backend Developer",
      date: "2023-12-08",
      time: "1:30 PM",
      type: "In-person",
      interviewers: "Jane Doe, Lisa Johnson",
      status: "Rejected"
    }
  ];
  
  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to schedule the interview
      setTimeout(() => {
        toast({
          title: "Interview scheduled",
          description: `Interview with ${candidateName} has been scheduled for ${date} at ${time}.`,
        });
        
        // Reset form and close dialog
        setCandidateName("");
        setPosition("");
        setDate("");
        setTime("");
        setInterviewType("");
        setInterviewers("");
        setOpenDialog(false);
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Failed to schedule interview",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Interview scheduling error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Interview Schedule
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your upcoming and past interviews
              </p>
            </div>
            
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Schedule a New Interview</DialogTitle>
                  <DialogDescription>
                    Complete the form below to schedule an interview with a candidate.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleScheduleInterview}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="candidateName">Candidate Name *</Label>
                      <Input
                        id="candidateName"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="Enter candidate name"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="position">Position *</Label>
                      <Input
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Enter job position"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="interviewType">Interview Type *</Label>
                      <Select 
                        value={interviewType} 
                        onValueChange={setInterviewType}
                        required
                      >
                        <SelectTrigger id="interviewType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="in-person">In-person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="interviewers">Interviewers *</Label>
                      <Input
                        id="interviewers"
                        value={interviewers}
                        onChange={(e) => setInterviewers(e.target.value)}
                        placeholder="Enter interviewer names (comma separated)"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Scheduling..." : "Schedule Interview"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
              <TabsTrigger value="completed">Completed Interviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="space-y-6">
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview) => (
                    <Card key={interview.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold">{interview.candidateName}</h3>
                            <p className="text-muted-foreground">{interview.position}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              <span>{new Date(interview.date).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              <span>{interview.time}</span>
                            </div>
                            
                            <div className="flex items-center">
                              {interview.type === "Video Call" ? (
                                <Video className="h-4 w-4 mr-2 text-primary" />
                              ) : (
                                <MapPin className="h-4 w-4 mr-2 text-primary" />
                              )}
                              <span>{interview.type}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-primary" />
                              <span>{interview.interviewers}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex space-x-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No upcoming interviews scheduled.</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setOpenDialog(true)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Schedule Interview
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="space-y-6">
                {completedInterviews.length > 0 ? (
                  completedInterviews.map((interview) => (
                    <Card key={interview.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="mb-4 md:mb-0">
                            <div className="flex items-center">
                              <h3 className="text-xl font-semibold mr-2">{interview.candidateName}</h3>
                              {interview.status === "Accepted" ? (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Accepted
                                </span>
                              ) : (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Rejected
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground">{interview.position}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              <span>{new Date(interview.date).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              <span>{interview.time}</span>
                            </div>
                            
                            <div className="flex items-center">
                              {interview.type === "Video Call" ? (
                                <Video className="h-4 w-4 mr-2 text-primary" />
                              ) : (
                                <MapPin className="h-4 w-4 mr-2 text-primary" />
                              )}
                              <span>{interview.type}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-primary" />
                              <span>{interview.interviewers}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0">
                            <Button variant="outline" size="sm">
                              View Feedback
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No completed interviews.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterviewSchedule;
