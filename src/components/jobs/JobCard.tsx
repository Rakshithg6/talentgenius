
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, CalendarDays } from "lucide-react";
import { JobData } from '@/data/jobData';

type JobCardProps = {
  job: JobData;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              {job.isRemote && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                  Remote
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{job.company}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {job.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold text-right">
              {job.salary}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/20 px-6 py-4 flex justify-between">
        <Button variant="outline">Save Job</Button>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
