
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings, Bell, FileText, Calendar, PlusCircle, Briefcase, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };
  
  // New function to handle candidate-specific navigation
  const handleCandidatePageNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login", { state: { userType: "candidate", directLogin: true } });
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    
    const names = user.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Get user role display text
  const getUserRoleDisplay = () => {
    if (!user || !user.role) return "";
    return user.role === "hr" ? "HR Professional" : "Job Seeker";
  };

  // Create HR or candidate specific dropdown items based on user role
  const renderRoleSpecificDropdownItems = () => {
    if (!user) return null;
    
    if (user.role === "hr") {
      return (
        <>
          <DropdownMenuItem onClick={() => navigate("/hr-dashboard")}>
            <Briefcase className="h-4 w-4 mr-2" />
            HR Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/job-posting")}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Post Job
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/interview-schedule")}>
            <Calendar className="h-4 w-4 mr-2" />
            Interviews
          </DropdownMenuItem>
        </>
      );
    } else {
      return (
        <>
          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            <Briefcase className="h-4 w-4 mr-2" />
            Job Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/upload")}>
            <Upload className="h-4 w-4 mr-2" />
            Resume Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/resume-builder")}>
            <FileText className="h-4 w-4 mr-2" />
            Resume Builder
          </DropdownMenuItem>
        </>
      );
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-subtle py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              TalentGenius
            </span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {user ? (
              // Show different menu items based on user role
              user.role === "hr" ? (
                <>
                  <Link
                    to="/hr-dashboard"
                    className={`nav-link ${isActive("/hr-dashboard") ? "text-primary" : ""}`}
                  >
                    HR Dashboard
                  </Link>
                  <Link
                    to="/job-posting"
                    className={`nav-link ${isActive("/job-posting") ? "text-primary" : ""}`}
                  >
                    <PlusCircle className="h-4 w-4 mr-1 inline" />
                    Post Job
                  </Link>
                  <Link
                    to="/interview-schedule"
                    className={`nav-link ${isActive("/interview-schedule") ? "text-primary" : ""}`}
                  >
                    <Calendar className="h-4 w-4 mr-1 inline" />
                    Interviews
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className={`nav-link ${isActive("/") ? "text-primary" : ""}`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/upload"
                    className={`nav-link ${isActive("/upload") ? "text-primary" : ""}`}
                  >
                    Resume Upload
                  </Link>
                  <Link
                    to="/resume-builder"
                    className={`nav-link ${isActive("/resume-builder") ? "text-primary" : ""}`}
                  >
                    Resume Builder
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`nav-link ${isActive("/dashboard") ? "text-primary" : ""}`}
                  >
                    Dashboard
                  </Link>
                </>
              )
            ) : (
              // Options for not logged in users
              <>
                <Link
                  to="/"
                  className={`nav-link ${isActive("/") ? "text-primary" : ""}`}
                >
                  Home
                </Link>
                <button
                  onClick={() => handleCandidatePageNavigation("/upload")}
                  className={`nav-link ${isActive("/upload") ? "text-primary" : ""}`}
                >
                  Resume Upload
                </button>
                <button
                  onClick={() => handleCandidatePageNavigation("/resume-builder")}
                  className={`nav-link ${isActive("/resume-builder") ? "text-primary" : ""}`}
                >
                  Resume Builder
                </button>
              </>
            )}
            
            {/* Job search - available for everyone */}
            <button
              onClick={() => handleCandidatePageNavigation("/dashboard")}
              className={`nav-link flex items-center ${isActive("/dashboard") ? "text-primary" : ""}`}
            >
              <Search className="h-4 w-4 mr-1" />
              Find Jobs
            </button>
          </nav>

          {/* User Account / Login Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                    <Badge variant="outline" className="ml-1 text-xs font-normal">
                      {getUserRoleDisplay()}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {renderRoleSpecificDropdownItems()}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=notifications")}>
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="rounded-full px-5 py-2 transition-all duration-300"
                  onClick={handleLoginClick}
                >
                  Log in
                </Button>
                <Button 
                  className="rounded-full px-5 py-2 transition-all duration-300"
                  onClick={() => navigate("/login?tab=signup")}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile account button - always visible when logged in */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full h-9 w-9 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <Badge className="mt-1 w-fit text-xs font-normal">
                        {getUserRoleDisplay()}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {renderRoleSpecificDropdownItems()}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=notifications")}>
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <button
              className="text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-down">
            <nav className="flex flex-col space-y-4">
              {user ? (
                // Show different menu items based on user role
                user.role === "hr" ? (
                  <>
                    <Link
                      to="/hr-dashboard"
                      className={`nav-link ${isActive("/hr-dashboard") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      HR Dashboard
                    </Link>
                    <Link
                      to="/job-posting"
                      className={`nav-link ${isActive("/job-posting") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1 inline" />
                      Post Job
                    </Link>
                    <Link
                      to="/interview-schedule"
                      className={`nav-link ${isActive("/interview-schedule") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Calendar className="h-4 w-4 mr-1 inline" />
                      Interviews
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      className={`nav-link ${isActive("/") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/upload"
                      className={`nav-link ${isActive("/upload") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Resume Upload
                    </Link>
                    <Link
                      to="/resume-builder"
                      className={`nav-link ${isActive("/resume-builder") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Resume Builder
                    </Link>
                    <Link
                      to="/dashboard"
                      className={`nav-link ${isActive("/dashboard") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </>
                )
              ) : (
                // Options for not logged in users
                <>
                  <Link
                    to="/"
                    className={`nav-link ${isActive("/") ? "text-primary" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <button
                    className={`nav-link text-left ${isActive("/upload") ? "text-primary" : ""}`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleCandidatePageNavigation("/upload");
                    }}
                  >
                    Resume Upload
                  </button>
                  <button
                    className={`nav-link text-left ${isActive("/resume-builder") ? "text-primary" : ""}`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleCandidatePageNavigation("/resume-builder");
                    }}
                  >
                    Resume Builder
                  </button>
                </>
              )}
              
              {/* Job search - available for everyone */}
              <button
                className={`nav-link flex items-center text-left ${isActive("/dashboard") ? "text-primary" : ""}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCandidatePageNavigation("/dashboard");
                }}
              >
                <Search className="h-4 w-4 mr-1" />
                Find Jobs
              </button>
              
              {user && (
                <>
                  <div className="py-3 px-4 mt-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <Badge variant="outline" className="mt-1 text-xs font-normal">
                          {getUserRoleDisplay()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to="/settings"
                    className={`nav-link flex items-center ${isActive("/settings") ? "text-primary" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                  
                  <Link
                    to="/settings?tab=notifications"
                    className={`nav-link flex items-center ${isActive("/settings?tab=notifications") ? "text-primary" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Link>
                </>
              )}
              
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/login");
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      className="w-full justify-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/login?tab=signup");
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
