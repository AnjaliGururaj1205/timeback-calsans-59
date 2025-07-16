import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ComparisonFeature {
  feature: string;
  traditional: {
    value: string;
    hasFeature: boolean;
  };
  timeback: {
    value: string;
    hasFeature: boolean;
    highlight?: boolean;
  };
  details?: string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    feature: 'Visual Learning Assessment',
    traditional: { value: 'Text-based only', hasFeature: false },
    timeback: { value: 'Computer vision analysis', hasFeature: true, highlight: true },
    details: 'Our AI can actually see and understand handwritten work, diagrams, and visual problem-solving approaches.'
  },
  {
    feature: 'Real-time Adaptation',
    traditional: { value: 'Weekly adjustments', hasFeature: false },
    timeback: { value: 'Instant adaptation', hasFeature: true, highlight: true },
    details: 'Learning path adjusts in real-time based on student performance and engagement patterns.'
  },
  {
    feature: 'Personalization Depth',
    traditional: { value: 'Basic difficulty levels', hasFeature: true },
    timeback: { value: 'Multi-dimensional personalization', hasFeature: true, highlight: true },
    details: 'Considers learning style, pace, interests, emotional state, and cognitive load simultaneously.'
  },
  {
    feature: 'Learning Science Integration',
    traditional: { value: 'Generic curriculum', hasFeature: false },
    timeback: { value: 'Research-backed methodology', hasFeature: true, highlight: true },
    details: 'Built on decades of cognitive science research with continuous optimization based on learning outcomes.'
  },
  {
    feature: 'Progress Tracking',
    traditional: { value: 'Test scores only', hasFeature: true },
    timeback: { value: 'Comprehensive analytics', hasFeature: true },
    details: 'Tracks mastery depth, retention patterns, skill transfer, and meta-cognitive development.'
  },
  {
    feature: 'Content Generation',
    traditional: { value: 'Pre-built lessons', hasFeature: true },
    timeback: { value: 'Dynamic content creation', hasFeature: true, highlight: true },
    details: 'Generates unlimited, personalized practice problems and explanations tailored to each student.'
  }
];

export const InteractiveComparison: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [animatingFeature, setAnimatingFeature] = useState<string | null>(null);

  const handleFeatureClick = (feature: string) => {
    if (expandedFeature === feature) {
      setExpandedFeature(null);
    } else {
      setAnimatingFeature(feature);
      setTimeout(() => {
        setExpandedFeature(feature);
        setAnimatingFeature(null);
      }, 150);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/50 rounded-3xl p-8 shadow-xl overflow-hidden">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
            Traditional AI vs. Timeback AI
          </h3>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See how our advanced AI capabilities compare to conventional educational technology
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-lg font-cal font-semibold text-text-brand">Feature</div>
              <div className="text-center">
                <div className="bg-surface-secondary/50 rounded-xl p-3 border border-border/30">
                  <div className="text-lg font-cal font-semibold text-text-brand">Traditional AI</div>
                  <div className="text-sm text-text-secondary">Chatbots & Basic Tutoring</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-brand-accent/10 to-brand-secondary/10 rounded-xl p-3 border border-brand-accent/20">
                  <div className="text-lg font-cal font-semibold text-brand-accent">Timeback AI</div>
                  <div className="text-sm text-text-secondary">Advanced Learning Engine</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {comparisonFeatures.map((item, index) => (
                <div key={item.feature} className="group">
                  <div 
                    className={`grid grid-cols-3 gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      expandedFeature === item.feature
                        ? 'bg-brand-accent/5 border-brand-accent/20 shadow-lg'
                        : 'bg-surface-secondary/30 border-border/30 hover:bg-surface-secondary/50 hover:border-border/50'
                    } ${animatingFeature === item.feature ? 'scale-[1.02]' : ''}`}
                    onClick={() => handleFeatureClick(item.feature)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-brand">{item.feature}</span>
                      {item.details && (
                        expandedFeature === item.feature 
                          ? <ChevronUp className="w-4 h-4 text-brand-accent" />
                          : <ChevronDown className="w-4 h-4 text-text-secondary" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2">
                      {item.traditional.hasFeature ? (
                        <Check className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                      <span className="text-sm text-text-secondary text-center">
                        {item.traditional.value}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2">
                      <Check className={`w-5 h-5 ${item.timeback.highlight ? 'text-brand-accent' : 'text-green-500'}`} />
                      <span className={`text-sm text-center font-medium ${
                        item.timeback.highlight ? 'text-brand-accent' : 'text-text-brand'
                      }`}>
                        {item.timeback.value}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedFeature === item.feature && item.details && (
                    <div className="mt-2 p-4 bg-gradient-to-r from-brand-accent/5 to-brand-secondary/5 rounded-xl border border-brand-accent/20 animate-fade-in">
                      <p className="text-text-brand leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};