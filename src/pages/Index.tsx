import React, { useRef, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Clock, Star, Users, BookOpen, Zap, Target, Trophy, Heart, ChevronDown, Play, Pause, Volume2, VolumeX, Check, ArrowRight, BarChart, Calendar, Shield, Award, MessageSquare, Sparkles, TrendingUp, User, MapPin, Phone, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DemoVideoPlayer } from '@/components/DemoVideoPlayer'
import { TechnicalShowcase } from '@/components/TechnicalShowcase'
import { VideoTestimonials } from '@/components/VideoTestimonials'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { InteractiveComparison } from '@/components/InteractiveComparison'
import { InteractiveLearningScience } from '@/components/InteractiveLearningScience'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { FAQSection } from '@/components/FAQSection'
import { MultiStepForm } from '@/components/MultiStepForm'
import { FloatingFAQHelper } from '@/components/FloatingFAQHelper'
import { TrustIndicators } from '@/components/TrustIndicators'
import { ScheduleComparison } from '@/components/ScheduleComparison'
import { LearningTimeline } from '@/components/LearningTimeline'
import { InteractiveTestimonial } from '@/components/InteractiveTestimonial'
import { TestimonialGrid } from '@/components/TestimonialGrid'
import { SuccessStoryTimeline } from '@/components/SuccessStoryTimeline'
import { InteractiveUSMap } from '@/components/InteractiveUSMap'
import { LearningPathComparison } from '@/components/LearningPathComparison'
import { AnimatedDiagrams } from '@/components/AnimatedDiagrams'

const Index = () => {
  const [activeTab, setActiveTab] = useState('traditional')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const controls = useAnimation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()
  const navigate = useNavigate()

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '150%'])

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      localStorage.setItem('userEmail', email);
      navigate('/about');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Parent of Alex (9)",
      content: "Alex now finishes school by 10 AM and spends the rest of the day pursuing his passion for robotics. His test scores have never been higher.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b732?w=400&h=400&fit=crop&crop=face",
      outcome: "300% improvement in standardized test scores"
    },
    {
      name: "Maria Rodriguez", 
      role: "Parent of Sofia (12)",
      content: "Sofia discovered her love for art when she wasn't trapped in a classroom all day. She's now painting masterpieces while excelling academically.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      outcome: "Discovered hidden artistic talents"
    },
    {
      name: "David Thompson",
      role: "Parent of Emma (10)", 
      content: "Emma's confidence has soared. She's learning at her own pace and has time for music lessons, coding, and quality family time.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      outcome: "Regained love for learning"
    }
  ]

  return (
    <div className="min-h-screen bg-surface-primary text-gray-800 overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-student-working-on-homework-at-home-4754-large.mp4" type="video/mp4" />
          </video>
          
          {/* Video Controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              size="sm"
              variant="outline"
              className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={() => {
                if (videoRef.current) {
                  if (isPlaying) {
                    videoRef.current.pause()
                  } else {
                    videoRef.current.play()
                  }
                  setIsPlaying(!isPlaying)
                }
              }}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        
        {/* Content */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight font-cal"
              variants={itemVariants}
            >
              Give Your Kid Their{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Time Back
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-system text-blue-100"
              variants={itemVariants}
            >
              Master academics in just 2 hours a day. Unlock 6+ hours for passions, creativity, and childhood.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              variants={itemVariants}
            >
              {/* Email Collection Form */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 text-lg rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder:text-white/70 focus:border-white focus:bg-white/20"
                  />
                  <Button 
                    type="submit"
                    size="lg" 
                    className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-300 hover:scale-105 font-system"
                  >
                    Get Started
                  </Button>
                </form>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => scrollToSection('proof-section')}
                className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 font-system"
              >
                See the Proof
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white opacity-70" />
        </motion.div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <TrustIndicators />
        </div>
      </section>

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