
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const designerSchema = z.object({
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  specialty: z.string().min(1, "Please select a specialty"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  portfolioUrl: z.string().url("Please enter a valid URL"),
});

type DesignerFormValues = z.infer<typeof designerSchema>;

const DesignerApplication = () => {
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DesignerFormValues>({
    resolver: zodResolver(designerSchema),
    defaultValues: {
      bio: "",
      specialty: "",
      experienceLevel: "",
      portfolioUrl: "",
    },
  });

  const onSubmit = async (data: DesignerFormValues) => {
    if (!user) {
      toast.error("You must be logged in to apply as a designer");
      navigate('/auth?tab=register');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('designer_profiles')
        .insert({
          id: user.id,
          bio: data.bio,
          specialty: data.specialty,
          experience_level: data.experienceLevel,
          portfolio_url: data.portfolioUrl,
        });
        
      if (error) {
        throw error;
      }
      
      toast.success("Application submitted successfully! We'll review it and get back to you.");
      navigate('/');
    } catch (error: any) {
      console.error('Error submitting designer application:', error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not logged in, redirect to auth page
  if (!loading && !user) {
    toast.info("Please sign in or create an account to apply as a designer");
    navigate('/auth?tab=register');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">
              Join Unimall as a <span className="text-uniprimary">Designer</span>
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Showcase your talent, build your portfolio, and earn income through your designs
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your background, and why you want to join Unimall as a designer"
                  className="h-32"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm">{errors.bio.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Controller
                  control={control}
                  name="specialty"
                  render={({ field }) => (
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual Wear</SelectItem>
                        <SelectItem value="formal">Formal Wear</SelectItem>
                        <SelectItem value="streetwear">Streetwear</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.specialty && (
                  <p className="text-red-500 text-sm">{errors.specialty.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Controller
                  control={control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Fashion Student</SelectItem>
                        <SelectItem value="graduate">Recent Graduate</SelectItem>
                        <SelectItem value="junior">Junior Designer (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-Level Designer (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Designer (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.experienceLevel && (
                  <p className="text-red-500 text-sm">{errors.experienceLevel.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                  id="portfolioUrl"
                  type="url"
                  placeholder="https://your-portfolio.com"
                  {...register("portfolioUrl")}
                />
                {errors.portfolioUrl && (
                  <p className="text-red-500 text-sm">{errors.portfolioUrl.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-unisecondary hover:bg-unisecondary/90 text-white py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DesignerApplication;
