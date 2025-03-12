
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Monitor, Video, Mic, MicOff, VideoOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterviewPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Mock upcoming interviews
  const upcomingInterviews = [
    {
      id: "int-1",
      company: "TechSolutions Inc.",
      position: "Senior Developer",
      date: "2023-06-15",
      time: "14:00",
      status: "scheduled",
      interviewer: "Sarah Johnson"
    },
    {
      id: "int-2",
      company: "Global Innovations",
      position: "UX Designer",
      date: "2023-06-18",
      time: "10:30",
      status: "scheduled",
      interviewer: "Michael Chen"
    }
  ];

  // Mock completed interviews
  const completedInterviews = [
    {
      id: "int-3",
      company: "Digital Frontiers",
      position: "Frontend Developer",
      date: "2023-05-28",
      time: "11:00",
      status: "completed",
      feedback: "Positive feedback on technical skills. Follow-up interview to be scheduled."
    }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast({
      title: videoEnabled ? "Video disabled" : "Video enabled",
      description: videoEnabled ? "Your camera is now off" : "Your camera is now on",
    });
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toast({
      title: audioEnabled ? "Microphone muted" : "Microphone unmuted",
      description: audioEnabled ? "Your microphone is now muted" : "Your microphone is now unmuted",
    });
  };

  const joinInterview = (interviewId: string) => {
    toast({
      title: "Joining interview room",
      description: "Please wait while we connect you to the interviewer",
    });
    // In a real app, this would navigate to a specific interview room
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Interviews
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Manage and prepare for your upcoming job interviews
          </p>
          
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map(interview => (
                    <Card key={interview.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{interview.position}</CardTitle>
                            <CardDescription>{interview.company}</CardDescription>
                          </div>
                          <Button onClick={() => joinInterview(interview.id)}>Join Interview</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{formatDate(interview.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{interview.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Monitor className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Interviewer: {interview.interviewer}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          Remember to check your equipment before the interview
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={toggleVideo}>
                            {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={toggleAudio}>
                            {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">You don't have any upcoming interviews</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              {completedInterviews.length > 0 ? (
                <div className="space-y-4">
                  {completedInterviews.map(interview => (
                    <Card key={interview.id}>
                      <CardHeader>
                        <CardTitle>{interview.position}</CardTitle>
                        <CardDescription>{interview.company}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{formatDate(interview.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{interview.time}</span>
                          </div>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium mb-2">Feedback</h4>
                          <p>{interview.feedback}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">You don't have any completed interviews</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="practice" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Practice</CardTitle>
                  <CardDescription>
                    Practice your interview skills with our AI-powered mock interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Technical Interview</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Practice common technical questions for your role
                      </p>
                      <Button>Start Practice</Button>
                    </div>
                    
                    <div className="bg-secondary p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Behavioral Interview</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Practice answering common behavioral questions
                      </p>
                      <Button>Start Practice</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterviewPage;
