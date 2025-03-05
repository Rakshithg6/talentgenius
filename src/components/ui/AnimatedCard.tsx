
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "scale-up";
}

const AnimatedCard = ({
  children,
  className,
  delay = 0,
  animation = "fade-up",
}: AnimatedCardProps) => {
  const animationClass = `animate-${animation}`;
  const delayStyle = { animationDelay: `${delay}ms` };

  return (
    <div 
      className={cn(
        "bg-white rounded-xl border border-border/50 shadow-subtle p-6 transition-all duration-300 hover:shadow-card", 
        animationClass, 
        className
      )} 
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
