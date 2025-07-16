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
    description: 'Advanced visual processing of student work and learning materials',
    technicalDetail: 'Uses deep learning models trained on millions of educational artifacts to understand handwriting, diagrams, mathematical notation, and visual problem-solving approaches with 98.3% accuracy.',
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
    description: 'Real-time learning path optimization based on cognitive patterns',
    technicalDetail: 'Employs reinforcement learning algorithms that continuously optimize for maximum knowledge retention and skill transfer, adapting difficulty, pace, and content type in real-time.',
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
    description: 'Unlimited personalized practice problems and explanations',
    technicalDetail: 'Large language models fine-tuned on educational content generate contextually appropriate problems, hints, and explanations that match each student\'s current understanding level.',
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
    description: 'Advanced analytics predicting learning outcomes and optimal interventions',
    technicalDetail: 'Machine learning models analyze thousands of learning signals to predict knowledge gaps, optimal review timing, and learning plateau risk with 94% accuracy.',
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
    description: 'Comprehensive tracking of learning depth and skill transfer',
    technicalDetail: 'Sophisticated analytics engine tracks not just correctness, but understanding depth, retention patterns, skill transfer, metacognitive development, and emotional engagement.',
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
    description: 'Cloud-native architecture ensuring instant response times',
    technicalDetail: 'Microservices architecture with edge computing ensures sub-second response times while processing complex AI workloads across distributed GPU clusters.',
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
        <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
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
            className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
              hoveredCard === capability.id ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
            } ${
              selectedCapability === capability.id 
                ? 'ring-2 ring-brand-accent border-brand-accent/50' 
                : 'border-border/50 hover:border-border'
            }`}
            onMouseEnter={() => setHoveredCard(capability.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setSelectedCapability(
              selectedCapability === capability.id ? null : capability.id
            )}
          >
            <div className="p-6 space-y-4">
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${capability.color} p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {capability.icon}
                </div>
              </div>

              {/* Title and description */}
              <div className="space-y-2">
                <h4 className="text-lg font-cal font-semibold text-text-brand group-hover:text-brand-accent transition-colors">
                  {capability.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {capability.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 gap-2">
                {capability.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-text-secondary">{metric.label}</span>
                    <span className="font-semibold text-text-brand">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Expand indicator */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-brand-accent hover:text-brand-secondary hover:bg-brand-accent/10 p-0"
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
        <Card className="bg-gradient-to-br from-brand-accent/5 to-brand-secondary/5 border border-brand-accent/20 rounded-3xl p-8 shadow-xl animate-fade-in">
          {(() => {
            const capability = capabilities.find(c => c.id === selectedCapability);
            if (!capability) return null;
            
            return (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} p-3 flex items-center justify-center`}>
                    <div className="text-white scale-75">
                      {capability.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-cal font-bold text-text-brand">{capability.title}</h4>
                    <p className="text-text-secondary">Technical Deep Dive</p>
                  </div>
                </div>
                
                <p className="text-text-brand leading-relaxed">
                  {capability.technicalDetail}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {capability.metrics.map((metric, index) => (
                    <div key={index} className="bg-surface-secondary/50 rounded-xl p-4 border border-border/30">
                      <div className="text-2xl font-cal font-bold text-brand-accent">{metric.value}</div>
                      <div className="text-sm text-text-secondary">{metric.label}</div>
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