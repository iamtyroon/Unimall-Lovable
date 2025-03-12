
import { Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10 text-white" />,
    title: "Discover",
    description: "Browse through a curated selection of affordable, locally sourced fashion items."
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-white" />,
    title: "Shop",
    description: "Add your favorite items to cart and checkout with our secure payment system."
  },
  {
    icon: <Truck className="h-10 w-10 text-white" />,
    title: "Receive",
    description: "Get your stylish, budget-friendly clothes delivered right to your doorstep."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            How <span className="text-uniprimary">Unimall</span> Works
          </h2>
          <p className="text-gray-600">
            Our simple process connects you with affordable, stylish clothing in just a few steps.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-10 md:space-y-0 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-1 bg-uniprimary-light/30"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center max-w-xs z-10"
            >
              <div className="bg-gradient-to-br from-uniprimary to-uniprimary-dark rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
