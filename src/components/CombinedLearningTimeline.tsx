import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Users, Trophy, Brain, BookOpen, Target, TrendingUp, Clock, Award } from 'lucide-react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  researcher: string;
  citations: string[];
  impact: string;
  category: 'theory' | 'technology' | 'practice' | 'research';
  icon: React.ReactNode;
  timebackApplication?: string;
  keyBenefits?: string[];
  researchBasis?: string;
  visualDiagram?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1978,
    title: "Zone of Proximal Development",
    description: "Vygotsky identified the optimal learning zone between what a student can do independently and what they can achieve with guidance. Learning in this zone maximizes engagement and progress.",
    researcher: "Lev Vygotsky",
    citations: [
      "Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes. Harvard university press.",
      "Chaiklin, S. (2003). The zone of proximal development in Vygotsky's analysis of learning and instruction. Vygotsky's educational theory in cultural context, 1, 39-64."
    ],
    impact: "Revolutionized understanding of adaptive difficulty in education",
    timebackApplication: "Timeback's AI continuously calibrates difficulty to keep students in their optimal learning zone, providing just enough challenge to promote growth while maintaining confidence and motivation.",
    keyBenefits: [
      "Optimal challenge level",
      "Maintained motivation and confidence", 
      "Accelerated skill development",
      "Reduced frustration and boredom"
    ],
    researchBasis: "Students learning within their ZPD show increased motivation, better retention, and faster skill acquisition compared to those working on material too easy or too difficult.",
    category: 'theory',
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    year: 1984,
    title: "Bloom's 2 Sigma Problem",
    description: "Benjamin Bloom's groundbreaking research showed that students receiving one-on-one tutoring performed 2 standard deviations better than those in conventional classrooms - meaning the average tutored student outperformed 98% of students in traditional settings.",
    researcher: "Benjamin Bloom",
    citations: [
      "Bloom, B. S. (1984). The 2 sigma problem: The search for methods of group instruction as effective as one-to-one tutoring. Educational researcher, 13(6), 4-16.",
      "VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems. Educational psychologist, 46(4), 197-221."
    ],
    impact: "Established the gold standard for personalized learning effectiveness",
    timebackApplication: "Timeback's AI provides personalized, one-on-one tutoring at scale, adapting to each student's pace and learning style to replicate the benefits of human tutoring while being available 24/7.",
    keyBenefits: [
      "98% performance improvement over traditional methods",
      "Personalized pacing and feedback",
      "Immediate error correction",
      "Adaptive difficulty progression"
    ],
    researchBasis: "Bloom's research demonstrated that personalized instruction timing, corrective feedback, and mastery-based progression are key factors in achieving these exceptional learning gains.",
    category: 'research',
    icon: <Target className="w-4 h-4" />,
    visualDiagram: 'bell-curve'
  },
  {
    year: 1985,
    title: "Spaced Repetition & Forgetting Curve",
    description: "Hermann Ebbinghaus discovered that information is forgotten at predictable rates. Strategic timing of review sessions dramatically improves long-term retention and prevents forgetting.",
    researcher: "Hermann Ebbinghaus",
    citations: [
      "Ebbinghaus, H. (1885). Memory: A contribution to experimental psychology. Teachers college, Columbia university.",
      "Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological bulletin, 132(3), 354."
    ],
    impact: "Enabled scientific approach to review scheduling",
    timebackApplication: "Timeback's AI tracks individual forgetting curves and schedules review sessions at optimal intervals, ensuring long-term retention while minimizing time spent on review.",
    keyBenefits: [
      "200-300% better retention",
      "Optimized review timing",
      "Long-term memory formation",
      "Efficient use of study time"
    ],
    researchBasis: "Spaced repetition can improve retention rates by 200-300% compared to massed practice, with benefits persisting for months or years.",
    category: 'research',
    icon: <Clock className="w-4 h-4" />
  },
  {
    year: 1988,
    title: "Mastery-Based Learning",
    description: "Comprehensive analysis showing mastery learning improves achievement by 1-2 standard deviations. Students must demonstrate complete understanding before advancing to prevent knowledge gaps.",
    researcher: "Kulik, Kulik & Bangert-Drowns",
    citations: [
      "Guskey, T. R. (2007). Closing achievement gaps: Revisiting Benjamin S. Bloom's 'learning for mastery'. Journal of advanced academics, 19(1), 8-31.",
      "Kulik, C. L. C., Kulik, J. A., & Bangert-Drowns, R. L. (1990). Effectiveness of mastery learning programs: A meta-analysis. Review of educational research, 60(2), 265-299."
    ],
    impact: "Proved effectiveness of competency-based progression",
    timebackApplication: "Timeback's AI continuously assesses understanding depth and only advances students when true mastery is achieved. The system generates additional practice and alternative explanations until concepts are fully internalized.",
    keyBenefits: [
      "Eliminates knowledge gaps",
      "Builds confidence through success",
      "Prevents learning debt accumulation",
      "Ensures solid foundation for advanced concepts"
    ],
    researchBasis: "Research shows mastery learning can improve achievement by 1-2 standard deviations, with particular benefits for struggling learners who need more time to reach proficiency.",
    category: 'research',
    icon: <Award className="w-4 h-4" />,
    visualDiagram: 'mastery-progression'
  },
  {
    year: 1995,
    title: "Intelligent Tutoring Systems",
    description: "First generation of AI-powered educational technology showing promise for scaled personalization.",
    researcher: "Anderson & Corbett",
    citations: [
      "Anderson, J. R., & Corbett, A. T. (1995). Knowledge tracing: Modeling the acquisition of procedural knowledge. User modeling and user-adapted interaction, 4(4), 253-278."
    ],
    impact: "Laid foundation for modern adaptive learning platforms",
    category: 'technology',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2001,
    title: "Cognitive Load Theory",
    description: "Explained how working memory limitations affect learning and optimal information presentation.",
    researcher: "John Sweller",
    citations: [
      "Sweller, J. (2001). Cognitive load theory and instructional design: Recent developments. Educational psychologist, 36(1), 1-4."
    ],
    impact: "Informed design of effective learning interfaces and content delivery",
    category: 'theory',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2011,
    title: "Human vs AI Tutoring Effectiveness",
    description: "Meta-analysis comparing human tutors, intelligent tutoring systems, and other interventions.",
    researcher: "Kurt VanLehn",
    citations: [
      "VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems. Educational psychologist, 46(4), 197-221."
    ],
    impact: "Validated AI tutoring as comparable to human tutoring",
    category: 'research',
    icon: <Trophy className="w-4 h-4" />
  },
  {
    year: 2018,
    title: "Deep Learning in Education",
    description: "Modern neural networks enabled sophisticated pattern recognition in student learning behaviors.",
    researcher: "Multiple Researchers",
    citations: [
      "Chen, X., Zou, D., Cheng, G., & Xie, H. (2020). Detecting latent topics and trends in educational technologies over four decades using structural topic modeling. Computers & Education, 151, 103855."
    ],
    impact: "Enabled real-time learning analytics and prediction",
    category: 'technology',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2020,
    title: "Large Language Models",
    description: "GPT and similar models demonstrated ability to generate unlimited, personalized educational content.",
    researcher: "OpenAI & Others",
    citations: [
      "Brown, T., Mann, B., Ryder, N., Subbiah, M., Kaplan, J. D., Dhariwal, P., ... & Amodei, D. (2020). Language models are few-shot learners. Advances in neural information processing systems, 33, 1877-1901."
    ],
    impact: "Removed content creation bottleneck for personalized learning",
    category: 'technology',
    icon: <Brain className="w-4 h-4" />
  },
  {
    year: 2024,
    title: "Computer Vision + Education",
    description: "Timeback integrates advanced computer vision to analyze handwritten work and visual learning.",
    researcher: "Timeback Research Team",
    citations: [
      "Timeback Research Team (2024). Integrating Computer Vision for Enhanced Educational AI. Internal Research Publication."
    ],
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

export const CombinedLearningTimeline: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % timelineEvents.length);
    }, 5000);

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

  const renderDiagram = (diagram: string) => {
    switch (diagram) {
      case 'bell-curve':
        return (
          <div className="space-y-4 bg-surface-secondary/30 rounded-xl p-6 border border-border/30">
            <div className="text-center text-sm text-text-secondary mb-4">Performance Distribution Comparison</div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-xs text-text-secondary text-center">Traditional Classroom</div>
                <svg viewBox="0 0 200 100" className="w-full h-20">
                  <path d="M 20 80 Q 100 20 180 80" stroke="#ef4444" strokeWidth="2" fill="none" />
                  <line x1="100" y1="80" x2="100" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="100" y="95" textAnchor="middle" className="text-xs fill-red-500">Average</text>
                </svg>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-text-secondary text-center">With Tutoring (+2σ)</div>
                <svg viewBox="0 0 200 100" className="w-full h-20">
                  <path d="M 20 80 Q 100 20 180 80" stroke="#22c55e" strokeWidth="2" fill="none" />
                  <line x1="140" y1="80" x2="140" y2="35" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="140" y="95" textAnchor="middle" className="text-xs fill-green-500">98th %ile</text>
                </svg>
              </div>
            </div>
          </div>
        );
      case 'mastery-progression':
        return (
          <div className="space-y-4 bg-surface-secondary/30 rounded-xl p-6 border border-border/30">
            <div className="text-center text-sm text-text-secondary mb-4">Mastery vs Traditional Progression</div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs text-text-secondary">Traditional: Fixed Time, Variable Mastery</div>
                <div className="flex items-center space-x-2">
                  {[60, 75, 45, 80, 55].map((score, i) => (
                    <div key={i} className="flex-1 bg-red-100 rounded">
                      <div 
                        className="bg-red-500 h-6 rounded text-xs text-white flex items-center justify-center"
                        style={{ width: `${score}%` }}
                      >
                        {score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-text-secondary">Timeback: Variable Time, Consistent Mastery</div>
                <div className="flex items-center space-x-2">
                  {[90, 95, 92, 88, 94].map((score, i) => (
                    <div key={i} className="flex-1 bg-green-100 rounded">
                      <div 
                        className="bg-green-500 h-6 rounded text-xs text-white flex items-center justify-center"
                        style={{ width: `${score}%` }}
                      >
                        {score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
          40 Years of Learning Science Evolution
        </h3>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Explore the research-backed discoveries that power Timeback's approach to accelerated learning. Each breakthrough built the foundation for what's now possible in AI-powered education.
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="space-y-4">
        <div className="relative">
          <div className="w-full bg-surface-secondary/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-brand-secondary to-brand-primary h-2 rounded-full transition-all duration-500"
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
                    ? 'bg-brand-secondary border-brand-secondary scale-125'
                    : index < currentEventIndex
                    ? 'bg-brand-secondary border-brand-secondary'
                    : 'bg-surface-primary border-border hover:border-brand-secondary'
                }`}
                style={{ marginLeft: index === 0 ? '0' : '-8px', marginRight: index === timelineEvents.length - 1 ? '0' : '-8px' }}
              />
            ))}
          </div>
        </div>
        
        {/* Year Labels */}
        <div className="flex justify-between text-xs text-text-secondary">
          <span>1978</span>
          <span>1980s</span>
          <span>1990s</span>
          <span>2000s</span>
          <span>2010s</span>
          <span>2024</span>
        </div>
      </div>

      {/* Main Event Display */}
      <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/50 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="space-y-8">
            {/* Event Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[currentEvent.category]} p-4 flex items-center justify-center`}>
                  <div className="text-white">
                    {currentEvent.icon}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-cal font-bold text-brand-secondary">{currentEvent.year}</div>
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
                  className={autoPlay ? 'bg-brand-secondary/10 text-brand-secondary' : ''}
                >
                  {autoPlay ? 'Pause' : 'Play'}
                </Button>
                <Button variant="outline" size="sm" onClick={nextEvent}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Primary Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-cal font-bold text-text-brand">
                    {currentEvent.title}
                  </h4>
                  <p className="text-text-secondary leading-relaxed">
                    {currentEvent.description}
                  </p>
                </div>

                {/* Research Details */}
                {(currentEvent.timebackApplication || currentEvent.researchBasis) && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentEvent.researchBasis && (
                      <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                        <h5 className="font-semibold text-text-brand mb-2 flex items-center space-x-2">
                          <Brain className="w-4 h-4" />
                          <span>Research Foundation</span>
                        </h5>
                        <p className="text-sm text-text-secondary leading-relaxed">{currentEvent.researchBasis}</p>
                      </div>
                    )}
                    
                    {currentEvent.timebackApplication && (
                      <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                        <h5 className="font-semibold text-text-brand mb-2 flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span>How Timeback Applies This</span>
                        </h5>
                        <p className="text-sm text-text-secondary leading-relaxed">{currentEvent.timebackApplication}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Benefits */}
                {currentEvent.keyBenefits && (
                  <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                    <h5 className="font-semibold text-text-brand mb-3 flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Key Benefits</span>
                    </h5>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {currentEvent.keyBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-text-secondary">
                          <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visual Diagram */}
                {currentEvent.visualDiagram && renderDiagram(currentEvent.visualDiagram)}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Researcher Info */}
                <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                  <h5 className="font-semibold text-text-brand mb-2">Key Researcher</h5>
                  <p className="text-sm text-text-secondary">{currentEvent.researcher}</p>
                </div>

                {/* Impact */}
                <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                  <h5 className="font-semibold text-text-brand mb-2">Impact on Education</h5>
                  <p className="text-sm text-text-secondary">{currentEvent.impact}</p>
                </div>

                {/* Timeline Position */}
                <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                  <h5 className="font-semibold text-text-brand mb-3">Timeline Position</h5>
                  <div className="space-y-3">
                    {timelineEvents.slice(Math.max(0, currentEventIndex - 1), currentEventIndex + 2).map((event, index) => (
                      <div 
                        key={event.year}
                        className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                          event.year === currentEvent.year 
                            ? 'bg-brand-secondary/10 border border-brand-secondary/20' 
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
                  <div className="text-center mt-4">
                    <div className="text-sm text-text-secondary">
                      Event {currentEventIndex + 1} of {timelineEvents.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Citations */}
            <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
              <h5 className="font-semibold text-text-brand mb-3 flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Research Citations</span>
              </h5>
              <div className="space-y-2">
                {currentEvent.citations.map((citation, i) => (
                  <p key={i} className="text-xs text-text-secondary leading-relaxed font-mono bg-surface-primary/50 p-2 rounded border">
                    {citation}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};