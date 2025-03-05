
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, FileText, BarChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Hero = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = () => {
    navigate("/upload");
  };

  const handleLearnMore = () => {
    // Scroll to features section
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="blob h-64 w-64"></div>
        <div className="blob h-72 w-72"></div>
        <div className="blob h-56 w-56"></div>
      </div>

      <div className="page-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 mb-6 animate-fade-down">
            <span className="mr-1">✨</span> Next generation AI-powered recruitment
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up">
            Transform Hiring with
            <span className="block md:mt-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Intelligent Recruitment
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "150ms" }}>
            TalentGenius uses advanced AI to analyze resumes, generate interviews, and match candidates to jobs with unprecedented accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button 
              className="rounded-full px-6 py-6 text-base font-medium gap-2 group" 
              size="lg"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full px-6 py-6 text-base font-medium" 
              size="lg"
              onClick={handleLearnMore}
            >
              Learn more
            </Button>
          </div>
        </div>
        
        {/* Feature preview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-up" style={{ animationDelay: "450ms" }}>
          <div className="glass-card rounded-xl p-6 card-hover" onClick={() => navigate("/upload")}>
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <FileText className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-medium text-lg mb-2">Resume Analysis</h3>
            <p className="text-muted-foreground text-sm">Extract skills and experience with AI-powered resume parsing</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 card-hover" onClick={() => navigate("/dashboard")}>
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Search className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-medium text-lg mb-2">Job Matching</h3>
            <p className="text-muted-foreground text-sm">Find ideal candidates with intelligent job-resume matching</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 card-hover" onClick={() => navigate("/dashboard")}>
            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <BarChart className="text-primary h-6 w-6" />
            </div>
            <h3 className="font-medium text-lg mb-2">HR Analytics</h3>
            <p className="text-muted-foreground text-sm">Gain insights with comprehensive recruitment analytics</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
