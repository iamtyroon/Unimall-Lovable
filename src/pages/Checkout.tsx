
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    email: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'country', 'postalCode', 'email'];
    const emptyFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Please complete all required fields",
        description: "Some required information is missing",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/order-confirmation');
      
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been confirmed!",
        duration: 3000,
      });
    }, 2000);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to your cart before checking out</p>
            <Button 
              className="bg-uniprimary hover:bg-uniprimary-dark text-white"
              onClick={() => navigate('/shop')}
            >
              Browse Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="address">Street Address*</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city">City*</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country*</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingInfoChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code*</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingInfoChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="mr-2 h-5 w-5 text-uniprimary" />
                        <span>Credit/Debit Card</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center cursor-pointer flex-1">
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.5 19H5.25C4.65 19 4.19 18.54 4.06 17.95L2.25 9.5H5.25C7 9.5 8.25 10.75 8.25 12.5C8.25 14.25 7 15.5 5.25 15.5H2.25" stroke="#1F3A93" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.75 19H13.5C12.9 19 12.44 18.54 12.31 17.95L10.5 9.5H13.5C15.25 9.5 16.5 10.75 16.5 12.5C16.5 14.25 15.25 15.5 13.5 15.5H10.5" stroke="#00A2E8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.75 9.5L14.25 5.5H8.25L9.75 9.5" stroke="#1F3A93" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>PayPal</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="applepay" id="applepay" />
                      <Label htmlFor="applepay" className="flex items-center cursor-pointer flex-1">
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.5 15H14.25C12.875 15 12 14.125 12 12.75V11.25C12 9.875 12.875 9 14.25 9H16.5C17.875 9 18.75 9.875 18.75 11.25V12.75C18.75 14.125 17.875 15 16.5 15Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 17.5C9 18.3284 8.32843 19 7.5 19C6.67157 19 6 18.3284 6 17.5C6 16.6716 6.67157 16 7.5 16C8.32843 16 9 16.6716 9 17.5Z" fill="#292D32"/>
                          <path d="M18.7499 8.5H17.2499M8.25 5.5H5.25C4.65 5.5 4.19 5.96 4.06 6.55L2.25 15V17.95C2.25 18.54 2.71 19 3.31 19H9M19.5 17.5H5.25" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Apple Pay</span>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          placeholder="John Doe"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center mt-6 text-gray-600 text-sm">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-uniprimary hover:bg-uniprimary-dark text-white py-6 text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>
            
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>$0.00</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-uniprimary">{cartTotal}</span>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">Your order is protected by our secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
