
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check } from "lucide-react";

const ResumeAnalysis = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      
      // Reset after some time
      setTimeout(() => {
        setFile(null);
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section className="section">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Intelligent Resume Analysis
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Our AI-powered resume analysis extracts skills, experience, and qualifications 
              to create detailed candidate profiles in seconds.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Extract key skills and experience automatically",
                "Match candidates to job requirements with precision",
                "Eliminate bias with objective AI assessment",
                "Save hours of manual resume screening",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file && !isSuccess ? (
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
                    <Button variant="outline" className="rounded-lg" asChild>
                      <span>Browse files</span>
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                </>
              ) : (
                <div className="py-4">
                  {isSuccess ? (
                    <div className="animate-fade-in">
                      <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                        <Check className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-medium mb-1">Analysis Complete!</h3>
                      <p className="text-muted-foreground">Your resume has been successfully analyzed</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mb-4">
                        <div className="mr-4 bg-blue-50 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <p className="font-medium truncate">{file?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file?.size && (file.size / 1024 / 1024).toFixed(2)) || 0} MB
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleUpload} 
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? "Analyzing..." : "Analyze Resume"}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeAnalysis;
