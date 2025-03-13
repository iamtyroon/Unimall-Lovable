
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import ShoppingCart from "./ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-uniprimary">
            Unimall
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium ${
                location.pathname === "/"
                  ? "text-uniprimary"
                  : "text-gray-700 hover:text-uniprimary transition-colors"
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`font-medium ${
                location.pathname === "/shop"
                  ? "text-uniprimary"
                  : "text-gray-700 hover:text-uniprimary transition-colors"
              }`}
            >
              Shop
            </Link>
            <a
              href="#features"
              className="font-medium text-gray-700 hover:text-uniprimary transition-colors"
            >
              Features
            </a>
            <Link
              to="/designer-application"
              className={`font-medium ${
                location.pathname === "/designer-application"
                  ? "text-uniprimary"
                  : "text-gray-700 hover:text-uniprimary transition-colors"
              }`}
            >
              For Designers
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ShoppingCart />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 text-gray-700"
                  onClick={() => {}}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-uniprimary text-uniprimary hover:bg-uniprimary/10"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="border-uniprimary text-uniprimary hover:bg-uniprimary/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?tab=register">
                  <Button className="bg-uniprimary hover:bg-uniprimary-dark text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ShoppingCart />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium px-4 py-2 rounded-md ${
                  location.pathname === "/"
                    ? "bg-uniprimary/10 text-uniprimary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`font-medium px-4 py-2 rounded-md ${
                  location.pathname === "/shop"
                    ? "bg-uniprimary/10 text-uniprimary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Shop
              </Link>
              <a
                href="#features"
                className="font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Features
              </a>
              <Link
                to="/designer-application"
                className={`font-medium px-4 py-2 rounded-md ${
                  location.pathname === "/designer-application"
                    ? "bg-uniprimary/10 text-uniprimary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                For Designers
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?tab=register"
                    className="font-medium px-4 py-2 rounded-md bg-uniprimary text-white hover:bg-uniprimary-dark"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
