import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { InteractiveTestimonial } from "@/components/InteractiveTestimonial";
import { InteractiveUSMap } from "@/components/InteractiveUSMap";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DemoVideoPlayer } from "@/components/DemoVideoPlayer";
import { LearningPathComparison } from "@/components/LearningPathComparison";
import { InteractiveLearningScience } from "@/components/InteractiveLearningScience";
import { LearningTimeline } from "@/components/LearningTimeline";
import { AnimatedDiagrams } from "@/components/AnimatedDiagrams";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TestimonialGrid } from "@/components/TestimonialGrid";
import { SuccessStoryTimeline } from "@/components/SuccessStoryTimeline";
import { TrustIndicators } from "@/components/TrustIndicators";
import { FAQSection } from "@/components/FAQSection";
import { FloatingFAQHelper } from "@/components/FloatingFAQHelper";
import { MultiStepForm } from "@/components/MultiStepForm";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { z } from "zod";

// Email validation schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
});

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const fullText = "COMING IN 2026";

  useEffect(() => {
    let currentIndex = 0;
    let isPaused = false;
    
    const typewriterInterval = setInterval(() => {
      if (!isPaused && currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else if (!isPaused && currentIndex > fullText.length) {
        // Pause at the end before starting fade out
        isPaused = true;
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            setTypewriterText("");
            currentIndex = 0;
            setIsVisible(true);
            isPaused = false;
          }, 500); // Wait for fade out to complete
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, []);

  // Scroll scaling effect for stats only
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.stats-scale-element');
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(elementCenterY - centerY);
        const maxDistance = viewportHeight / 2;
        
        // Calculate scale based on distance from center (1x to 1.35x) - reduced by 30%
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        const scale = 1.35 - (normalizedDistance * 0.35);
        
        (element as HTMLElement).style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting: prevent submissions within 2 seconds
    const now = Date.now();
    if (now - lastSubmissionTime < 2000) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before submitting again.",
        variant: "destructive",
      });
      return;
    }

    // Validate email
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(now);

    try {
      // Check if email already exists
      const { data: existingEmail, error: checkError } = await supabase
        .from('email_signups')
        .select('email')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing email:', checkError);
        throw new Error('Failed to verify email');
      }

      if (existingEmail) {
        toast({
          title: "Already registered!",
          description: "This email is already on our waitlist. We'll notify you when Timeback launches!",
        });
        setEmail("");
        return;
      }

      // Insert new email signup
      const { error: insertError } = await supabase
        .from('email_signups')
        .insert([{ email: email.toLowerCase() }]);

      if (insertError) {
        console.error('Error inserting email:', insertError);
        throw new Error('Failed to save email');
      }

      toast({
        title: "Thanks for signing up!",
        description: "We'll notify you when Timeback launches in 2026.",
      });
      setEmail("");
      
      // Scroll to About section
      setTimeout(() => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    } catch (error) {
      console.error('Email submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary">
      {/* Main Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8 lg:space-y-12">
          {/* Logo */}
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png" 
              alt="Timeback - Learning just got schooled"
              className="mx-auto w-60 md:w-72 h-auto"
              style={{ opacity: 0.95 }}
            />
          </div>

          {/* Main Headline with improved hierarchy */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cal leading-tight text-brand-secondary">
              {/* Mobile version - optimized spacing */}
              <div className="block md:hidden">
                <div className="mb-2">Your kid can crush academics</div>
                <div>in only 2 hours per day</div>
              </div>
              {/* Desktop/Tablet version */}
              <div className="hidden md:block">
                <div>Your kid can crush academics</div>
                <div className="mt-2">in only 2 hours per day</div>
              </div>
            </h1>
          </div>

          {/* Email Signup with improved UX */}
          <div className="max-w-md mx-auto animate-fade-in-up delay-200">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-base border-2 border-brand-secondary bg-brand-secondary text-brand-primary placeholder:text-brand-primary/70 rounded-xl font-medium focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all"
                  disabled={isSubmitting}
                  required
                  aria-label="Email address for Timeback updates"
                />
                <Button 
                  type="submit"
                  className="h-12 px-8 bg-white text-brand-secondary hover:bg-surface-secondary hover:scale-105 focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-cal"
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? "Submitting..." : "Get started with Timeback"}
                >
                  {isSubmitting ? "..." : "Get Started"}
                </Button>
              </div>
            </form>
          </div>

          {/* Coming Soon Message with improved accessibility */}
          <div className="animate-fade-in-up delay-300">
            <div className="h-7 flex items-center justify-center">
              <p 
                className={`text-lg font-medium font-cal text-brand-secondary transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                aria-live="polite"
                aria-label="Coming soon announcement"
              >
                {typewriterText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with improved spacing and hierarchy */}
      <section ref={aboutRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-brand-primary">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cal text-brand-secondary">
            About
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-brand-secondary opacity-90">
            TimeBack is the AI-powered EducationOS behind Alpha schools, empowering kids to master their academics in just 2 hours a day—freeing up the rest of the day for what they love. Built on learning science, it generates personalized lessons, optimal lesson plans, and AI coaching to create self-driven learners. Independent standardized tests confirm learning gains up to 10× faster.
          </p>
          
          {/* Action Buttons with improved accessibility */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { role: "Parent", path: "/dashboard" },
              { role: "Government", path: "/dashboard" },
              { role: "Philanthropist", path: "/dashboard" },
              { role: "School", path: "/dashboard" },
              { role: "Entrepreneur", path: "/dashboard" }
            ].map(({ role, path }, index) => (
              <Button 
                key={role}
                className="h-12 px-6 bg-white text-blue-800 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 font-semibold rounded-full font-cal"
                onClick={() => {
                  if (index === 0) {
                    parentRef.current?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = path;
                  }
                }}
                aria-label={`Learn more about Timeback for ${role.toLowerCase()}s`}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Proof Section */}
      <section className="min-h-screen bg-gradient-to-br from-surface-primary via-surface-secondary to-brand-secondary/5 px-4 py-20" aria-labelledby="proof-heading">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Section Header */}
          <div className="text-center space-y-6">
            <h2 id="proof-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold font-cal" style={{ color: '#0033cc' }}>
              Proven Results That Speak for Themselves
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#66b2ff' }}>
              Independent testing confirms what our families already know: Alpha students consistently outperform traditional education by remarkable margins.
            </p>
          </div>

          {/* Animated Dashboard Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-card via-surface-secondary to-brand-accent/5 border border-border/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold text-brand-secondary">SAT</span>
                </div>
                <AnimatedCounter 
                  end={1535} 
                  className="text-5xl md:text-6xl font-cal font-bold text-brand-secondary"
                />
                <h3 className="text-xl md:text-2xl font-cal font-semibold text-text-brand">
                  Average SAT Score
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  Highest in Texas — 300+ points above state average
                </p>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-card via-surface-secondary to-brand-secondary/5 border border-border/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-brand-secondary">%</span>
                </div>
                <div className="flex items-center justify-center">
                  <AnimatedCounter 
                    end={99} 
                    suffix="th"
                    className="text-5xl md:text-6xl font-cal font-bold text-brand-secondary"
                  />
                  <span className="text-3xl font-cal font-bold text-brand-secondary ml-1">%</span>
                </div>
                <h3 className="text-xl md:text-2xl font-cal font-semibold text-text-brand">
                  Academic Percentile
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  Outperforming 99% of peers nationwide in standardized testing
                </p>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-card via-surface-secondary to-green-500/5 border border-border/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-green-500">10x</span>
                </div>
                <div className="flex items-center justify-center">
                  <AnimatedCounter 
                    end={10} 
                    suffix="x"
                    className="text-5xl md:text-6xl font-cal font-bold text-green-500"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-cal font-semibold text-text-brand">
                  Learning Acceleration
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  Up to 10x faster learning gains than traditional methods
                </p>
              </div>
            </div>
          </div>

          {/* Before/After Comparison Cards */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand mb-4">
                Real Student Transformations
              </h3>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                See the dramatic improvements our students achieve across key academic metrics
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <BeforeAfterCard
                title="Reading Comprehension"
                beforeValue="32nd percentile"
                afterValue="94th percentile"
                description="Average improvement after 6 months with Timeback's adaptive reading program"
                icon={<span className="text-2xl text-brand-secondary font-bold">READ</span>}
              />
              
              <BeforeAfterCard
                title="Math Proficiency"
                beforeValue="Grade level 4.2"
                afterValue="Grade level 7.8"
                description="Students advance 3.6 grade levels in mathematics within one academic year"
                icon={<span className="text-2xl text-brand-secondary font-bold">MATH</span>}
              />
              
              <BeforeAfterCard
                title="Learning Confidence"
                beforeValue="38% motivated"
                afterValue="96% engaged"
                description="Students report significantly higher engagement and love for learning"
                icon={<span className="text-2xl text-green-500 font-bold">GOAL</span>}
              />
            </div>
          </div>

          {/* Interactive Testimonials */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand mb-4">
                Hear From Our Families
              </h3>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Real stories from parents and educators who've witnessed the transformation
              </p>
            </div>
            
            <InteractiveTestimonial />
          </div>

          {/* Interactive US Map */}
          <div className="space-y-12">
            <InteractiveUSMap />
          </div>

        </div>
      </section>

      {/* Why Our AI is Different Section */}
      <section className="min-h-screen bg-gradient-to-br from-surface-primary via-surface-secondary to-brand-secondary/5 px-4 py-20" aria-labelledby="ai-different-heading">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center space-y-6">
            <h2 id="ai-different-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold font-cal" style={{ color: '#0033cc' }}>
              Why Our AI is Different
            </h2>
            <div className="space-y-4">
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#66b2ff' }}>
                Move beyond chatbots. Experience the next generation of AI-powered education that sees, understands, and adapts in real-time.
              </p>
              <Button
                onClick={() => navigate("/comparison")}
                variant="ghost"
                className="text-brand-secondary hover:text-brand-secondary/80 hover:bg-brand-secondary/10 text-base font-medium"
              >
                See more <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Demo Video Player */}
          <div className="space-y-8">
            <DemoVideoPlayer />
          </div>

          {/* Learning Path Comparison */}
          <div className="space-y-8">
            <LearningPathComparison />
          </div>

        </div>
      </section>

      {/* Learning Science Section */}
      <section className="min-h-screen bg-gradient-to-br from-surface-primary via-surface-secondary to-brand-secondary/5 px-4 py-20" aria-labelledby="science-heading">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center space-y-6">
            <h2 id="science-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold font-cal" style={{ color: '#0033cc' }}>
              Built on Learning Science
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#66b2ff' }}>
              Four decades of educational research powers every aspect of Timeback's approach to accelerated learning
            </p>
          </div>

          {/* Learning Timeline */}
          <LearningTimeline />

          {/* Interactive Learning Science Principles */}
          <InteractiveLearningScience />

          {/* Animated Diagrams */}
          <AnimatedDiagrams />

        </div>
      </section>



      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-surface-primary via-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {/* Compact What People Are Saying */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-cal font-bold mb-4" style={{ color: '#0033cc' }}>
              Hear From Our Community
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: '#66b2ff' }}>
              Real stories from parents, students, and educators
            </p>
          </div>
          
          {/* Video Testimonials */}
          <VideoTestimonials />
          
          {/* Trust Indicators */}
          <TrustIndicators />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-24 bg-gradient-to-b from-black via-surface-primary to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-surface-primary via-gray-900 to-black text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-cal">
            Ready to Give Your Kid Their Time Back?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-system">
            For people who want more
          </p>
          
          <MultiStepForm />
        </div>
        
        {/* Timeback Branding Section */}
        <div className="mt-16 py-16 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <img 
                src="/lovable-uploads/4eb150f2-6ac1-4c7f-9112-13fd94c64a90.png" 
                alt="TimeBack" 
                className="h-16 md:h-24 lg:h-32 mx-auto object-contain"
              />
            </div>
            
            {/* Footer Links */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8 text-left max-w-4xl mx-auto">
              <div className="space-y-4">
                <h4 className="text-white font-semibold">How It Works</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">What's Included</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Get Started</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Learning</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Science</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Social</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </section>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Floating FAQ Helper */}
      <FloatingFAQHelper />
    </div>
  );
};

export default Index;
