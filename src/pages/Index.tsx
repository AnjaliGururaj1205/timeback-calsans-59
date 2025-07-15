import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
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
  const aboutRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
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
                  className="h-12 px-8 bg-brand-accent text-brand-secondary hover:bg-surface-secondary hover:scale-105 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-cal"
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
            {["Parent", "Government", "Philanthropist", "School", "Entrepreneur"].map((role, index) => (
              <Button 
                key={role}
                className="h-12 px-6 bg-brand-accent text-brand-secondary hover:bg-surface-secondary hover:scale-105 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 font-semibold rounded-full transition-all duration-200 font-cal"
                onClick={() => index === 0 ? parentRef.current?.scrollIntoView({ behavior: 'smooth' }) : undefined}
                aria-label={`Learn more about Timeback for ${role.toLowerCase()}s`}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider with improved semantics */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] py-12 bg-surface-secondary border-y border-border" aria-labelledby="glance-heading">
        <h2 id="glance-heading" className="text-2xl md:text-3xl text-center font-cal text-text-brand">
          Timeback at a glance
        </h2>
      </section>

      {/* Stats Section with improved accessibility and contrast */}
      <section className="bg-surface-primary px-4 py-20 relative overflow-hidden" aria-labelledby="stats-heading">
        {/* Accessible background decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-32 h-32 bg-brand-primary rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center space-y-16 relative z-10">
          <h2 id="stats-heading" className="sr-only">Key Performance Statistics</h2>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center">
            {/* Stat 1 - SAT Scores */}
            <article className="group bg-card border border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-5xl md:text-6xl font-cal font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  1535
                </div>
                <h3 className="text-xl md:text-2xl font-cal font-semibold mb-3 text-text-brand">
                  Average SAT Score
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  Average SAT score for seniors at Alpha — the highest in Texas
                </p>
              </div>
            </article>

            {/* Stat 2 - Performance */}
            <article className="group bg-card border border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-brand-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-5xl md:text-6xl font-cal font-bold mb-4 bg-gradient-to-r from-success to-brand-primary bg-clip-text text-transparent">
                  99th %ile
                </div>
                <h3 className="text-xl md:text-2xl font-cal font-semibold mb-3 text-text-brand">
                  Academic Performance
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  Students are outperforming 99% of peers in both academic achievement and growth
                </p>
              </div>
            </article>

            {/* Stat 3 - Learning Speed */}
            <article className="group bg-card border border-border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-warning/20 to-error/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-5xl md:text-6xl font-cal font-bold mb-4 bg-gradient-to-r from-warning to-error bg-clip-text text-transparent">
                  4x Faster
                </div>
                <h3 className="text-xl md:text-2xl font-cal font-semibold mb-3 text-text-brand">
                  Learning Speed
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                  Students using Timeback are learning up to 4x faster than traditional schools
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Learning Science Section with improved accessibility */}
      <section className="px-6 py-20 relative overflow-hidden bg-brand-primary" aria-labelledby="science-heading">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-20 w-60 h-60 bg-brand-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-brand-secondary rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Tab Navigation with improved accessibility */}
          <nav className="flex border-b border-text-inverse/20 mb-16 overflow-x-auto bg-brand-secondary rounded-2xl p-2 shadow-lg" role="tablist" aria-label="Learning approaches">
            {["Bloom's 2 Sigma", "Mastery Based Progression", "Personalized & Adaptive Learning", "Zone of Proximal Development"].map((tab, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === 0}
                aria-controls={`panel-${index}`}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent ${
                  index === 0
                    ? 'bg-brand-accent text-brand-secondary shadow-lg transform scale-105'
                    : 'text-text-inverse hover:text-text-secondary hover:bg-text-inverse/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Content Section with improved typography */}
          <div className="text-center mb-16" id="panel-0" role="tabpanel">
            <h2 id="science-heading" className="text-3xl md:text-4xl font-bold font-cal text-text-inverse mb-8">
              Built on 40 Years of Learning Science
            </h2>
            
            <p className="text-base md:text-lg text-text-inverse/90 leading-relaxed max-w-4xl mx-auto mb-12 bg-text-inverse/10 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-text-inverse/20">
              Benjamin Bloom demonstrated that students receiving one-on-one tutoring with mastery learning performed two standard deviations better than conventional classroom instruction. Alpha's 99th percentile results align perfectly with this finding. AI tutoring can theoretically provide this one-on-one experience at scale.
            </p>
            
            {/* Video Placeholder with improved accessibility */}
            <div className="max-w-4xl mx-auto mb-12">
              <button 
                className="w-full aspect-video bg-gradient-to-br from-text-inverse/10 to-text-inverse/5 rounded-2xl flex items-center justify-center shadow-2xl border border-text-inverse/20 backdrop-blur-sm group hover:shadow-3xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                aria-label="Play educational research video"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-text-inverse" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-text-inverse font-medium text-lg">Educational Research Video</p>
                  <p className="text-text-inverse/80 text-sm mt-2">Click to play</p>
                </div>
              </button>
            </div>
            
            <Button className="bg-gradient-to-r from-brand-accent to-brand-secondary text-text-brand px-8 py-4 rounded-full font-medium hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 transition-all duration-300 font-cal">
              Read the Full White Paper →
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="min-h-screen flex flex-col justify-center py-20 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-cal font-normal" style={{ color: '#0f33bb' }}>
            Real families, real results
          </h2>
        </div>
        
        <div className="relative h-96 md:h-[500px]">
          <div 
            className="flex gap-6 transition-transform duration-300 ease-out"
            style={{ transform: 'translateX(0)' }}
            onMouseMove={(e) => {
              const container = e.currentTarget;
              const rect = container.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const containerWidth = rect.width;
              const scrollAmount = ((x / containerWidth) - 0.5) * -200;
              container.style.transform = `translateX(${scrollAmount}px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {/* Duplicate testimonials for infinite scroll effect */}
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 shrink-0">
                {/* Testimonial 1 */}
                <div className="w-80 h-full relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer shrink-0">
                  <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col justify-between p-8">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 mx-auto">
                          <div className="w-0 h-0 border-l-[16px] border-l-blue-600 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-4xl font-cal font-normal" style={{ color: '#0f33bb' }}>95%</div>
                          <div className="text-lg font-cal font-normal" style={{ color: '#0f33bb' }}>Improved Test Scores</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="font-cal text-lg font-normal" style={{ color: '#0f33bb' }}>Sarah Martinez</h3>
                      <p className="font-cal text-sm" style={{ color: '#0f33bb', opacity: 0.8 }}>Middle School Student</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="w-80 h-full relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer shrink-0">
                  <div className="h-full bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col justify-between p-8">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 mx-auto">
                          <div className="w-0 h-0 border-l-[16px] border-l-blue-600 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-4xl font-cal font-normal" style={{ color: '#0f33bb' }}>2 Hours</div>
                          <div className="text-lg font-cal font-normal" style={{ color: '#0f33bb' }}>Daily Study Time</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="font-cal text-lg font-normal" style={{ color: '#0f33bb' }}>Maria Rodriguez</h3>
                      <p className="font-cal text-sm" style={{ color: '#0f33bb', opacity: 0.8 }}>High School Parent</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="w-80 h-full relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer shrink-0">
                  <div className="h-full bg-gradient-to-br from-green-100 to-green-200 flex flex-col justify-between p-8">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 mx-auto">
                          <div className="w-0 h-0 border-l-[16px] border-l-blue-600 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-4xl font-cal font-normal" style={{ color: '#0f33bb' }}>A+ Average</div>
                          <div className="text-lg font-cal font-normal" style={{ color: '#0f33bb' }}>Grade Improvement</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="font-cal text-lg font-normal" style={{ color: '#0f33bb' }}>James Wilson</h3>
                      <p className="font-cal text-sm" style={{ color: '#0f33bb', opacity: 0.8 }}>Middle School Student</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 4 */}
                <div className="w-80 h-full relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer shrink-0">
                  <div className="h-full bg-gradient-to-br from-yellow-100 to-orange-200 flex flex-col justify-between p-8">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 mx-auto">
                          <div className="w-0 h-0 border-l-[16px] border-l-blue-600 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-4xl font-cal font-normal" style={{ color: '#0f33bb' }}>1200→1480</div>
                          <div className="text-lg font-cal font-normal" style={{ color: '#0f33bb' }}>SAT Score Jump</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="font-cal text-lg font-normal" style={{ color: '#0f33bb' }}>Emma Thompson</h3>
                      <p className="font-cal text-sm" style={{ color: '#0f33bb', opacity: 0.8 }}>High School Student</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Index;
