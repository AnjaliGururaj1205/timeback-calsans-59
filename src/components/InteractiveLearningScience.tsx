import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, BookOpen, Brain, Target, TrendingUp, Clock, Award } from 'lucide-react';

interface LearningPrinciple {
  id: string;
  title: string;
  shortDescription: string;
  fullExplanation: string;
  timebackApplication: string;
  researchBasis: string;
  citations: string[];
  visualElements: {
    icon: React.ReactNode;
    color: string;
    diagram?: string;
  };
  keyBenefits: string[];
}

const learningPrinciples: LearningPrinciple[] = [
  {
    id: 'blooms-2-sigma',
    title: "Bloom's 2 Sigma Problem",
    shortDescription: "One-on-one tutoring produces 2 standard deviations better learning outcomes than traditional classroom instruction.",
    fullExplanation: "Benjamin Bloom's groundbreaking research showed that students receiving one-on-one tutoring performed 2 standard deviations better than those in conventional classrooms - meaning the average tutored student outperformed 98% of students in traditional settings.",
    timebackApplication: "Timeback's AI provides personalized, one-on-one tutoring at scale, adapting to each student's pace and learning style to replicate the benefits of human tutoring while being available 24/7.",
    researchBasis: "Bloom's research demonstrated that personalized instruction timing, corrective feedback, and mastery-based progression are key factors in achieving these exceptional learning gains.",
    citations: [
      "Bloom, B. S. (1984). The 2 sigma problem: The search for methods of group instruction as effective as one-to-one tutoring. Educational researcher, 13(6), 4-16.",
      "VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems. Educational psychologist, 46(4), 197-221."
    ],
    visualElements: {
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      diagram: 'bell-curve'
    },
    keyBenefits: [
      "98% performance improvement over traditional methods",
      "Personalized pacing and feedback",
      "Immediate error correction",
      "Adaptive difficulty progression"
    ]
  },
  {
    id: 'mastery-learning',
    title: "Mastery-Based Learning",
    shortDescription: "Students must demonstrate complete understanding before advancing to prevent knowledge gaps.",
    fullExplanation: "Mastery learning requires students to achieve a predetermined level of competency before progressing. This prevents the accumulation of learning gaps that compound over time in traditional systems.",
    timebackApplication: "Timeback's AI continuously assesses understanding depth and only advances students when true mastery is achieved. The system generates additional practice and alternative explanations until concepts are fully internalized.",
    researchBasis: "Research shows mastery learning can improve achievement by 1-2 standard deviations, with particular benefits for struggling learners who need more time to reach proficiency.",
    citations: [
      "Guskey, T. R. (2007). Closing achievement gaps: Revisiting Benjamin S. Bloom's 'learning for mastery'. Journal of advanced academics, 19(1), 8-31.",
      "Kulik, C. L. C., Kulik, J. A., & Bangert-Drowns, R. L. (1990). Effectiveness of mastery learning programs: A meta-analysis. Review of educational research, 60(2), 265-299."
    ],
    visualElements: {
      icon: <Award className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      diagram: 'mastery-progression'
    },
    keyBenefits: [
      "Eliminates knowledge gaps",
      "Builds confidence through success",
      "Prevents learning debt accumulation",
      "Ensures solid foundation for advanced concepts"
    ]
  },
  {
    id: 'zone-proximal-development',
    title: "Zone of Proximal Development",
    shortDescription: "Learning occurs most effectively when content is just beyond current ability but achievable with guidance.",
    fullExplanation: "Vygotsky's Zone of Proximal Development (ZPD) identifies the optimal learning zone between what a student can do independently and what they can achieve with guidance. Learning in this zone maximizes engagement and progress.",
    timebackApplication: "Timeback's AI continuously calibrates difficulty to keep students in their optimal learning zone, providing just enough challenge to promote growth while maintaining confidence and motivation.",
    researchBasis: "Students learning within their ZPD show increased motivation, better retention, and faster skill acquisition compared to those working on material too easy or too difficult.",
    citations: [
      "Vygotsky, L. S. (1978). Mind in society: The development of higher psychological processes. Harvard university press.",
      "Chaiklin, S. (2003). The zone of proximal development in Vygotsky's analysis of learning and instruction. Vygotsky's educational theory in cultural context, 1, 39-64."
    ],
    visualElements: {
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      diagram: 'zpd-zones'
    },
    keyBenefits: [
      "Optimal challenge level",
      "Maintained motivation and confidence",
      "Accelerated skill development",
      "Reduced frustration and boredom"
    ]
  },
  {
    id: 'spaced-repetition',
    title: "Spaced Repetition & Forgetting Curve",
    shortDescription: "Strategic timing of review sessions dramatically improves long-term retention and prevents forgetting.",
    fullExplanation: "Hermann Ebbinghaus discovered that information is forgotten at predictable rates. Spaced repetition combats this by reviewing material at increasing intervals, strengthening memory and extending retention.",
    timebackApplication: "Timeback's AI tracks individual forgetting curves and schedules review sessions at optimal intervals, ensuring long-term retention while minimizing time spent on review.",
    researchBasis: "Spaced repetition can improve retention rates by 200-300% compared to massed practice, with benefits persisting for months or years.",
    citations: [
      "Ebbinghaus, H. (1885). Memory: A contribution to experimental psychology. Teachers college, Columbia university.",
      "Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. Psychological bulletin, 132(3), 354."
    ],
    visualElements: {
      icon: <Clock className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      diagram: 'forgetting-curve'
    },
    keyBenefits: [
      "200-300% better retention",
      "Optimized review timing",
      "Long-term memory formation",
      "Efficient use of study time"
    ]
  }
];

