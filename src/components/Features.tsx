
import { ShoppingBag, Palette, TrendingUp, Heart } from "lucide-react";

const features = [
  {
    icon: <ShoppingBag className="h-8 w-8 text-uniprimary" />,
    title: "Budget-Friendly Shopping",
    description: "Access high-quality, affordable clothing that fits your style and budget."
  },
  {
    icon: <Palette className="h-8 w-8 text-uniprimary" />,
    title: "Support Young Designers",
    description: "Empower aspiring fashion designers to showcase their creativity and earn."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-uniprimary" />,
    title: "Latest Trends",
    description: "Stay updated with the newest fashion trends curated for students and young adults."
  },
  {
    icon: <Heart className="h-8 w-8 text-uniprimary" />,
    title: "Community-Driven",
    description: "Join a vibrant community of fashion enthusiasts, designers, and students."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-unimuted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Revolutionizing <span className="text-uniprimary">Fashion</span> For Students
          </h2>
          <p className="text-gray-600">
            Unimall makes stylish, high-quality clothing accessible to everyone, 
            especially students and budget-conscious shoppers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-unimuted rounded-full w-16 h-16 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
