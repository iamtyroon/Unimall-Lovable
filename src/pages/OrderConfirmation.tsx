
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = `UNI-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Generate a random delivery date (3-5 business days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for shopping with Unimall. Your order has been received and is being processed.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-sm text-gray-600 mb-1">Order Number</h2>
                  <p className="font-bold text-lg">{orderNumber}</p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-600 mb-1">Estimated Delivery</h2>
                  <p className="font-bold text-lg">{formattedDeliveryDate}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-uniprimary h-full w-1/4 rounded-full"></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-6 w-6 text-uniprimary mb-1" />
                  <span>Confirmed</span>
                </div>
                <div className="flex flex-col items-center">
                  <Package className="h-6 w-6 text-gray-400 mb-1" />
                  <span>Processing</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="h-6 w-6 text-gray-400 mb-1" />
                  <span>Shipped</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-6 w-6 text-gray-400 mb-1" />
                  <span>Delivered</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">
              We've sent a confirmation email with all the details of your order. 
              You can track your order status using the order number above.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                className="bg-uniprimary hover:bg-uniprimary-dark text-white"
                asChild
              >
                <Link to="/shop">
                  Continue Shopping
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-uniprimary text-uniprimary hover:bg-uniprimary/10"
              >
                <span>Track Order</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold mb-4">We value your feedback!</h2>
            <p className="text-gray-600 mb-6">
              How was your shopping experience with Unimall? Your feedback helps us improve.
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button 
                  key={rating}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
