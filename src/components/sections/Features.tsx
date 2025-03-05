
import { CheckCircle2, Zap, BarChart2, UserCheck, BrainCircuit, MessageSquare } from "lucide-react";
import AnimatedCard from "../ui/AnimatedCard";

const Features = () => {
  const features = [
    {
      title: "AI Resume Analysis",
      description: "Extract skills, experience, and education from resumes with advanced natural language processing.",
      icon: <BrainCircuit className="h-6 w-6 text-primary" />,
      delay: 0,
    },
    {
      title: "Intelligent Job Matching",
      description: "Match candidates to jobs with precision using our advanced scoring algorithm.",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      delay: 150,
    },
    {
      title: "Interview Question Generator",
      description: "Create customized interview questions based on job requirements and candidate profiles.",
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      delay: 300,
    },
    {
      title: "Candidate Chatbot",
      description: "Provide instant support to candidates with our AI-powered chatbot.",
      icon: <UserCheck className="h-6 w-6 text-primary" />,
      delay: 450,
    },
    {
      title: "Recruitment Analytics",
      description: "Track and analyze your recruitment process with comprehensive data insights.",
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      delay: 600,
    },
    {
      title: "Accelerated Hiring",
      description: "Reduce time-to-hire by up to 70% with our streamlined AI recruitment process.",
      icon: <Zap className="h-6 w-6 text-primary" />,
      delay: 750,
    },
  ];

  return (
    <section className="section bg-secondary/50">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful AI Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform leverages cutting-edge AI technology to transform every aspect of the recruitment process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedCard 
              key={index} 
              delay={feature.delay}
              className="flex flex-col h-full"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground flex-grow">{feature.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
