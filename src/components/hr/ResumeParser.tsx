
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Check, X, Search, CalendarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ResumeParser = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedResults, setParsedResults] = useState<ParsedResume[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const validFiles = newFiles.filter(file => validateFile(file));
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => validateFile(file));
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF or Word documents only.",
        variant: "destructive",
      });
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const parseResumes = () => {
    if (files.length === 0) return;
    
    setParsing(true);
    setProgress(0);
    
    // Simulate parsing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishParsing();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const finishParsing = () => {
    // Generate mock parsed results
    const results: ParsedResume[] = files.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      filename: file.name,
      candidateName: `Candidate ${Math.floor(Math.random() * 1000)}`,
      email: `candidate${Math.floor(Math.random() * 1000)}@example.com`,
      skills: generateRandomSkills(),
      experience: `${Math.floor(Math.random() * 10) + 1} years`,
      education: "Bachelor's Degree",
      matchScore: Math.floor(Math.random() * 40) + 60,
      status: "new"
    }));
    
    setParsedResults(results);
    setParsing(false);
    setFiles([]);
    
    toast({
      title: "Parsing complete",
      description: `Successfully parsed ${results.length} resumes.`,
    });
  };

  const generateRandomSkills = () => {
    const allSkills = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "Java", "CSS", "HTML", "SQL", "MongoDB", "AWS", "Docker", "Kubernetes", "UI/UX", "Figma", "Product Management"];
    const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 6) + 3);
  };

  const updateCandidateStatus = (id: string, status: 'screened' | 'interview' | 'reject' | 'new') => {
    setParsedResults(prev => 
      prev.map(candidate => 
        candidate.id === id ? { ...candidate, status } : candidate
      )
    );
    
    const candidate = parsedResults.find(c => c.id === id);
    
    toast({
      title: `Candidate ${status}`,
      description: `${candidate?.candidateName} has been marked as ${status}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Parser</CardTitle>
          <CardDescription>
            Upload candidate resumes to automatically extract key information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-secondary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Upload Resumes</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop resume files here, or click to browse
            </p>
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <label htmlFor="resume-upload">
              <Button variant="outline" className="rounded-lg" asChild>
                <span>Browse files</span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-4">
              Supports PDF, DOC, DOCX (Max 5MB per file)
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-4">Selected Files ({files.length})</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-secondary p-3 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                {parsing ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Parsing resumes...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ) : (
                  <Button onClick={parseResumes} className="w-full">
                    Parse {files.length} Resume{files.length !== 1 ? 's' : ''}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {parsedResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Parsed Resumes</CardTitle>
            <CardDescription>
              Review extracted information and candidate details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {parsedResults.map(result => (
                <div 
                  key={result.id} 
                  className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-lg">{result.candidateName}</h3>
                      <p className="text-sm text-muted-foreground">{result.email}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <Badge 
                        className={`
                          ${result.status === 'interview' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          ${result.status === 'screened' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''}
                          ${result.status === 'reject' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''}
                        `}
                      >
                        {result.status === 'new' ? 'New' : 
                         result.status === 'screened' ? 'Screened' : 
                         result.status === 'interview' ? 'Interview' : 'Rejected'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p>{result.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Education</p>
                      <p>{result.education}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Match Score</p>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{result.matchScore}%</span>
                        <Progress value={result.matchScore} className="h-2 flex-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateCandidateStatus(result.id, 'screened')}
                    >
                      <Check className="h-4 w-4 mr-1" /> Screen
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                      onClick={() => updateCandidateStatus(result.id, 'interview')}
                    >
                      <CalendarIcon className="h-4 w-4 mr-1" /> Schedule Interview
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      onClick={() => updateCandidateStatus(result.id, 'reject')}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                    >
                      <Search className="h-4 w-4 mr-1" /> View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Types
interface ParsedResume {
  id: string;
  filename: string;
  candidateName: string;
  email: string;
  skills: string[];
  experience: string;
  education: string;
  matchScore: number;
  status: 'new' | 'screened' | 'interview' | 'reject';
}

export default ResumeParser;
