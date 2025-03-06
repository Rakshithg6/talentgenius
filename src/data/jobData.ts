
export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  isRemote: boolean;
}

export const jobData: JobData[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹25-35 LPA",
    description: "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable applications.",
    requirements: [
      "5+ years of experience in software development",
      "Strong knowledge of Java, Spring Boot",
      "Experience with microservices architecture"
    ],
    skills: ["Java", "Spring Boot", "Microservices", "AWS", "Docker"],
    postedDate: "2 days ago",
    isRemote: false
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "InnovateX",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹18-25 LPA",
    description: "Join our backend team to build robust APIs and services for our growing platform. You'll work with a team of experienced developers on challenging problems.",
    requirements: [
      "3+ years of experience in backend development",
      "Expertise in Node.js or Python",
      "Knowledge of database design and optimization"
    ],
    skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
    postedDate: "1 week ago",
    isRemote: true
  },
  {
    id: "3",
    title: "Software Engineer - Backend",
    company: "GlobalTech Systems",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹15-22 LPA",
    description: "We're seeking a talented backend engineer to help build and scale our core platform services. You'll be working on high-throughput systems that handle millions of requests.",
    requirements: [
      "2+ years of experience in backend development",
      "Strong in at least one of: Java, Go, or Python",
      "Experience with SQL and NoSQL databases"
    ],
    skills: ["Java", "Go", "PostgreSQL", "Kafka", "Kubernetes"],
    postedDate: "3 days ago",
    isRemote: false
  },
  {
    id: "4",
    title: "Full Stack Engineer",
    company: "Digi Solutions",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹20-30 LPA",
    description: "Looking for a versatile Full Stack Engineer to build web applications from front to back. You'll work on exciting projects with cutting-edge technologies.",
    requirements: [
      "4+ years of full stack development experience",
      "Proficiency in React/Angular and Node.js",
      "Database design and implementation experience"
    ],
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    postedDate: "1 week ago",
    isRemote: true
  },
  {
    id: "5",
    title: "Backend Engineer - Python",
    company: "FinTech Innovations",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹18-28 LPA",
    description: "Join our engineering team to build scalable and secure financial systems. You'll be developing APIs and services that power our core banking platform.",
    requirements: [
      "3+ years experience with Python",
      "Knowledge of Django or Flask frameworks",
      "Understanding of RESTful API design"
    ],
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker", "AWS"],
    postedDate: "5 days ago",
    isRemote: false
  }
];
