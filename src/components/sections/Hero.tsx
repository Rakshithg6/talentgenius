
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, FileText, BarChart, Briefcase, UserCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleHRLogin = () => {
    navigate("/login", { state: { userType: "hr" } });
  };

  const handleCandidatePortal = () => {
    navigate("/login", { state: { userType: "candidate" } });
  };

  const handleGetStarted = () => {
    navigate(user ? (user.role === "hr" ? "/hr-dashboard" : "/dashboard") : "/upload");
  };

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Smart Recruitment
              <span className="block mt-2 text-primary">Platform</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              A modern, intuitive recruitment platform with separate interfaces for 
              HR professionals and job candidates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="rounded-md px-6 py-6 text-base font-medium gap-2 bg-primary text-white hover:bg-primary/90"
                onClick={handleHRLogin}
              >
                <Briefcase className="h-5 w-5" />
                HR Professional Login
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline"
                className="rounded-md px-6 py-6 text-base font-medium gap-2 border-primary text-primary hover:bg-primary/10"
                onClick={handleCandidatePortal}
              >
                <UserCheck className="h-5 w-5" />
                Candidate Portal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Streamlined recruitment process</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Advanced candidate matching</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Real-time messaging system</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Comprehensive analytics</span>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/5b751f7b-65c8-4d9b-8d40-d7e05ac9c35f.png" 
              alt="Professional recruitment team meeting" 
              className="w-full h-auto object-cover"
            />
            
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900">Dual interfaces for HR and candidates</h3>
              </div>
              <p className="text-sm text-gray-600">Optimized for each user's specific needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
