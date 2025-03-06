
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "text-primary" : ""}`}
            >
              Home
            </Link>
            
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
                </>
              ) : (
                <>
                  <Link
                    to="/upload"
                    className={`nav-link ${isActive("/upload") ? "text-primary" : ""}`}
                  >
                    Resume Upload
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
                  to="/upload"
                  className={`nav-link ${isActive("/upload") ? "text-primary" : ""}`}
                >
                  Resume Upload
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings?tab=notifications")}>
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
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
          <button
            className="md:hidden text-foreground p-2"
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-down">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`nav-link ${isActive("/") ? "text-primary" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
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
                  </>
                ) : (
                  <>
                    <Link
                      to="/upload"
                      className={`nav-link ${isActive("/upload") ? "text-primary" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Resume Upload
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
                <Link
                  to="/upload"
                  className={`nav-link ${isActive("/upload") ? "text-primary" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resume Upload
                </Link>
              )}
              
              {user && (
                <Link
                  to="/settings"
                  className={`nav-link ${isActive("/settings") ? "text-primary" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
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
