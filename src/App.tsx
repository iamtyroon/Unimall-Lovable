
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Shopping from "./pages/Shopping";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Auth from "./pages/Auth";
import DesignerApplication from "./pages/DesignerApplication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/shop" element={<Shopping />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/order-confirmation" element={<OrderConfirmation />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/designer-application" element={<DesignerApplication />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
