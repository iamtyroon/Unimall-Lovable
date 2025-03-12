
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

export function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingBag className="h-5 w-5 mr-1" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-uniprimary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2 h-6 w-6" />
            Your Shopping Cart
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
            <SheetClose asChild>
              <Button
                className="bg-uniprimary hover:bg-uniprimary-dark text-white"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex py-4 border-b">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-gray-200">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-uniprimary font-medium">{item.price}</p>
                      <div className="flex items-center border rounded">
                        <button
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 py-1 min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-auto">
              <div className="flex justify-between font-medium text-lg mb-4">
                <span>Total:</span>
                <span className="text-uniprimary">{cartTotal}</span>
              </div>
              <div className="space-y-3">
                <SheetClose asChild>
                  <Button 
                    className="w-full bg-uniprimary hover:bg-uniprimary-dark text-white"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button 
                    variant="outline" 
                    className="w-full border-uniprimary text-uniprimary hover:bg-uniprimary/10"
                    onClick={() => navigate('/shop')}
                  >
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default ShoppingCart;
