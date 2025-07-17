
import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { InteractiveComparison } from "@/components/InteractiveComparison";
import { InteractiveLearningScience } from "@/components/InteractiveLearningScience";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { TrustIndicators } from "@/components/TrustIndicators";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleComparison } from "@/components/ScheduleComparison";
import { LearningTimeline } from "@/components/LearningTimeline";
import { InteractiveUSMap } from "@/components/InteractiveUSMap";
import { TechnicalShowcase } from "@/components/TechnicalShowcase";
import { LearningPathComparison } from "@/components/LearningPathComparison";
import { AnimatedDiagrams } from "@/components/AnimatedDiagrams";

const About = () => {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleParentClick = () => {
    setShowMainContent(true);
  };

  return (
    <div className="min-h-screen">
      {/* Initial About Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#1abeff' }}>
        {/* Navigation */}
        <nav className="fixed top-4 right-4 z-10">
          <div className="flex gap-4">
            <Link 
              to="/" 
              className="text-lg font-medium hover:underline font-cal"
              style={{ color: '#0f33bb' }}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium hover:underline font-cal"
              style={{ color: '#0f33bb' }}
            >
              About
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex items-start justify-center gap-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold font-cal leading-tight" style={{ color: '#0f33bb' }}>
              About
            </h1>
            <img 
              src="/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png" 
              alt="TimeBack" 
              className="mt-1"
              style={{ height: '50.26px' }}
            />
          </div>
          
          <div className="space-y-6 text-lg animate-fade-in-up delay-200 font-cal" style={{ color: '#0f33bb' }}>
            <p>
              TimeBack is the AI-powered EducationOS behind <a 
                href="https://alpha.school" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold underline hover:underline font-cal"
                style={{ color: '#0f33bb' }}
              >
                Alpha
              </a> schools, empowering kids to master their academics in just 2 hours a day—freeing up the rest of the day for what they love. Built on learning science, it generates personalized lessons, optimal lesson plans, and AI coaching to create self-driven learners. Independent standardized tests confirm learning gains up to 10× faster.
            </p>
          </div>

          {/* Category Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 animate-fade-in-up delay-400">
            <div className="bg-white/90 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
                Entrepreneurs
              </h3>
              <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
                Launch your own AI-powered school with our turnkey platform. Join the education revolution with proven technology and full support.
              </p>
            </div>
            
            <div 
              className="bg-white/90 p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500"
              onClick={handleParentClick}
            >
              <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
                Parents
              </h3>
              <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
                Unlock your child's full potential with just 2 hours of school a day. Give them time back to explore passions, deepen learning, and grow at their own pace — all with proven results and AI-powered support.
              </p>
              <p className="text-xs font-bold mt-2" style={{ color: '#0f33bb' }}>
                Click here to learn more!
              </p>
            </div>
            
            <div className="bg-white/90 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
                Schools
              </h3>
              <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
                Supercharge your curriculum with AI-driven mastery learning. Seamlessly integrate TimeBack into your existing system to boost outcomes and personalize instruction.
              </p>
            </div>
            
            <div className="bg-white/90 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
                Government
              </h3>
              <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
                Deliver cost-effective, high-impact education at scale. Empower every student with mastery-based, AI-supported learning — reducing operational load while raising academic performance.
              </p>
            </div>
            
            <div className="bg-white/90 p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold font-cal mb-3" style={{ color: '#0f33bb' }}>
                Philanthropists
              </h3>
              <p className="text-sm font-cal leading-relaxed" style={{ color: '#0f33bb' }}>
                Back a breakthrough in education with exponential impact. Accelerate access to high-quality, low-time education for underserved communities — with measurable outcomes and sustainable scalability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections - Only shown after clicking "Parent" */}
      {showMainContent && (
        <div className="animate-fade-in">
          {/* Proven Results Section */}
          <section id="proof-section" className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white px-4 py-20" aria-labelledby="proof-heading">
            <div className="max-w-7xl mx-auto space-y-16">
              
              {/* Section Header */}
              <div className="text-center space-y-6">
                <h2 id="proof-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold font-cal" style={{ color: '#0033cc' }}>
                  Proven Results That Speak for Themselves
                </h2>
                <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#66b2ff' }}>
                  Independent standardized tests confirm learning gains up to 10× faster than traditional methods
                </p>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0033cc' }}>
                      <AnimatedCounter end={10} duration={2000} />×
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-cal" style={{ color: '#0033cc' }}>Faster Learning</h3>
                    <p className="text-gray-600">Independent tests show up to 10× acceleration in academic mastery</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0033cc' }}>
                      <AnimatedCounter end={85} duration={2000} />%
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-cal" style={{ color: '#0033cc' }}>Time Saved</h3>
                    <p className="text-gray-600">Students complete traditional curriculum in 85% less time</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0033cc' }}>
                      <AnimatedCounter end={98} duration={2000} />%
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-cal" style={{ color: '#0033cc' }}>Parent Satisfaction</h3>
                    <p className="text-gray-600">Parents report dramatically improved family life and child happiness</p>
                  </CardContent>
                </Card>
              </div>

              {/* Before/After Comparison */}
              <div className="space-y-12">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-cal" style={{ color: '#0033cc' }}>
                    Traditional School vs. TimeBack
                  </h3>
                  <p className="text-lg" style={{ color: '#66b2ff' }}>
                    See the dramatic difference in daily schedules
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ScheduleComparison 
                    title="Traditional School Day"
                    timeBlocks={[
                      { time: "7:00 AM", activity: "Wake up, get ready", color: "#94a3b8" },
                      { time: "8:00 AM", activity: "School starts", color: "#64748b" },
                      { time: "3:00 PM", activity: "School ends", color: "#64748b" },
                      { time: "4:00 PM", activity: "Homework begins", color: "#475569" },
                      { time: "7:00 PM", activity: "Finally done!", color: "#334155" },
                      { time: "8:00 PM", activity: "Family time (rushed)", color: "#1e293b" }
                    ]}
                    problems={[
                      "6+ hours of inefficient learning",
                      "2-3 hours of additional homework", 
                      "Minimal time for passions",
                      "Exhausted, stressed children"
                    ]}
                  />
                  
                  <ScheduleComparison 
                    title="TimeBack Day"
                    timeBlocks={[
                      { time: "8:00 AM", activity: "Start personalized learning", color: "#3b82f6" },
                      { time: "10:00 AM", activity: "Academic goals achieved!", color: "#2563eb" },
                      { time: "10:30 AM", activity: "Passion time begins", color: "#16a34a" },
                      { time: "2:00 PM", activity: "Outdoor play & exercise", color: "#22c55e" },
                      { time: "4:00 PM", activity: "Family time", color: "#f59e0b" },
                      { time: "7:00 PM", activity: "Creative projects", color: "#8b5cf6" }
                    ]}
                    benefits={[
                      "2 hours of efficient, personalized learning",
                      "6+ hours for passions & interests",
                      "Quality family time",
                      "Happy, energized children"
                    ]}
                  />
                </div>
              </div>

              {/* Results Timeline */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <LearningTimeline />
              </div>

              {/* Interactive US Map */}
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-cal" style={{ color: '#0033cc' }}>
                    Results Across America
                  </h3>
                  <p className="text-lg" style={{ color: '#66b2ff' }}>
                    See how families nationwide are transforming their children's education
                  </p>
                </div>
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
                    Unlike generic AI tutors, TimeBack was built specifically for mastery-based learning
                  </p>
                  <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{ color: '#66b2ff' }}>
                    Our proprietary EducationOS adapts in real-time, identifies knowledge gaps instantly, and ensures true understanding before moving forward
                  </p>
                </div>
              </div>

              {/* Interactive Comparison */}
              <InteractiveComparison />

              {/* Technical Showcase */}
              <TechnicalShowcase />
            </div>
          </section>

          {/* Built on Learning Science Section */}
          <section className="min-h-screen bg-white px-4 py-20" aria-labelledby="science-heading">
            <div className="max-w-7xl mx-auto space-y-16">
              
              {/* Section Header */}
              <div className="text-center space-y-6">
                <h2 id="science-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold font-cal" style={{ color: '#0033cc' }}>
                  Built on Learning Science
                </h2>
                <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#66b2ff' }}>
                  Decades of cognitive research compressed into an intelligent system that understands how children actually learn
                </p>
              </div>

              {/* Interactive Learning Science Component */}
              <InteractiveLearningScience />

              {/* Learning Path Comparison */}
              <LearningPathComparison />

              {/* Animated Diagrams */}
              <AnimatedDiagrams />
            </div>
          </section>

          {/* Community Section */}
          <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
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
        </div>
      )}
    </div>
  );
};

export default About;
