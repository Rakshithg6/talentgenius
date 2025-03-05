
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Users, Briefcase, Clock, User } from "lucide-react";

const Dashboard = () => {
  // Dummy data for charts
  const applicationsData = [
    { name: 'Jan', count: 12 },
    { name: 'Feb', count: 19 },
    { name: 'Mar', count: 25 },
    { name: 'Apr', count: 32 },
    { name: 'May', count: 45 },
    { name: 'Jun', count: 51 },
    { name: 'Jul', count: 60 },
  ];
  
  const timeToHireData = [
    { name: 'Designer', days: 18 },
    { name: 'Developer', days: 24 },
    { name: 'Manager', days: 32 },
    { name: 'Marketing', days: 16 },
    { name: 'Sales', days: 14 },
  ];

  return (
    <section className="section bg-white">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful HR Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access all your recruitment data in one place with our comprehensive analytics dashboard.
          </p>
        </div>
        
        <div className="bg-secondary/50 border border-border/50 rounded-xl p-6 md:p-8 shadow-subtle animate-scale-up">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,854</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> 12%
                      </span>
                      from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> 4%
                      </span>
                      from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18 days</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> 15%
                      </span>
                      improvement
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">145</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> 8%
                      </span>
                      from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Applications Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={applicationsData}
                          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Time to Hire by Department</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={timeToHireData}
                          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="days" 
                            fill="hsl(var(--primary))" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="candidates" className="mt-0 animate-fade-in">
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Candidate Management</h3>
                <p className="text-muted-foreground mb-4">View and manage all candidate details here</p>
                <p className="text-sm text-muted-foreground">(Dashboard preview - full functionality in the complete version)</p>
              </div>
            </TabsContent>
            
            <TabsContent value="jobs" className="mt-0 animate-fade-in">
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Job Management</h3>
                <p className="text-muted-foreground mb-4">Create and manage job listings</p>
                <p className="text-sm text-muted-foreground">(Dashboard preview - full functionality in the complete version)</p>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0 animate-fade-in">
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Recruitment Analytics</h3>
                <p className="text-muted-foreground mb-4">View detailed analytics on your hiring process</p>
                <p className="text-sm text-muted-foreground">(Dashboard preview - full functionality in the complete version)</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
