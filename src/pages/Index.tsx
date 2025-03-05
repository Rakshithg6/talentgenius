
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import ResumeAnalysis from "@/components/sections/ResumeAnalysis";
import Dashboard from "@/components/sections/Dashboard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Briefcase, Zap, CloudLightning } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate("/upload");
  };

  const handleGetStartedFree = () => {
    navigate("/upload");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <Features />
        
        <ResumeAnalysis />
        
        {/* How it works section */}
        <section className="section features-section">
          <div className="page-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform streamlines every step of the recruitment process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {[
                {
                  step: "1",
                  title: "Upload Resumes",
                  description: "Upload candidate resumes in any format. Our AI will automatically extract and organize the information.",
                  icon: <Briefcase className="h-6 w-6" />,
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description: "Our algorithms analyze skills, experience, and qualifications to match candidates to your open positions.",
                  icon: <Zap className="h-6 w-6" />,
                },
                {
                  step: "3",
                  title: "Generate Insights",
                  description: "Get detailed candidate profiles, suggested interview questions, and ranking based on job fit.",
                  icon: <CloudLightning className="h-6 w-6" />,
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                className="rounded-full px-6 py-6 text-base font-medium gap-2 group"
                onClick={handleStartNow}
              >
                Start Now
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
        
        <Dashboard />
        
        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-primary/90 to-blue-600 text-white">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transform Your Recruitment Process Today
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of companies using TalentGenius to find the perfect candidates faster and more efficiently.
              </p>
              <Button 
                variant="secondary" 
                className="rounded-full px-8 py-6 text-primary font-medium text-base"
                onClick={handleGetStartedFree}
              >
                Get Started for Free
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
