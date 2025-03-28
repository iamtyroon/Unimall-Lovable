
import { Button } from "@/components/ui/button";
import { Download, Users, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const CTA = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-20 bg-gradient-to-r from-uniprimary to-uniprimary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Join the Unimall Revolution Today
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Be part of our growing community of students, designers, and fashion enthusiasts. 
            Discover affordable fashion that doesn't compromise on style or quality.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-uniprimary text-lg px-8 py-6">
              <Download className="mr-2 h-5 w-5" /> Get the App
            </Button>
            <Link to="/shop">
              <Button className="w-full sm:w-auto bg-unisecondary hover:bg-unisecondary/90 text-white text-lg px-8 py-6">
                <ShoppingBag className="mr-2 h-5 w-5" /> Start Shopping
              </Button>
            </Link>
            {user ? (
              <Link to="/designer-application">
                <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Users className="mr-2 h-5 w-5" /> Join as Designer
                </Button>
              </Link>
            ) : (
              <Link to="/auth?tab=register">
                <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Users className="mr-2 h-5 w-5" /> Sign Up Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
