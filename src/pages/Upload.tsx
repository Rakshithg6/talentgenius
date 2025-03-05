
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, Check, AlertCircle, File, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UploadPage = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload and analysis
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      
      toast({
        title: "Resume analyzed successfully",
        description: "Your resume has been processed with our AI.",
      });
      
      // Proceed to next step
      setTimeout(() => {
        setCurrentStep(2);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Resume Analysis</h1>
              <p className="text-xl text-muted-foreground">
                Upload your resume for AI-powered analysis and job matching
              </p>
            </div>
            
            <div className="mb-10">
              <div className="flex justify-between items-center relative">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step} 
                    className="flex flex-col items-center z-10"
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                      ${currentStep >= step 
                        ? "bg-primary text-white" 
                        : "bg-secondary text-muted-foreground border border-border"
                      }`}
                    >
                      {currentStep > step ? <Check className="h-5 w-5" /> : step}
                    </div>
                    <div className="text-sm font-medium text-center">
                      {step === 1 && "Upload"}
                      {step === 2 && "Analysis"}
                      {step === 3 && "Results"}
                    </div>
                  </div>
                ))}
                
                {/* Progress line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-border -z-10">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ 
                      width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" 
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            {currentStep === 1 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      isDragging 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {!file ? (
                      <>
                        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Upload your resume</h3>
                        <p className="text-muted-foreground mb-6">
                          Drag and drop your resume file here, or click to browse
                        </p>
                        <input
                          type="file"
                          id="resume-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="resume-upload">
                          <Button variant="outline" className="rounded-lg" as="span">
                            Browse files
                          </Button>
                        </label>
                        <p className="text-xs text-muted-foreground mt-4">
                          Supports PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </>
                    ) : (
                      <div className="py-4">
                        <div className="flex items-center mb-6">
                          <div className="mr-4 bg-blue-50 p-3 rounded-lg">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-left overflow-hidden flex-grow">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFile(null)}
                            className="ml-4"
                          >
                            Change
                          </Button>
                        </div>
                        <Button 
                          onClick={handleUpload} 
                          disabled={isUploading}
                          className="w-full"
                        >
                          {isUploading ? "Analyzing..." : "Analyze Resume"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {currentStep === 2 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <Tabs defaultValue="skills" className="w-full">
                    <TabsList className="mb-6 w-full justify-start">
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="skills" className="animate-fade-in space-y-4">
                      <h3 className="text-lg font-medium mb-3">Identified Skills</h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "JavaScript", "React", "Node.js", "Python", 
                          "Data Analysis", "Project Management", "UI/UX Design", 
                          "Agile Methodology", "Team Leadership", "Problem Solving"
                        ].map((skill, i) => (
                          <div 
                            key={i} 
                            className="bg-secondary p-3 rounded-lg flex items-center"
                          >
                            <Check className="h-4 w-4 text-primary mr-2" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button onClick={() => setCurrentStep(3)}>
                          Continue to Results <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="experience" className="animate-fade-in">
                      <h3 className="text-lg font-medium mb-3">Work Experience</h3>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: "Senior Frontend Developer",
                            company: "Tech Innovations Inc.",
                            period: "2020 - Present",
                            description: "Led a team of developers to build responsive web applications using React and TypeScript."
                          },
                          {
                            title: "Software Engineer",
                            company: "Digital Solutions",
                            period: "2017 - 2020",
                            description: "Developed and maintained web applications using JavaScript, HTML, and CSS."
                          }
                        ].map((job, i) => (
                          <div key={i} className="border-l-2 border-primary pl-4 py-1">
                            <h4 className="font-medium">{job.title}</h4>
                            <div className="flex justify-between text-sm">
                              <span>{job.company}</span>
                              <span className="text-muted-foreground">{job.period}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button onClick={() => setCurrentStep(3)}>
                          Continue to Results <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="education" className="animate-fade-in">
                      <h3 className="text-lg font-medium mb-3">Education</h3>
                      
                      <div className="space-y-4">
                        {[
                          {
                            degree: "Master of Computer Science",
                            institution: "University of Technology",
                            period: "2015 - 2017",
                          },
                          {
                            degree: "Bachelor of Science in Information Technology",
                            institution: "State University",
                            period: "2011 - 2015",
                          }
                        ].map((edu, i) => (
                          <div key={i} className="border-l-2 border-primary pl-4 py-1">
                            <h4 className="font-medium">{edu.degree}</h4>
                            <div className="flex justify-between text-sm">
                              <span>{edu.institution}</span>
                              <span className="text-muted-foreground">{edu.period}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button onClick={() => setCurrentStep(3)}>
                          Continue to Results <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="insights" className="animate-fade-in">
                      <h3 className="text-lg font-medium mb-3">AI-Generated Insights</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-secondary/70 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Strengths</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Strong technical skills in JavaScript ecosystem</li>
                            <li>Experience with modern frontend frameworks</li>
                            <li>Leadership experience managing development teams</li>
                            <li>Solid educational background in computer science</li>
                          </ul>
                        </div>
                        
                        <div className="bg-secondary/70 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Suggested Job Roles</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Senior Frontend Developer</li>
                            <li>Technical Team Lead</li>
                            <li>Full Stack Engineer</li>
                            <li>Engineering Manager</li>
                          </ul>
                        </div>
                        
                        <div className="bg-secondary/70 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Skill Gap Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            To enhance employability for senior roles, consider developing the following skills:
                          </p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
                            <li>Cloud infrastructure (AWS/Azure)</li>
                            <li>DevOps practices</li>
                            <li>Advanced system architecture</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button onClick={() => setCurrentStep(3)}>
                          Continue to Results <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
            
            {currentStep === 3 && (
              <Card className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Analysis Complete!</h3>
                    <p className="text-muted-foreground">
                      We've analyzed your resume and found some great job matches.
                    </p>
                  </div>
                  
                  <h3 className="font-medium mb-4">Top Job Matches</h3>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      {
                        title: "Senior Frontend Developer",
                        company: "Innovative Tech Co.",
                        match: 95,
                        location: "San Francisco, CA (Remote)",
                        salary: "$120,000 - $150,000"
                      },
                      {
                        title: "Lead React Developer",
                        company: "Digital Products Inc.",
                        match: 92,
                        location: "New York, NY (Hybrid)",
                        salary: "$110,000 - $140,000"
                      },
                      {
                        title: "Full Stack Engineer",
                        company: "Tech Solutions LLC",
                        match: 88,
                        location: "Austin, TX (On-site)",
                        salary: "$100,000 - $130,000"
                      }
                    ].map((job, i) => (
                      <div key={i} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm">{job.company}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-3">
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          <div className="bg-green-50 text-green-700 px-2 py-1 rounded font-medium text-sm">
                            {job.match}% Match
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back to Analysis
                    </Button>
                    <Button>View All Job Matches</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadPage;
