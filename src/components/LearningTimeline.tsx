import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Users, Trophy, Brain } from 'lucide-react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  researcher: string;
  impact: string;
  category: 'theory' | 'technology' | 'practice' | 'research';
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1984,
    title: "Bloom's 2 Sigma Problem",
    description: "Demonstrated that one-on-one tutoring produces 2 standard deviations better learning outcomes than traditional classroom instruction.",
    researcher: "Benjamin Bloom",
    impact: "Established the gold standard for personalized learning effectiveness",
    category: 'research',
    icon: <Trophy className="w-4 h-4" />
  },
  {
    year: 1978,
    title: "Zone of Proximal Development",
    description: "Identified the optimal learning zone between current ability and potential achievement with guidance.",
    researcher: "Lev Vygotsky",
    impact: "Revolutionized understanding of adaptive difficulty in education",
    category: 'theory',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 1988,
    title: "Mastery Learning Meta-Analysis",
    description: "Comprehensive analysis showing mastery learning improves achievement by 1-2 standard deviations.",
    researcher: "Kulik, Kulik & Bangert-Drowns",
    impact: "Proved effectiveness of competency-based progression",
    category: 'research',
    icon: <Users className="w-4 h-4" />
  },
  {
    year: 1992,
    title: "Spaced Repetition Research",
    description: "Quantified the forgetting curve and optimal spacing intervals for long-term retention.",
    researcher: "Pashler & Cepeda",
    impact: "Enabled scientific approach to review scheduling",
    category: 'research',
    icon: <Calendar className="w-4 h-4" />
  },
  {
    year: 1995,
    title: "Intelligent Tutoring Systems",
    description: "First generation of AI-powered educational technology showing promise for scaled personalization.",
    researcher: "Anderson & Corbett",
    impact: "Laid foundation for modern adaptive learning platforms",
    category: 'technology',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2001,
    title: "Cognitive Load Theory",
    description: "Explained how working memory limitations affect learning and optimal information presentation.",
    researcher: "John Sweller",
    impact: "Informed design of effective learning interfaces and content delivery",
    category: 'theory',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2011,
    title: "Human vs AI Tutoring Effectiveness",
    description: "Meta-analysis comparing human tutors, intelligent tutoring systems, and other interventions.",
    researcher: "Kurt VanLehn",
    impact: "Validated AI tutoring as comparable to human tutoring",
    category: 'research',
    icon: <Trophy className="w-4 h-4" />
  },
  {
    year: 2018,
    title: "Deep Learning in Education",
    description: "Modern neural networks enabled sophisticated pattern recognition in student learning behaviors.",
    researcher: "Multiple Researchers",
    impact: "Enabled real-time learning analytics and prediction",
    category: 'technology',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2020,
    title: "Large Language Models",
    description: "GPT and similar models demonstrated ability to generate unlimited, personalized educational content.",
    researcher: "OpenAI & Others",
    impact: "Removed content creation bottleneck for personalized learning",
    category: 'technology',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2024,
    title: "Computer Vision + Education",
    description: "Timeback integrates advanced computer vision to analyze handwritten work and visual learning.",
    researcher: "Timeback Research Team",
    impact: "Enables AI tutoring that sees and understands like human tutors",
    category: 'practice',
    icon: <Trophy className="w-4 h-4" />
  }
];

const categoryColors = {
  theory: 'from-purple-500 to-pink-500',
  technology: 'from-blue-500 to-cyan-500',
  practice: 'from-green-500 to-emerald-500',
  research: 'from-orange-500 to-red-500'
};

const categoryLabels = {
  theory: 'Learning Theory',
  technology: 'Technology',
  practice: 'Implementation',
  research: 'Research Study'
};

export const LearningTimeline: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % timelineEvents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const currentEvent = timelineEvents[currentEventIndex];
  const progress = ((currentEventIndex + 1) / timelineEvents.length) * 100;

  const goToEvent = (index: number) => {
    setCurrentEventIndex(index);
    setAutoPlay(false);
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % timelineEvents.length);
    setAutoPlay(false);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
    setAutoPlay(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
          40 Years of Learning Science Evolution
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Explore the key discoveries and innovations that led to Timeback's breakthrough approach
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="space-y-4">
        <div className="relative">
          <div className="w-full bg-surface-secondary/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-brand-accent to-brand-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="absolute top-0 flex justify-between w-full">
            {timelineEvents.map((event, index) => (
              <button
                key={index}
                onClick={() => goToEvent(index)}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 -mt-1 ${
                  index === currentEventIndex
                    ? 'bg-brand-accent border-brand-accent scale-125'
                    : index < currentEventIndex
                    ? 'bg-brand-secondary border-brand-secondary'
                    : 'bg-surface-primary border-border hover:border-brand-accent'
                }`}
                style={{ marginLeft: index === 0 ? '0' : '-8px', marginRight: index === timelineEvents.length - 1 ? '0' : '-8px' }}
              />
            ))}
          </div>
        </div>
        
        {/* Year Labels */}
        <div className="flex justify-between text-xs text-text-secondary">
          <span>1978</span>
          <span>1990s</span>
          <span>2000s</span>
          <span>2010s</span>
          <span>2024</span>
        </div>
      </div>

      {/* Main Event Display */}
      <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/50 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[currentEvent.category]} p-4 flex items-center justify-center`}>
                    <div className="text-white">
                      {currentEvent.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-cal font-bold text-brand-accent">{currentEvent.year}</div>
                    <div className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[currentEvent.category]} text-white font-medium`}>
                      {categoryLabels[currentEvent.category]}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={prevEvent}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={autoPlay ? 'bg-brand-accent/10 text-brand-accent' : ''}
                  >
                    {autoPlay ? 'Pause' : 'Play'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextEvent}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-cal font-bold text-text-brand">
                  {currentEvent.title}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {currentEvent.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                    <h5 className="font-semibold text-text-brand mb-2">Key Researcher</h5>
                    <p className="text-sm text-text-secondary">{currentEvent.researcher}</p>
                  </div>
                  <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                    <h5 className="font-semibold text-text-brand mb-2">Impact on Education</h5>
                    <p className="text-sm text-text-secondary">{currentEvent.impact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Visualization */}
            <div className="space-y-4">
              <h5 className="font-semibold text-text-brand">Timeline Position</h5>
              <div className="bg-surface-secondary/30 rounded-xl p-4 border border-border/30">
                <div className="space-y-3">
                  {timelineEvents.slice(Math.max(0, currentEventIndex - 1), currentEventIndex + 2).map((event, index) => (
                    <div 
                      key={event.year}
                      className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                        event.year === currentEvent.year 
                          ? 'bg-brand-accent/10 border border-brand-accent/20' 
                          : 'opacity-60'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryColors[event.category]} p-2 flex items-center justify-center`}>
                        <div className="text-white scale-75">
                          {event.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{event.year}</div>
                        <div className="text-xs text-text-secondary truncate">{event.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-text-secondary">
                  Event {currentEventIndex + 1} of {timelineEvents.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};