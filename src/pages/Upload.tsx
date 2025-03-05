
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const UploadPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      
      // Reset after some time and navigate to dashboard
      setTimeout(() => {
        setFile(null);
        setIsSuccess(false);
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Upload Your Resume
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Our AI will analyze your resume and provide detailed insights.
          </p>
          
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
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
                <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-medium mb-3">Upload your resume</h3>
                <p className="text-muted-foreground mb-8">
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
                <p className="text-xs text-muted-foreground mt-6">
                  Supports PDF, DOC, DOCX (Max 5MB)
                </p>
              </>
            ) : (
              <div className="py-6">
                {isSuccess ? (
                  <div className="animate-fade-in">
                    <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <Check className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-medium mb-2">Analysis Complete!</h3>
                    <p className="text-muted-foreground mb-8">Your resume has been successfully analyzed</p>
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="px-6"
                    >
                      View Results
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="mr-4 bg-blue-50 p-4 rounded-lg">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="font-medium text-lg truncate">{file?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file?.size && (file.size / 1024 / 1024).toFixed(2)) || 0} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleUpload} 
                      disabled={isUploading}
                      className="px-8 py-6 text-lg"
                    >
                      {isUploading ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Need help? Check our <span className="text-primary cursor-pointer hover:underline">FAQ</span> or <span className="text-primary cursor-pointer hover:underline">contact support</span>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadPage;
