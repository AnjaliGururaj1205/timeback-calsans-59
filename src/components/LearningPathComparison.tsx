import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, Clock, Users, BookOpen, Target, Zap, Brain } from 'lucide-react';

interface LearningStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  time?: string;
}

const traditionalPath: LearningStep[] = [
  {
    title: 'One-Size-Fits-All Curriculum',
    description: 'Fixed lesson plans regardless of individual needs',
    icon: <BookOpen className="w-5 h-5" />,
    time: 'Week 1-2'
  },
  {
    title: 'Rigid Pacing',
    description: 'Same speed for all students, regardless of understanding',
    icon: <Clock className="w-5 h-5" />,
    time: 'Week 3-4'
  },
  {
    title: 'Generic Practice',
    description: 'Standardized worksheets and homework',
    icon: <Users className="w-5 h-5" />,
    time: 'Week 5-6'
  },
  {
    title: 'Delayed Feedback',
    description: 'Weekly tests reveal gaps too late',
    icon: <Target className="w-5 h-5" />,
    time: 'Week 7-8'
  }
];

const timebackPath: LearningStep[] = [
  {
    title: 'Personalized Assessment',
    description: 'AI analyzes learning style, pace, and current knowledge',
    icon: <Brain className="w-5 h-5" />,
    time: 'Day 1'
  },
  {
    title: 'Adaptive Content Generation',
    description: 'Custom lessons created in real-time for optimal learning',
    icon: <Zap className="w-5 h-5" />,
    time: 'Ongoing'
  },
  {
    title: 'Immediate Feedback Loop',
    description: 'Instant corrections and guidance during practice',
    icon: <Target className="w-5 h-5" />,
    time: 'Real-time'
  },
  {
    title: 'Continuous Optimization',
    description: 'AI refines approach based on learning patterns',
    icon: <ArrowRight className="w-5 h-5" />,
    time: 'Always'
  }
];

export const LearningPathComparison: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
          Learning Journey Comparison
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          See the fundamental difference between traditional education and Timeback's AI-powered approach
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Traditional Path */}
        <Card className="bg-gradient-to-br from-surface-secondary/50 to-red-50/30 border border-red-200/50 rounded-3xl p-8 shadow-lg">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🏫</span>
              </div>
              <h4 className="text-xl font-cal font-bold text-text-brand">Traditional Education</h4>
              <p className="text-sm text-text-secondary">Linear, standardized approach</p>
            </div>

            <div className="space-y-4">
              {traditionalPath.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="text-red-600">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-text-brand">{step.title}</h5>
                      {step.time && (
                        <span className="text-xs text-text-secondary bg-red-50 px-2 py-1 rounded-full">
                          {step.time}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < traditionalPath.length - 1 && (
                    <div className="absolute left-[2.5rem] mt-10 w-0.5 h-8 bg-red-200"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-red-50 rounded-xl p-4 border border-red-200/50">
              <div className="text-center space-y-2">
                <div className="text-lg font-cal font-semibold text-red-700">Result: Slow Progress</div>
                <p className="text-sm text-red-600">
                  Students often fall behind or get bored, leading to gaps in understanding
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeback Path */}
        <Card className="bg-gradient-to-br from-brand-accent/5 to-brand-secondary/5 border border-brand-accent/20 rounded-3xl p-8 shadow-lg">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-xl font-cal font-bold text-text-brand">Timeback AI Learning</h4>
              <p className="text-sm text-text-secondary">Adaptive, personalized journey</p>
            </div>

            <div className="space-y-4">
              {timebackPath.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 relative">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center">
                      <div className="text-brand-accent">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-text-brand">{step.title}</h5>
                      {step.time && (
                        <span className="text-xs text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">
                          {step.time}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < timebackPath.length - 1 && (
                    <div className="absolute left-[2.5rem] mt-10 w-0.5 h-8 bg-brand-accent/30"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-brand-accent/10 to-brand-secondary/10 rounded-xl p-4 border border-brand-accent/20">
              <div className="text-center space-y-2">
                <div className="text-lg font-cal font-semibold text-brand-accent">Result: Accelerated Mastery</div>
                <p className="text-sm text-text-brand">
                  Students learn 4-10x faster with deeper understanding and long-term retention
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Comparison Metrics */}
      <Card className="bg-gradient-to-r from-surface-primary to-surface-secondary border border-border/50 rounded-3xl p-8 shadow-lg">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-cal font-bold text-red-500">8 weeks</div>
            <div className="text-sm text-text-secondary">Traditional timeline to see progress</div>
            <div className="text-xs text-red-600">vs</div>
            <div className="text-3xl font-cal font-bold text-brand-accent">1 day</div>
            <div className="text-sm text-text-secondary">Timeback adaptation begins</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl font-cal font-bold text-red-500">Fixed</div>
            <div className="text-sm text-text-secondary">Traditional content flexibility</div>
            <div className="text-xs text-red-600">vs</div>
            <div className="text-3xl font-cal font-bold text-brand-accent">Infinite</div>
            <div className="text-sm text-text-secondary">Timeback content variations</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl font-cal font-bold text-red-500">1x</div>
            <div className="text-sm text-text-secondary">Traditional learning speed</div>
            <div className="text-xs text-red-600">vs</div>
            <div className="text-3xl font-cal font-bold text-brand-accent">10x</div>
            <div className="text-sm text-text-secondary">Timeback acceleration potential</div>
          </div>
        </div>
      </Card>
    </div>
  );
};