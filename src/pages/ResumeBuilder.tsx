
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, FilePlus, Check, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
  <div className="flex items-center justify-center mb-8">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <React.Fragment key={index}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                        ${index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
          {index + 1 <= currentStep ? <Check className="h-5 w-5" /> : index + 1}
        </div>
        {index < totalSteps - 1 && (
          <div className={`h-1 w-12 ${index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'}`}></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

// Skill item component with delete functionality
const SkillItem = ({ skill, onDelete }: { skill: string, onDelete: () => void }) => (
  <div className="flex items-center justify-between rounded-lg bg-muted p-3 text-sm">
    <span>{skill}</span>
    <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0">
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);

const ResumeBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  // Form state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "",
    title: "",
    summary: "",
  });
  
  const [education, setEducation] = useState([
    { degree: "", school: "", year: "", description: "" }
  ]);
  
  const [experience, setExperience] = useState([
    { position: "", company: "", startDate: "", endDate: "", description: "" }
  ]);
  
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  
  const [generatingResume, setGeneratingResume] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);
  
  // Handlers
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setEducation(newEducation);
  };
  
  const handleAddEducation = () => {
    setEducation([...education, { degree: "", school: "", year: "", description: "" }]);
  };
  
  const handleRemoveEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };
  
  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setExperience(newExperience);
  };
  
  const handleAddExperience = () => {
    setExperience([...experience, { position: "", company: "", startDate: "", endDate: "", description: "" }]);
  };
  
  const handleRemoveExperience = (index: number) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleGenerateResume = () => {
    // Validate form
    if (!personalInfo.fullName || !personalInfo.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setGeneratingResume(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setGeneratingResume(false);
      setResumeGenerated(true);
      
      toast({
        title: "Resume Generated",
        description: "Your AI-powered resume has been created successfully!",
      });
    }, 3000);
  };
  
  const handleDownloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded successfully!",
    });
  };
  
  // If user is not logged in, redirect to login
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            AI Resume Builder
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Create a professional resume with the help of AI
          </p>
          
          <StepIndicator currentStep={step} totalSteps={totalSteps} />
          
          {!resumeGenerated ? (
            <>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Tell us about yourself to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input 
                          id="fullName" 
                          name="fullName" 
                          placeholder="John Doe" 
                          value={personalInfo.fullName}
                          onChange={handlePersonalInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="johndoe@example.com" 
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          placeholder="+1 (555) 123-4567" 
                          value={personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          placeholder="City, Country" 
                          value={personalInfo.location}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        placeholder="Software Engineer" 
                        value={personalInfo.title}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea 
                        id="summary" 
                        name="summary" 
                        placeholder="A brief overview of your professional background and strengths..." 
                        value={personalInfo.summary}
                        onChange={handlePersonalInfoChange}
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleNextStep}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Step 2: Education */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                      Add your educational background
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">Education #{index + 1}</h4>
                          {education.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveEducation(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${index}`}>Degree</Label>
                            <Input 
                              id={`degree-${index}`} 
                              name="degree" 
                              placeholder="Bachelor of Science in Computer Science" 
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(index, e)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`school-${index}`}>School</Label>
                            <Input 
                              id={`school-${index}`} 
                              name="school" 
                              placeholder="University Name" 
                              value={edu.school}
                              onChange={(e) => handleEducationChange(index, e)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`year-${index}`}>Year</Label>
                          <Input 
                            id={`year-${index}`} 
                            name="year" 
                            placeholder="2018 - 2022" 
                            value={edu.year}
                            onChange={(e) => handleEducationChange(index, e)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea 
                            id={`description-${index}`} 
                            name="description" 
                            placeholder="Relevant coursework, achievements, or projects..." 
                            value={edu.description}
                            onChange={(e) => handleEducationChange(index, e)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      onClick={handleAddEducation}
                      className="w-full"
                    >
                      Add Another Education
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button onClick={handleNextStep}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Step 3: Experience */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>
                      Add your professional experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience.map((exp, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">Experience #{index + 1}</h4>
                          {experience.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveExperience(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`position-${index}`}>Position</Label>
                            <Input 
                              id={`position-${index}`} 
                              name="position" 
                              placeholder="Software Engineer" 
                              value={exp.position}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`company-${index}`}>Company</Label>
                            <Input 
                              id={`company-${index}`} 
                              name="company" 
                              placeholder="Company Name" 
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                            <Input 
                              id={`startDate-${index}`} 
                              name="startDate" 
                              placeholder="Jan 2020" 
                              value={exp.startDate}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`endDate-${index}`}>End Date</Label>
                            <Input 
                              id={`endDate-${index}`} 
                              name="endDate" 
                              placeholder="Present" 
                              value={exp.endDate}
                              onChange={(e) => handleExperienceChange(index, e)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea 
                            id={`description-${index}`} 
                            name="description" 
                            placeholder="Describe your responsibilities, achievements, and the technologies you used..." 
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(index, e)}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      onClick={handleAddExperience}
                      className="w-full"
                    >
                      Add Another Experience
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button onClick={handleNextStep}>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Step 4: Skills & Generate */}
              {step === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>
                      Add your skills and generate your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Add a skill (e.g., JavaScript, Project Management)"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <Button onClick={handleAddSkill}>Add</Button>
                      </div>
                      
                      {skills.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                          {skills.map((skill, index) => (
                            <SkillItem 
                              key={index} 
                              skill={skill} 
                              onDelete={() => handleRemoveSkill(index)} 
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No skills added yet. Add some skills to help your resume stand out.</p>
                      )}
                    </div>
                    
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="font-medium mb-2">Resume Preview</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our AI will analyze your information and create a professional resume tailored to your industry.
                      </p>
                      <Button 
                        className="w-full"
                        onClick={handleGenerateResume}
                        disabled={generatingResume}
                      >
                        {generatingResume ? "Generating..." : "Generate Resume"}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Resume is Ready!</CardTitle>
                <CardDescription>
                  Our AI has created a professional resume based on your information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border overflow-hidden">
                  <div className="p-6 bg-primary/5">
                    <div className="max-w-md mx-auto bg-white shadow-lg p-8 rounded-lg">
                      <h2 className="text-2xl font-bold text-center mb-2">{personalInfo.fullName}</h2>
                      <p className="text-center text-muted-foreground mb-4">{personalInfo.title}</p>
                      
                      <div className="text-sm text-center mb-6">
                        <p>{personalInfo.email} • {personalInfo.phone}</p>
                        <p>{personalInfo.location}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide border-b pb-1 mb-2">Summary</h3>
                        <p className="text-sm">{personalInfo.summary}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide border-b pb-1 mb-2">Experience</h3>
                        {experience.map((exp, index) => (
                          <div key={index} className="mb-3">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">{exp.position}</p>
                              <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm">{exp.company}</p>
                            <p className="text-xs mt-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide border-b pb-1 mb-2">Education</h3>
                        {education.map((edu, index) => (
                          <div key={index} className="mb-3">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">{edu.degree}</p>
                              <p className="text-sm">{edu.year}</p>
                            </div>
                            <p className="text-sm">{edu.school}</p>
                            <p className="text-xs mt-1">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide border-b pb-1 mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <span key={index} className="text-xs bg-primary/10 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button onClick={handleDownloadResume}>
                    Download Resume (PDF)
                  </Button>
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Edit Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
