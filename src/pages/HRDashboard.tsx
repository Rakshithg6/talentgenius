
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Upload, Users, FileText, Clock, CheckCircle, Activity } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ResumeParserStats from "@/components/hr/ResumeParserStats";
import ResumeParser from "@/components/hr/ResumeParser";

const HRDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("overview");

  React.useEffect(() => {
    toast({
      title: "HR Dashboard loaded",
      description: `Welcome to your HR dashboard, ${user?.name}!`,
    });
  }, []);

  // Configure chart colors
  const chartConfig = {
    applications: { color: "hsl(var(--primary))" },
    interviews: { color: "hsl(var(--primary) / 0.7)" },
    hires: { color: "hsl(var(--primary) / 0.4)" },
  };

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            HR Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Manage your recruitment process and track hiring metrics
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card rounded-xl p-6 text-center">
              <h3 className="font-medium text-xl mb-3">Open Positions</h3>
              <p className="text-3xl font-bold text-primary">7</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center">
              <h3 className="font-medium text-xl mb-3">Applications</h3>
              <p className="text-3xl font-bold text-primary">43</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center">
              <h3 className="font-medium text-xl mb-3">Time to Hire (avg)</h3>
              <p className="text-3xl font-bold text-primary">18d</p>
            </div>
          </div>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="resume-parser">Resume Parser</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ResumeParserStats />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Timeline</CardTitle>
                    <CardDescription>
                      Applications, interviews, and hires over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { name: "Jan", Applications: 24, Interviews: 18, Hires: 4 },
                            { name: "Feb", Applications: 30, Interviews: 22, Hires: 5 },
                            { name: "Mar", Applications: 35, Interviews: 25, Hires: 6 },
                            { name: "Apr", Applications: 40, Interviews: 30, Hires: 7 },
                            { name: "May", Applications: 45, Interviews: 35, Hires: 8 }
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="Applications" stroke={chartConfig.applications.color} strokeWidth={2} activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="Interviews" stroke={chartConfig.interviews.color} strokeWidth={2} />
                          <Line type="monotone" dataKey="Hires" stroke={chartConfig.hires.color} strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates from your recruitment process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: <FileText className="h-5 w-5" />, text: "New application for Senior Developer position", time: "2 hours ago" },
                      { icon: <Clock className="h-5 w-5" />, text: "Interview scheduled for Marketing Manager", time: "5 hours ago" },
                      { icon: <CheckCircle className="h-5 w-5" />, text: "Offer accepted by UX Designer candidate", time: "1 day ago" },
                      { icon: <Activity className="h-5 w-5" />, text: "15 new applications need review", time: "2 days ago" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start pb-4 border-b last:border-none">
                        <div className="mr-4 p-2 bg-primary/10 rounded-full text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium">{item.text}</p>
                          <p className="text-sm text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="candidates">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Candidate Applications</CardTitle>
                      <CardDescription>
                        Manage and review all candidate applications
                      </CardDescription>
                    </div>
                    <Button>View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { name: "Alex Johnson", position: "Senior Frontend Developer", status: "Interview", match: "95%" },
                      { name: "Maria Garcia", position: "UX Designer", status: "Review", match: "87%" },
                      { name: "Raj Patel", position: "Product Manager", status: "Applied", match: "82%" },
                      { name: "Sarah Williams", position: "Marketing Specialist", status: "Offer", match: "93%" }
                    ].map((candidate, i) => (
                      <div key={i} className="flex items-center justify-between pb-4 border-b last:border-none">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                            {candidate.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">{candidate.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 text-xs rounded-full mr-4 ${
                            candidate.status === "Offer" 
                              ? "bg-green-100 text-green-800" 
                              : candidate.status === "Interview" 
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {candidate.status}
                          </span>
                          <span className="text-sm font-medium">{candidate.match}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="positions">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Open Positions</CardTitle>
                      <CardDescription>
                        Manage job listings and track applicants
                      </CardDescription>
                    </div>
                    <Button>Add Position</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { title: "Senior Frontend Developer", department: "Engineering", applicants: 12, status: "Open" },
                      { title: "UX Designer", department: "Design", applicants: 8, status: "Open" },
                      { title: "Product Manager", department: "Product", applicants: 15, status: "Open" },
                      { title: "Marketing Specialist", department: "Marketing", applicants: 7, status: "Open" }
                    ].map((position, i) => (
                      <div key={i} className="flex items-center justify-between pb-4 border-b last:border-none">
                        <div>
                          <p className="font-medium">{position.title}</p>
                          <p className="text-sm text-muted-foreground">{position.department}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="flex items-center text-sm mr-4">
                            <Users className="h-4 w-4 mr-1" /> 
                            {position.applicants} applicants
                          </span>
                          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {position.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resume-parser">
              <ResumeParser />
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Time to Hire by Department</CardTitle>
                    <CardDescription>
                      Average days from application to offer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: "Engineering", value: 32 },
                            { name: "Marketing", value: 28 },
                            { name: "Sales", value: 24 },
                            { name: "Finance", value: 35 },
                            { name: "HR", value: 30 }
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Application Sources</CardTitle>
                    <CardDescription>
                      Where candidates are finding your listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "LinkedIn", value: 45 },
                              { name: "Company Website", value: 25 },
                              { name: "Indeed", value: 15 },
                              { name: "Referrals", value: 10 },
                              { name: "Other", value: 5 }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {[
                              { name: "LinkedIn", value: 45 },
                              { name: "Company Website", value: 25 },
                              { name: "Indeed", value: 15 },
                              { name: "Referrals", value: 10 },
                              { name: "Other", value: 5 }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HRDashboard;
