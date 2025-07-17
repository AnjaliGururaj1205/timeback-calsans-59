import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Store email for later use if needed
      localStorage.setItem('userEmail', email);
      navigate('/about');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-surface-primary via-surface-secondary to-brand-secondary/10">
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/4eb150f2-6ac1-4c7f-9112-13fd94c64a90.png" 
            alt="TimeBack" 
            className="h-16 mx-auto object-contain"
          />
        </div>
        
        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-cal text-center" style={{ color: '#0033cc' }}>
            Give Your Kid Their Time Back
          </h1>
          <p className="text-lg md:text-xl" style={{ color: '#66b2ff' }}>
            Master academics in just 2 hours a day with AI-powered learning
          </p>
        </div>

        {/* Email Collection Form */}
        <form onSubmit={handleGetStarted} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 text-lg rounded-lg border-2 border-brand-primary/20 focus:border-brand-primary"
          />
          <Button 
            type="submit"
            size="lg" 
            className="w-full bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-300 hover:scale-105 font-system"
          >
            Get Started
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;