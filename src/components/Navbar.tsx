
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ShoppingCart from "./ShoppingCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
            <a
              href="#for-designers"
              className="font-medium text-gray-700 hover:text-uniprimary transition-colors"
            >
              For Designers
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ShoppingCart />
            
            <Button variant="outline" className="border-uniprimary text-uniprimary hover:bg-uniprimary/10">
              Sign In
            </Button>
            <Button className="bg-uniprimary hover:bg-uniprimary-dark text-white">
              Sign Up
            </Button>
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
              <a
                href="#for-designers"
                className="font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                For Designers
              </a>
              <Link
                to="/sign-in"
                className="font-medium px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="font-medium px-4 py-2 rounded-md bg-uniprimary text-white hover:bg-uniprimary-dark"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
