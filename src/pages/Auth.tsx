
import { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the tab from the URL if it exists
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const loginForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Update active tab when URL changes
    const tab = searchParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    } else if (tab === 'login') {
      setActiveTab('login');
    }
  }, [location.search, searchParams]);

  const handleSignIn = async (data: SignInFormValues) => {
    setIsSubmitting(true);
    const { error } = await signIn(data.email, data.password);
    setIsSubmitting(false);
    
    if (!error) {
      // Reset form on success
      loginForm.reset();
      toast.success("Successfully signed in!");
      navigate('/');
    }
  };

  const handleSignUp = async (data: SignUpFormValues) => {
    setIsSubmitting(true);
    
    const userData = {
      full_name: data.fullName,
      username: data.username,
    };
    
    const { error } = await signUp(data.email, data.password, userData);
    setIsSubmitting(false);
    
    if (!error) {
      // Reset form on success
      registerForm.reset();
      toast.success("Account created! Please check your email for confirmation.");
      // Switch to login tab to encourage signing in after registration
      setActiveTab("login");
    }
  };

  // If the user is already logged in, redirect to the home page
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-6 text-center">
              Welcome to <span className="text-uniprimary">Unimall</span>
            </h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...loginForm.register("email")}
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-uniprimary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...loginForm.register("password")}
                    />
                    {loginForm.formState.errors.password && (
                      <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-uniprimary hover:bg-uniprimary-dark text-white py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(handleSignUp)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      {...registerForm.register("fullName")}
                    />
                    {registerForm.formState.errors.fullName && (
                      <p className="text-red-500 text-sm">{registerForm.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      {...registerForm.register("username")}
                    />
                    {registerForm.formState.errors.username && (
                      <p className="text-red-500 text-sm">{registerForm.formState.errors.username.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...registerForm.register("email")}
                    />
                    {registerForm.formState.errors.email && (
                      <p className="text-red-500 text-sm">{registerForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...registerForm.register("password")}
                    />
                    {registerForm.formState.errors.password && (
                      <p className="text-red-500 text-sm">{registerForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-uniprimary hover:bg-uniprimary-dark text-white py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