export const InteractiveLearningScience: React.FC = () => {
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [animatingDiagram, setAnimatingDiagram] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => (prev + 1) % 101);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handlePrincipleToggle = (principleId: string) => {
    if (expandedPrinciple === principleId) {
      setExpandedPrinciple(null);
    } else {
      setExpandedPrinciple(principleId);
      setAnimatingDiagram(principleId);
      setTimeout(() => setAnimatingDiagram(null), 1000);
    }
  };

  const renderDiagram = (principle: LearningPrinciple) => {
    switch (principle.visualElements.diagram) {
      case 'bell-curve':
        return (
          <div className="space-y-4">
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
          <div className="space-y-4">
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
          Learning Science Foundations
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Explore the research-backed principles that power Timeback's approach to accelerated learning
        </p>
        <div className="max-w-md mx-auto">
          <Progress value={currentProgress} className="h-2" />
          <p className="text-xs text-text-secondary mt-2">Continuously optimizing based on learning science</p>
        </div>
      </div>

      <div className="space-y-4">
        {learningPrinciples.map((principle, index) => (
          <Card 
            key={principle.id}
            className={`transition-all duration-500 ${
              expandedPrinciple === principle.id 
                ? 'shadow-xl border-brand-accent/50 bg-gradient-to-r from-brand-accent/5 to-brand-secondary/5' 
                : 'shadow-lg hover:shadow-xl border-border/50 hover:border-border'
            }`}
          >
            <div className="p-6">
              {/* Header */}
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handlePrincipleToggle(principle.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${principle.visualElements.color} p-3 flex items-center justify-center transition-transform duration-300 ${
                    animatingDiagram === principle.id ? 'scale-110' : ''
                  }`}>
                    <div className="text-white">
                      {principle.visualElements.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-cal font-semibold text-text-brand">{principle.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{principle.shortDescription}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {expandedPrinciple === principle.id ? 
                    <ChevronUp className="w-5 h-5 text-brand-accent" /> : 
                    <ChevronDown className="w-5 h-5 text-text-secondary" />
                  }
                </Button>
              </div>

              {/* Expanded Content */}
              {expandedPrinciple === principle.id && (
                <div className="mt-6 space-y-6 animate-fade-in">
                  {/* Full Explanation */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-text-brand mb-2">Research Foundation</h5>
                        <p className="text-text-secondary leading-relaxed">{principle.fullExplanation}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-text-brand mb-2">How Timeback Applies This</h5>
                        <p className="text-text-secondary leading-relaxed">{principle.timebackApplication}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-text-brand mb-3">Key Benefits</h5>
                        <ul className="space-y-2">
                          {principle.keyBenefits.map((benefit, i) => (
                            <li key={i} className="flex items-center space-x-2 text-sm text-text-secondary">
                              <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Visual Diagram */}
                  {principle.visualElements.diagram && (
                    <div className="bg-surface-secondary/30 rounded-xl p-6 border border-border/30">
                      {renderDiagram(principle)}
                    </div>
                  )}

                  {/* Citations */}
                  <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                    <h5 className="font-semibold text-text-brand mb-3 flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Research Citations</span>
                    </h5>
                    <div className="space-y-2">
                      {principle.citations.map((citation, i) => (
                        <p key={i} className="text-xs text-text-secondary leading-relaxed font-mono bg-surface-primary/50 p-2 rounded border">
                          {citation}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};