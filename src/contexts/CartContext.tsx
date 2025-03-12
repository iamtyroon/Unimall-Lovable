
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: string;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<string>('$0.00');
  const [cartCount, setCartCount] = useState<number>(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('unimallCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('unimallCart', JSON.stringify(cartItems));
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace('$', ''));
      return sum + (priceValue * item.quantity);
    }, 0);
    
    setCartTotal(`$${total.toFixed(2)}`);
    
    // Calculate count
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
