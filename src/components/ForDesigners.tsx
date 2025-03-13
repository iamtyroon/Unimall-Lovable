
import { Button } from "@/components/ui/button";
import { ChevronRight, Palette, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: <Palette className="h-6 w-6 text-uniprimary" />,
    title: "Showcase Your Creativity",
    description: "Display your unique designs and styling ideas to a community of fashion enthusiasts."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-unisecondary" />,
    title: "Build Your Portfolio",
    description: "Create a professional portfolio to jumpstart your career in the fashion industry."
  },
  {
    icon: <DollarSign className="h-6 w-6 text-uniprimary" />,
    title: "Earn While You Learn",
    description: "Turn your passion into profit by earning income from your design combinations."
  }
];

const ForDesigners = () => {
  return (
    <section id="for-designers" className="py-20 bg-gradient-to-br from-uniprimary/5 to-unisecondary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="max-w-xl">
              <span className="text-unisecondary font-semibold mb-2 block">FOR FASHION STUDENTS & DESIGNERS</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Launch Your Fashion Career <span className="text-uniprimary">Today</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Unimall empowers fashion students and emerging designers to showcase their talent, 
                build their portfolio, and earn income while gaining real-world experience. 
                Turn your passion into a career opportunity.
              </p>
              
              <div className="space-y-6 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 p-2 bg-white rounded-lg shadow-sm">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/designer-application">
                <Button className="bg-unisecondary hover:bg-unisecondary-dark text-white">
                  Join as a Designer <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative h-[450px]">
              <div className="absolute top-0 right-0 w-72 h-96 bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Fashion designer working" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-uniprimary to-unisecondary opacity-10 rounded-full"></div>
              <div className="absolute top-20 left-10 w-48 h-64 bg-white rounded-lg shadow-lg overflow-hidden transform -rotate-6">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Student designer" 
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

export default ForDesigners;
