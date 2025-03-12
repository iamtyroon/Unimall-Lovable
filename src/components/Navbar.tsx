
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-display font-bold text-uniprimary">
            <span className="text-unisecondary">Uni</span>mall
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="font-medium text-gray-700 hover:text-uniprimary transition-colors">Features</a>
          <a href="#how-it-works" className="font-medium text-gray-700 hover:text-uniprimary transition-colors">How It Works</a>
          <a href="#for-designers" className="font-medium text-gray-700 hover:text-uniprimary transition-colors">For Designers</a>
          <a href="#products" className="font-medium text-gray-700 hover:text-uniprimary transition-colors">Products</a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button className="bg-uniprimary hover:bg-uniprimary-dark text-white">
            Get the App
          </Button>
        </div>
        
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#features" className="font-medium text-gray-700 py-2 hover:text-uniprimary transition-colors">Features</a>
            <a href="#how-it-works" className="font-medium text-gray-700 py-2 hover:text-uniprimary transition-colors">How It Works</a>
            <a href="#for-designers" className="font-medium text-gray-700 py-2 hover:text-uniprimary transition-colors">For Designers</a>
            <a href="#products" className="font-medium text-gray-700 py-2 hover:text-uniprimary transition-colors">Products</a>
            <Button className="bg-uniprimary hover:bg-uniprimary-dark text-white w-full">
              Get the App
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
