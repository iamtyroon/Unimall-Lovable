
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="max-w-xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Affordable Fashion
                <span className="text-uniprimary block">For Everyone</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Unimall connects students and budget-conscious shoppers with 
                locally sourced, high-quality, and affordable fashion. 
                Discover stylish clothing that won't break the bank.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="w-full sm:w-auto bg-uniprimary hover:bg-uniprimary-dark text-white px-8 py-6 text-lg">
                  Start Shopping <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-uniprimary text-uniprimary hover:bg-uniprimary/10 px-8 py-6 text-lg">
                  For Designers <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[500px] w-full">
              {/* Main phone mockup */}
              <div className="absolute top-0 right-0 lg:right-10 w-64 h-auto shadow-2xl rounded-3xl overflow-hidden border-8 border-gray-800 animate-float z-20">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Unimall app mockup" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-32 left-0 w-56 h-56 bg-uniprimary/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-unisecondary/20 rounded-full filter blur-3xl"></div>
              
              {/* Floating elements */}
              <div className="absolute top-80 left-4 w-48 h-auto shadow-lg rounded-xl overflow-hidden border-4 border-white animate-float z-10" style={{animationDelay: "1s"}}>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                  alt="Shopping experience" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
