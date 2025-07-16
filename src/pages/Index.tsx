import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { InteractiveTestimonial } from "@/components/InteractiveTestimonial";
import { InteractiveUSMap } from "@/components/InteractiveUSMap";
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
            {[
              { role: "Parent", path: "/dashboard" },
              { role: "Government", path: "/dashboard" },
              { role: "Philanthropist", path: "/dashboard" },
              { role: "School", path: "/dashboard" },
              { role: "Entrepreneur", path: "/dashboard" }
            ].map(({ role, path }, index) => (
              <Button 
                key={role}
                className="h-12 px-6 bg-brand-accent text-brand-secondary hover:bg-surface-secondary hover:scale-105 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 font-semibold rounded-full transition-all duration-200 font-cal"
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
            <h2 id="proof-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold font-cal text-text-brand">
              Proven Results That Speak for Themselves
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-text-secondary">
              Independent testing confirms what our families already know: Alpha students consistently outperform traditional education by remarkable margins.
            </p>
          </div>

          {/* Animated Dashboard Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-card via-surface-secondary to-brand-accent/5 border border-border/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🏆</span>
                </div>
                <AnimatedCounter 
                  end={1535} 
                  className="text-5xl md:text-6xl font-cal font-bold text-brand-accent"
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
                  <span className="text-3xl">📊</span>
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
                  <span className="text-3xl">⚡</span>
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
                icon={<span className="text-2xl text-brand-accent">📚</span>}
              />
              
              <BeforeAfterCard
                title="Math Proficiency"
                beforeValue="Grade level 4.2"
                afterValue="Grade level 7.8"
                description="Students advance 3.6 grade levels in mathematics within one academic year"
                icon={<span className="text-2xl text-brand-secondary">🧮</span>}
              />
              
              <BeforeAfterCard
                title="Learning Confidence"
                beforeValue="38% motivated"
                afterValue="96% engaged"
                description="Students report significantly higher engagement and love for learning"
                icon={<span className="text-2xl text-green-500">🎯</span>}
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

      {/* Learning Engine Section - New Page Style */}
      <section className="min-h-screen bg-brand-primary px-4 py-20 flex flex-col items-center justify-center" aria-labelledby="learning-engine-heading">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 id="learning-engine-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold font-cal text-brand-secondary">
              This Isn't a Chatbot. It's a Learning Engine.
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-brand-secondary opacity-90">
              Our AI is far more advanced — it sees, understands, evaluates, and adapts. In real time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Vision-powered understanding */}
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-red-400 text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-brand-secondary">
                Vision-powered understanding
              </h3>
              <p className="text-brand-secondary/80 leading-relaxed">
                It can actually see your child's work — not just typed answers. Whether your child is solving math on paper or diagramming a sentence, Timeback's AI can evaluate the work visually.
              </p>
            </div>

            {/* Instant feedback */}
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-orange-400 text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-brand-secondary">
                Instant feedback on actual performance
              </h3>
              <p className="text-brand-secondary/80 leading-relaxed">
                The AI doesn't wait for input. It observes, identifies gaps, and provides next-step lessons.
              </p>
            </div>

            {/* Learning Science + Data-Driven */}
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <span className="text-blue-400 text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-brand-secondary">
                Learning Science + Data-Driven Adaptation
              </h3>
              <p className="text-brand-secondary/80 leading-relaxed">
                Every lesson is built on what your child just did, not a generic curriculum sequence.
              </p>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-12">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Learning Science Section - Dashboard Style */}
      <section className="px-6 py-20 bg-surface-primary" aria-labelledby="science-heading">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation - Centered */}
          <div className="border-b border-border bg-surface-primary mb-12">
            <nav className="flex justify-center space-x-8 overflow-x-auto" role="tablist">
              {["Bloom's 2 Sigma", "Mastery Based Progression", "Personalized & Adaptive Learning", "Zone of Proximal Development"].map((tab, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === activeTab}
                  onClick={() => setActiveTab(index)}
                  className={`py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 font-system ${
                    index === activeTab
                      ? "border-brand-secondary text-text-primary"
                      : "border-transparent text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Section - Centered */}
          <div className="text-center mb-12 max-w-4xl mx-auto">
            {activeTab === 0 && (
              <>
                <h2 id="science-heading" className="text-3xl md:text-4xl font-semibold text-text-primary mb-6 font-system">
                  Built on 40 Years of Learning Science
                </h2>
                
                <div className="space-y-2 mb-8">
                  <p className="text-text-secondary font-system">
                    Benjamin Bloom demonstrated that students receiving one-on-one tutoring with mastery learning performed two standard deviations better than conventional classroom instruction.
                  </p>
                  <p className="text-text-secondary font-system">
                    Alpha's 99th percentile results align perfectly with this finding. <span className="font-semibold text-text-primary">AI tutoring can theoretically provide this one-on-one experience at scale.</span>
                  </p>
                </div>

                <button className="text-brand-secondary hover:text-brand-secondary/80 font-medium transition-colors duration-200 font-system">
                  See the Science for Yourself
                </button>
              </>
            )}
            
            {activeTab === 1 && (
              <>
                <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6 font-system">
                  Confidence Through Competence
                </h2>
                
                <div className="space-y-2 mb-8">
                  <p className="text-text-secondary font-system">
                    Mastery-based learning has been proven in decades of research to dramatically improve student outcomes — especially when combined with personalized instruction. That's the engine behind Timeback.
                  </p>
                </div>

                <button className="text-brand-secondary hover:text-brand-secondary/80 font-medium transition-colors duration-200 font-system">
                  See the Science for Yourself
                </button>
              </>
            )}

            {activeTab === 2 && (
              <>
                <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6 font-system">
                  Learning That Adapts to Your Child — Not the Other Way Around
                </h2>
                
                <div className="space-y-2 mb-8">
                  <p className="text-text-secondary font-system">
                    No two kids learn the same way — so why teach them the same way? Timeback creates a personalized, adaptive learning path for each child, adjusting every lesson in real time to meet their exact needs.
                  </p>
                </div>

                <button className="text-brand-secondary hover:text-brand-secondary/80 font-medium transition-colors duration-200 font-system">
                  See the Science for Yourself
                </button>
              </>
            )}

            {activeTab === 3 && (
              <>
                <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6 font-system">
                  Right in the Learning Sweet Spot
                </h2>
                
                <div className="space-y-2 mb-8">
                  <p className="text-text-secondary font-system">
                    Every child has a "sweet spot" where learning is most effective — not too easy to be boring, not too hard to be discouraging. This is called the Zone of Proximal Development, and it's where real progress happens.
                  </p>
                  <p className="text-text-secondary font-system">
                    Timeback's AI identifies this zone for your child in real time and delivers lessons that stretch them just enough to grow. That's how we build confidence, momentum, and rapid learning — without stress or burnout.
                  </p>
                </div>

                <button className="text-brand-secondary hover:text-brand-secondary/80 font-medium transition-colors duration-200 font-system">
                  See the Science for Yourself
                </button>
              </>
            )}
          </div>
          
          {/* Video/Content Area - Dashboard Style and Centered */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-secondary rounded-2xl p-8 shadow-sm border border-border">
              <div className="aspect-video bg-surface-tertiary rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Video placeholder matching dashboard style */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-text-inverse" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-text-secondary font-medium text-lg font-system">Educational Research Video</p>
                  <p className="text-text-secondary/80 text-sm mt-2 font-system">Click to play</p>
                </div>
              </div>
            </div>
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
      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-surface-primary via-gray-900 to-black text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-cal">
            Ready to Give Your Kid Their Time Back?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-system">
            For people who want more
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 font-system"
          >
            Let's Talk About My Kid
          </Button>
        </div>
        
        {/* Timeback Branding Section */}
        <div className="mt-16 py-16 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center">
              <span className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary bg-clip-text text-transparent">
                timeback
              </span>
            </h3>
            
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
    </div>
  );
};

export default Index;
