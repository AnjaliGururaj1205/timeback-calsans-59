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
  // Traditional AI limitations first (X's at top)
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
    feature: 'Learning Science Integration',
    traditional: { value: 'Generic curriculum', hasFeature: false },
    timeback: { value: 'Research-backed methodology', hasFeature: true, highlight: true },
    details: 'Built on decades of cognitive science research with continuous optimization based on learning outcomes.'
  },
  // Mixed features in middle
  {
    feature: 'Personalization Depth',
    traditional: { value: 'Basic difficulty levels', hasFeature: true },
    timeback: { value: 'Multi-dimensional personalization', hasFeature: true, highlight: true },
    details: 'Considers learning style, pace, interests, emotional state, and cognitive load simultaneously.'
  },
  {
    feature: 'Progress Tracking',
    traditional: { value: 'Test scores only', hasFeature: true },
    timeback: { value: 'Comprehensive analytics', hasFeature: true },
    details: 'Tracks mastery depth, retention patterns, skill transfer, and meta-cognitive development.'
  },
  // TimeBack advantages at bottom (checkmarks)
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
    <Card className="bg-surface-primary border border-border rounded-lg p-8 shadow-lg overflow-hidden">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl md:text-3xl font-poppins font-bold text-text-primary">
            Traditional AI vs. Timeback AI
          </h3>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto font-poppins">
            See how our advanced AI capabilities compare to conventional educational technology
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="bg-brand-secondary/10 rounded-full px-4 py-2 border border-brand-secondary/30 inline-block">
                  <div className="text-lg font-poppins font-semibold text-brand-secondary">Feature</div>
                </div>
              </div>
              <div className="text-left">
                <div className="bg-surface-secondary rounded-lg p-3 border border-border">
                  <div className="text-lg font-poppins font-semibold text-text-primary">Traditional AI</div>
                  <div className="text-sm text-text-secondary font-poppins">Chatbots & Basic Tutoring</div>
                </div>
              </div>
              <div className="text-left">
                <div className="bg-brand-secondary/5 rounded-lg p-3 border border-brand-secondary/20">
                  <div className="text-lg font-poppins font-semibold text-brand-secondary">Timeback AI</div>
                  <div className="text-sm text-text-secondary font-poppins">Advanced Learning Engine</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {comparisonFeatures.map((item, index) => (
                <div key={item.feature} className="group">
                  <div 
                    className={`grid grid-cols-3 gap-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      expandedFeature === item.feature
                        ? 'bg-brand-secondary/5 border-brand-secondary/20 shadow-md'
                        : 'bg-surface-secondary border-border hover:bg-surface-tertiary hover:border-brand-secondary/20'
                    } ${animatingFeature === item.feature ? 'scale-[1.01]' : ''}`}
                    onClick={() => handleFeatureClick(item.feature)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary font-poppins text-left">{item.feature}</span>
                      {item.details && (
                        expandedFeature === item.feature 
                          ? <ChevronUp className="w-4 h-4 text-brand-secondary" />
                          : <ChevronDown className="w-4 h-4 text-text-secondary" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.traditional.hasFeature ? (
                        <Check className="w-5 h-5 text-warning" />
                      ) : (
                        <X className="w-5 h-5 text-destructive" />
                      )}
                      <span className="text-sm text-text-secondary text-left font-poppins">
                        {item.traditional.value}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Check className={`w-5 h-5 ${item.timeback.highlight ? 'text-brand-secondary' : 'text-success'}`} />
                      <span className={`text-sm text-left font-medium font-poppins ${
                        item.timeback.highlight ? 'text-brand-secondary' : 'text-text-primary'
                      }`}>
                        {item.timeback.value}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedFeature === item.feature && item.details && (
                    <div className="mt-2 p-4 bg-brand-secondary/5 rounded-lg border border-brand-secondary/20 animate-fade-in">
                      <p className="text-text-primary leading-relaxed font-poppins">
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