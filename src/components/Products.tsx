
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

// Sample product data
const productCategories = [
  {
    name: "Casual Wear",
    items: [
      {
        id: 1,
        name: "Casual White Tee",
        price: "$15.99",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: 2,
        name: "Denim Jacket",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
      },
      {
        id: 3,
        name: "Black Jeans",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      }
    ]
  },
  {
    name: "Formal Collection",
    items: [
      {
        id: 4,
        name: "Professional Blazer",
        price: "$45.99",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      },
      {
        id: 5,
        name: "Formal Shirt",
        price: "$22.99",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: 6,
        name: "Pleated Skirt",
        price: "$27.99",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
      }
    ]
  }
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Trending <span className="text-uniprimary">Products</span>
          </h2>
          <p className="text-gray-600">
            Discover our collection of affordable, stylish clothing for every occasion.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-unimuted rounded-full p-1">
            {productCategories.map((category, index) => (
              <button
                key={index}
                className={`py-2 px-5 rounded-full font-medium text-sm transition-colors ${
                  activeCategory === index 
                    ? 'bg-uniprimary text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Carousel */}
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 text-gray-500" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-8 px-4 -mx-4 snap-x"
          >
            {productCategories[activeCategory].items.map((product) => (
              <div 
                key={product.id}
                className="flex-none w-64 mx-4 snap-start"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-uniprimary font-semibold mb-3">{product.price}</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-uniprimary text-uniprimary hover:bg-uniprimary/10"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow focus:outline-none"
          >
            <ChevronRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/shop">
            <Button className="bg-uniprimary hover:bg-uniprimary-dark text-white px-8">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
