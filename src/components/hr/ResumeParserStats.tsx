
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, CheckCircle, Calendar, AlertCircle, Users } from "lucide-react";

type ResumeStats = {
  parsed: number;
  screened: number;
  interviews: number;
  rejected: number;
  totalCandidates: number;
};

const ResumeParserStats = ({ stats = defaultStats }: { stats?: ResumeStats }) => {
  // Calculate percentages 
  const screenedPercentage = Math.round((stats.screened / stats.parsed) * 100) || 0;
  const interviewPercentage = Math.round((stats.interviews / stats.parsed) * 100) || 0;
  const rejectedPercentage = Math.round((stats.rejected / stats.parsed) * 100) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Parsing Statistics</CardTitle>
        <CardDescription>Analytics on candidate resume processing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Candidates</p>
                <p className="text-2xl font-bold">{stats.totalCandidates}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Resumes Parsed</p>
              <p className="text-xl font-semibold">{stats.parsed}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium">Screened</span>
                </div>
                <span className="text-sm">{stats.screened} ({screenedPercentage}%)</span>
              </div>
              <Progress value={screenedPercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Interviews Scheduled</span>
                </div>
                <span className="text-sm">{stats.interviews} ({interviewPercentage}%)</span>
              </div>
              <Progress value={interviewPercentage} className="h-2 bg-blue-100" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm font-medium">Rejected</span>
                </div>
                <span className="text-sm">{stats.rejected} ({rejectedPercentage}%)</span>
              </div>
              <Progress value={rejectedPercentage} className="h-2 bg-red-100" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Default stats for demo purposes
const defaultStats: ResumeStats = {
  parsed: 145,
  screened: 98,
  interviews: 42,
  rejected: 37,
  totalCandidates: 183
};

export default ResumeParserStats;
