
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JobPosting = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to post the job
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Job posted successfully",
        description: `The job "${jobTitle}" has been published.`,
      });
      
      // Reset form
      setJobTitle("");
      setDepartment("");
      setLocation("");
      setEmploymentType("");
      setExperienceLevel("");
      setSalary("");
      setDescription("");
      setRequirements("");
      setResponsibilities("");
      
    } catch (error) {
      toast({
        title: "Failed to post job",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Job posting error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Post a New Job
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Create a new job posting to find the perfect candidates
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Fill in the information below to create your job listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input 
                      id="jobTitle" 
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select 
                      value={department} 
                      onValueChange={setDepartment}
                      required
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input 
                      id="location" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bangalore, India or Remote"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment Type *</Label>
                    <Select 
                      value={employmentType} 
                      onValueChange={setEmploymentType}
                      required
                    >
                      <SelectTrigger id="employmentType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Experience Level *</Label>
                    <Select 
                      value={experienceLevel} 
                      onValueChange={setExperienceLevel}
                      required
                    >
                      <SelectTrigger id="experienceLevel">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Team Lead</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input 
                      id="salary" 
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. ₹15,00,000 - ₹25,00,000 per year"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the role and responsibilities"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea 
                    id="requirements" 
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="List the skills and qualifications required"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities *</Label>
                  <Textarea 
                    id="responsibilities" 
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    placeholder="List the key responsibilities of this role"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      // Reset form
                      setJobTitle("");
                      setDepartment("");
                      setLocation("");
                      setEmploymentType("");
                      setExperienceLevel("");
                      setSalary("");
                      setDescription("");
                      setRequirements("");
                      setResponsibilities("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Post Job"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobPosting;
