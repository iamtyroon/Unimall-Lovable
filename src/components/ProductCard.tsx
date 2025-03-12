
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          className={`absolute top-3 right-3 bg-white rounded-full p-2 shadow-md transition-colors ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-uniprimary font-semibold mb-4">{product.price}</p>
        <div className="flex space-x-2">
          <Button 
            className="flex-grow bg-uniprimary hover:bg-uniprimary-dark text-white"
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button 
            variant="outline" 
            className="border-uniprimary text-uniprimary hover:bg-uniprimary/10"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
