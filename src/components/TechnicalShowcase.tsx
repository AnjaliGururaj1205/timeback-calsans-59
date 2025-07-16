import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Brain, Zap, Target, BarChart3, Cpu, ChevronRight } from 'lucide-react';

interface TechnicalCapability {
  id: string;
  title: string;
  description: string;
  technicalDetail: string;
  icon: React.ReactNode;
  color: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const capabilities: TechnicalCapability[] = [
  {
    id: 'computer-vision',
    title: 'Computer Vision Analysis',
    description: 'Instantly reads and understands student work',
    technicalDetail: 'Deep learning models trained on millions of educational artifacts understand handwriting, diagrams, and mathematical notation with 98.3% accuracy.',
    icon: <Eye className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    metrics: [
      { label: 'Recognition Accuracy', value: '98.3%' },
      { label: 'Processing Speed', value: '<200ms' },
      { label: 'Content Types', value: '50+' }
    ]
  },
  {
    id: 'neural-adaptation',
    title: 'Neural Adaptation Engine',
    description: 'Adapts to each child\'s learning patterns instantly',
    technicalDetail: 'Reinforcement learning algorithms continuously optimize difficulty, pace, and content type for maximum knowledge retention.',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    metrics: [
      { label: 'Adaptation Speed', value: 'Real-time' },
      { label: 'Learning Factors', value: '47' },
      { label: 'Optimization Rate', value: '15x/minute' }
    ]
  },
  {
    id: 'instant-generation',
    title: 'Dynamic Content Generation',
    description: 'Creates unlimited personalized practice instantly',
    technicalDetail: 'Fine-tuned language models generate problems, hints, and explanations that match your child\'s understanding level.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
    metrics: [
      { label: 'Content Variety', value: 'Unlimited' },
      { label: 'Generation Time', value: '<1s' },
      { label: 'Personalization Depth', value: '12 dimensions' }
    ]
  },
  {
    id: 'predictive-modeling',
    title: 'Predictive Learning Models',
    description: 'Predicts and prevents learning struggles',
    technicalDetail: 'AI analyzes learning signals to predict knowledge gaps and optimal review timing with 94% accuracy.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    metrics: [
      { label: 'Prediction Accuracy', value: '94%' },
      { label: 'Early Warning', value: '3-5 days' },
      { label: 'Data Points', value: '10K+/student' }
    ]
  },
  {
    id: 'learning-analytics',
    title: 'Multi-dimensional Analytics',
    description: 'Tracks true understanding, not just correct answers',
    technicalDetail: 'Analytics tracks understanding depth, retention patterns, skill transfer, and emotional engagement beyond simple correctness.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-500',
    metrics: [
      { label: 'Analytics Dimensions', value: '23' },
      { label: 'Real-time Insights', value: '100%' },
      { label: 'Retention Tracking', value: '180 days' }
    ]
  },
  {
    id: 'distributed-processing',
    title: 'Distributed AI Processing',
    description: 'Lightning-fast responses on any device',
    technicalDetail: 'Cloud architecture with edge computing ensures instant response times across all devices and platforms.',
    icon: <Cpu className="w-8 h-8" />,
    color: 'from-teal-500 to-blue-500',
    metrics: [
      { label: 'Response Time', value: '<500ms' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Concurrent Users', value: '10K+' }
    ]
  }
];

export const TechnicalShowcase: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-poppins font-bold text-text-brand">
          Technical Capabilities
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Explore the advanced AI technologies that power personalized learning at unprecedented scale
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((capability) => (
          <Card
            key={capability.id}
            className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-surface-primary border ${
              hoveredCard === capability.id ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
            } ${
              selectedCapability === capability.id 
                ? 'ring-2 ring-brand-primary border-brand-primary/30' 
                : 'border-border hover:border-brand-primary/20'
            } rounded-lg overflow-hidden`}
            onMouseEnter={() => setHoveredCard(capability.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setSelectedCapability(
              selectedCapability === capability.id ? null : capability.id
            )}
          >
            <div className="p-6 space-y-4">
              {/* Icon with solid background */}
              <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/15 transition-colors duration-300">
                <div className="text-brand-primary">
                  {capability.icon}
                </div>
              </div>

              {/* Title and description */}
              <div className="space-y-3">
                <h4 className="text-lg font-poppins font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                  {capability.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed font-poppins">
                  {capability.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 gap-2">
                {capability.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center text-xs font-poppins">
                    <span className="text-text-secondary">{metric.label}</span>
                    <span className="font-semibold text-text-primary">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Expand indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-brand-primary hover:text-brand-secondary hover:bg-brand-primary/5 p-0 font-poppins"
                >
                  Learn more
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${
                    selectedCapability === capability.id ? 'rotate-90' : ''
                  }`} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed view */}
      {selectedCapability && (
        <Card className="bg-surface-secondary border border-border rounded-lg p-8 shadow-lg animate-fade-in">
          {(() => {
            const capability = capabilities.find(c => c.id === selectedCapability);
            if (!capability) return null;
            
            return (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-primary/10 p-3 flex items-center justify-center">
                    <div className="text-brand-primary scale-75">
                      {capability.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-poppins font-bold text-text-primary">{capability.title}</h4>
                    <p className="text-text-secondary font-poppins">Technical Deep Dive</p>
                  </div>
                </div>
                
                <p className="text-text-primary leading-relaxed font-poppins">
                  {capability.technicalDetail}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {capability.metrics.map((metric, index) => (
                    <div key={index} className="bg-surface-primary border border-border rounded-lg p-4">
                      <div className="text-2xl font-poppins font-bold text-brand-primary">{metric.value}</div>
                      <div className="text-sm text-text-secondary font-poppins">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </Card>
      )}
    </div>
  );
};