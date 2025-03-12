
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ForDesigners from "@/components/ForDesigners";
import Products from "@/components/Products";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ForDesigners />
      <Products />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
