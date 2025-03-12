
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, FilterIcon, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Sample product data
const products = [
  {
    id: 1,
    name: "Casual White Tee",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual"
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual"
  },
  {
    id: 3,
    name: "Black Jeans",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual"
  },
  {
    id: 4,
    name: "Professional Blazer",
    price: "$45.99",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300&h=400",
    category: "formal"
  },
  {
    id: 5,
    name: "Formal Shirt",
    price: "$22.99",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=400",
    category: "formal"
  },
  {
    id: 6,
    name: "Pleated Skirt",
    price: "$27.99",
    image: "https://images.unsplash.com/photo-1551163943-3f7318ab622b?auto=format&fit=crop&q=80&w=300&h=400",
    category: "formal"
  },
  {
    id: 7,
    name: "Summer Dress",
    price: "$31.99",
    image: "https://images.unsplash.com/photo-1623609163841-5e69d8c62cc7?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual"
  },
  {
    id: 8,
    name: "Winter Sweater",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual"
  }
];

const Shopping = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section className="mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Browse <span className="text-uniprimary">Products</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Discover our curated collection of affordable, stylish clothing for every occasion.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
            
            {/* Category Tabs */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setActiveCategory("all")}
                  className="px-6"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="casual" 
                  onClick={() => setActiveCategory("casual")}
                  className="px-6"
                >
                  Casual Wear
                </TabsTrigger>
                <TabsTrigger 
                  value="formal" 
                  onClick={() => setActiveCategory("formal")}
                  className="px-6"
                >
                  Formal Collection
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="casual" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="formal" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shopping;
