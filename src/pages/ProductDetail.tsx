
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Share2, ArrowLeft, Star, Plus, Minus } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Sample product data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    name: "Casual White Tee",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual",
    description: "Our classic white t-shirt is perfect for everyday wear. Made from 100% organic cotton, it's soft, comfortable, and durable, ensuring it will be a staple in your wardrobe for years to come.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    rating: 4.5,
    reviews: 124,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual",
    description: "This classic denim jacket combines timeless style with modern comfort. Perfect for layering in any season, its versatile design complements any outfit, making it an essential addition to your wardrobe.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Light Wash"],
    rating: 4.8,
    reviews: 89,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  },
  {
    id: 3,
    name: "Black Jeans",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual",
    description: "Our premium black jeans offer both style and comfort for everyday wear. Made from high-quality stretch denim, these jeans provide the perfect fit while maintaining their shape throughout the day.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black", "Dark Blue", "Gray"],
    rating: 4.2,
    reviews: 156,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  },
  {
    id: 4,
    name: "Professional Blazer",
    price: "$45.99",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300&h=400",
    category: "formal",
    description: "Elevate your professional wardrobe with our tailored blazer. Designed with attention to detail, this blazer offers a sleek silhouette and comfortable fit, perfect for office wear or special occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1551163943-3f7318ab622b?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  },
  {
    id: 5,
    name: "Formal Shirt",
    price: "$22.99",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=400",
    category: "formal",
    description: "Our formal shirt combines crisp professional styling with all-day comfort. Made from high-quality cotton blend, it features a classic cut that transitions seamlessly from office to evening occasions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"],
    rating: 4.4,
    reviews: 103,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1551163943-3f7318ab622b?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  },
  {
    id: 6,
    name: "Pleated Skirt",
    price: "$27.99",
    image: "https://images.unsplash.com/photo-1551163943-3f7318ab622b?auto=format&fit=crop&q=80&w=300&h=400",
    category: "formal",
    description: "Add elegant sophistication to your wardrobe with our pleated skirt. The flowing design provides both comfort and style, making it perfect for professional settings or upscale social gatherings.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy"],
    rating: 4.6,
    reviews: 78,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1551163943-3f7318ab622b?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  },
  {
    id: 7,
    name: "Summer Dress",
    price: "$31.99",
    image: "https://images.unsplash.com/photo-1623609163841-5e69d8c62cc7?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual",
    description: "Embrace the summer season with our light and airy dress. Featuring a flattering silhouette and breathable fabric, this dress will keep you cool and stylish during warm weather days.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral", "Solid Blue", "Yellow"],
    rating: 4.3,
    reviews: 91,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1623609163841-5e69d8c62cc7?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  },
  {
    id: 8,
    name: "Winter Sweater",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=300&h=400",
    category: "casual",
    description: "Stay warm and fashionable during colder months with our cozy winter sweater. Knit from soft yarn, this sweater provides exceptional comfort while its classic design ensures timeless style.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Gray", "Navy"],
    rating: 4.9,
    reviews: 112,
    inStock: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1623609163841-5e69d8c62cc7?auto=format&fit=crop&q=80&w=300&h=400",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300&h=400"
    ]
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "You need to select a color before adding to cart",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    addToCart({
      ...product,
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg overflow-hidden h-96">
                <img 
                  src={product.additionalImages[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex space-x-2">
                {product.additionalImages.map((image, index) => (
                  <button 
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-uniprimary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5" 
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      color={i < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db"} 
                    />
                  ))}
                </div>
                <span className="text-yellow-500 font-medium">{product.rating}</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-500">{product.reviews} reviews</span>
              </div>
              
              <p className="text-2xl font-bold text-uniprimary mb-6">{product.price}</p>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size 
                          ? 'bg-uniprimary text-white border-uniprimary' 
                          : 'border-gray-300 hover:border-uniprimary'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`px-4 py-2 border rounded-md ${
                        selectedColor === color 
                          ? 'bg-uniprimary text-white border-uniprimary' 
                          : 'border-gray-300 hover:border-uniprimary'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center max-w-[140px] border rounded-md">
                  <button
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex-1 text-center py-2">{quantity}</span>
                  <button
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  className="flex-grow bg-uniprimary hover:bg-uniprimary-dark text-white py-6"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className={`border-gray-300 ${
                    isFavorite ? 'text-red-500' : 'text-gray-700'
                  }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="text-sm bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">Availability:</span>{' '}
                  {product.inStock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold text-gray-900">Category:</span> {product.category}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="delivery">Shipping & Returns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-4">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Product Details</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, velit velit bibendum velit, vel bibendum bibendum velit vel bibendum bibendum.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>High-quality materials for durability and comfort</li>
                    <li>Versatile design suitable for various occasions</li>
                    <li>Easy care instructions for long-lasting wear</li>
                    <li>Available in multiple sizes and colors</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-4">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-5 w-5" 
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                          color={i < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db"} 
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold">{product.rating}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-500">{product.reviews} reviews</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4" 
                              fill={i < 5 ? "currentColor" : "none"}
                              color={i < 5 ? "#f59e0b" : "#d1d5db"} 
                            />
                          ))}
                        </div>
                        <span className="font-medium">Sarah J.</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700">Absolutely love this! The quality is excellent and it fits perfectly. Highly recommend to anyone considering it.</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4" 
                              fill={i < 4 ? "currentColor" : "none"}
                              color={i < 4 ? "#f59e0b" : "#d1d5db"} 
                            />
                          ))}
                        </div>
                        <span className="font-medium">Michael T.</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-gray-500">1 week ago</span>
                      </div>
                      <p className="text-gray-700">Great product for the price. The material is comfortable and seems durable. Would buy again in different colors.</p>
                    </div>
                    
                    <Button variant="outline" className="w-full">Load More Reviews</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="delivery" className="py-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Shipping Information</h3>
                    <p className="text-gray-600">We offer standard shipping on all orders, which typically takes 3-5 business days. Express shipping is available for an additional fee, with delivery in 1-2 business days.</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">Return Policy</h3>
                    <p className="text-gray-600">If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. The item must be unworn and in its original condition with tags attached.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div 
                    key={relatedProduct.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 truncate">{relatedProduct.name}</h3>
                      <p className="text-uniprimary font-semibold">{relatedProduct.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
