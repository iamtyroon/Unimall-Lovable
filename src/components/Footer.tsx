
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h1 className="text-2xl font-display font-bold mb-6">
              <span className="text-unisecondary">Uni</span>
              <span className="text-white">mall</span>
            </h1>
            <p className="text-gray-400 mb-6">
              Revolutionizing affordable fashion for students and beyond. 
              Making stylish, high-quality clothing accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#for-designers" className="text-gray-400 hover:text-white transition-colors">For Designers</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Student Discount</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Kenyatta University, Nairobi</li>
              <li>support@unimall.com</li>
              <li>+254 123 456 789</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Unimall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
