import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Eye, Brain, Target, Zap, Users, BarChart3 } from 'lucide-react';

interface DiagramStep {
  id: string;
  title: string;
  description: string;
  active: boolean;
}

interface AnimatedDiagram {
  title: string;
  description: string;
  steps: DiagramStep[];
  visualType: 'blooms-taxonomy' | 'mastery-learning' | 'adaptive-flow' | 'feedback-loop';
}

const diagrams: AnimatedDiagram[] = [
  {
    title: "Bloom's Taxonomy in Action",
    description: "See how Timeback guides students through progressive levels of understanding",
    visualType: 'blooms-taxonomy',
    steps: [
      { id: 'remember', title: 'Remember', description: 'Basic recall and recognition', active: false },
      { id: 'understand', title: 'Understand', description: 'Comprehension and explanation', active: false },
      { id: 'apply', title: 'Apply', description: 'Using knowledge in new situations', active: false },
      { id: 'analyze', title: 'Analyze', description: 'Breaking down complex information', active: false },
      { id: 'evaluate', title: 'Evaluate', description: 'Making judgments and assessments', active: false },
      { id: 'create', title: 'Create', description: 'Producing original work', active: false }
    ]
  },
  {
    title: "Mastery Learning Progression",
    description: "Watch how students advance only after achieving true understanding",
    visualType: 'mastery-learning',
    steps: [
      { id: 'assess', title: 'Initial Assessment', description: 'Evaluate current knowledge', active: false },
      { id: 'teach', title: 'Personalized Instruction', description: 'Adaptive content delivery', active: false },
      { id: 'practice', title: 'Guided Practice', description: 'Immediate feedback and support', active: false },
      { id: 'check', title: 'Mastery Check', description: 'Verify understanding depth', active: false },
      { id: 'advance', title: 'Advance or Remediate', description: 'Progress or additional support', active: false }
    ]
  }
];

export const AnimatedDiagrams: React.FC = () => {
  const [selectedDiagram, setSelectedDiagram] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Remove auto-playing animation - only trigger on user interaction
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isAnimating && selectedDiagram !== null) {
      interval = setInterval(() => {
        setAnimationStep((prev) => {
          const currentDiagram = diagrams[selectedDiagram];
          const nextStep = (prev + 1) % currentDiagram.steps.length;
          
          // Stop animation when it reaches the end
          if (nextStep === 0 && prev === currentDiagram.steps.length - 1) {
            setIsAnimating(false);
            return prev;
          }
          
          return nextStep;
        });
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedDiagram, isAnimating]);

  const handleDiagramClick = (index: number) => {
    setSelectedDiagram(index);
    setAnimationStep(0);
    setIsAnimating(true);
  };

  const renderBloomsTaxonomy = () => {
    if (selectedDiagram === null) return null;
    
    const currentDiagram = diagrams[selectedDiagram];
    return (
      <div className="relative w-full h-80">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Pyramid structure */}
          {currentDiagram.steps.map((step, index) => {
            const y = 250 - (index * 40);
            const width = 300 - (index * 40);
            const x = (400 - width) / 2;
            const isActive = isAnimating && index <= animationStep;
            
            return (
              <g key={step.id}>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={35}
                  fill={isActive ? '#5bbbfc' : '#e5e7eb'}
                  stroke={isActive ? '#1e40af' : '#9ca3af'}
                  strokeWidth={2}
                  className="transition-all duration-500"
                />
                <text
                  x={200}
                  y={y + 22}
                  textAnchor="middle"
                  className={`text-sm font-semibold ${isActive ? 'fill-white' : 'fill-gray-700'}`}
                >
                  {step.title}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Step descriptions */}
        <div className="absolute right-0 top-0 w-32 h-full flex flex-col justify-between py-4">
          {currentDiagram.steps.map((step, index) => {
            const isActive = isAnimating && index <= animationStep;
            return (
              <div 
                key={step.id}
                className={`text-xs p-2 rounded transition-all duration-500 ${
                  isActive ? 'bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20' : 'text-text-secondary'
                }`}
              >
                {step.description}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMasteryLearning = () => {
    if (selectedDiagram === null) return null;
    
    const currentDiagram = diagrams[selectedDiagram];
    return (
      <div className="relative w-full h-80">
        <svg viewBox="0 0 600 300" className="w-full h-full">
          {/* Flow diagram */}
          {currentDiagram.steps.map((step, index) => {
            const x = 50 + (index * 100);
            const y = 150;
            const isActive = isAnimating && index <= animationStep;
            const isCompleted = isAnimating && index < animationStep;
            
            return (
              <g key={step.id}>
                {/* Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={30}
                  fill={isCompleted ? '#22c55e' : isActive ? '#5bbbfc' : '#e5e7eb'}
                  stroke={isCompleted ? '#16a34a' : isActive ? '#1e40af' : '#9ca3af'}
                  strokeWidth={3}
                  className="transition-all duration-500"
                />
                
                {/* Icon */}
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className={`text-lg ${isCompleted || isActive ? 'fill-white' : 'fill-gray-700'}`}
                >
                  {index + 1}
                </text>
                
                {/* Arrow to next step */}
                {index < currentDiagram.steps.length - 1 && (
                  <line
                    x1={x + 30}
                    y1={y}
                    x2={x + 70}
                    y2={y}
                    stroke={isCompleted ? '#22c55e' : '#9ca3af'}
                    strokeWidth={2}
                    markerEnd="url(#arrowhead)"
                    className="transition-all duration-500"
                  />
                )}
                
                {/* Step title */}
                <text
                  x={x}
                  y={y + 50}
                  textAnchor="middle"
                  className={`text-xs font-medium ${isActive ? 'fill-brand-secondary' : 'fill-gray-600'}`}
                >
                  {step.title}
                </text>
              </g>
            );
          })}
          
          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
            </marker>
          </defs>
        </svg>
        
        {/* Current step description */}
        {isAnimating && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-brand-secondary/10 rounded-lg border border-brand-secondary/20">
            <div className="text-center">
              <h5 className="font-semibold text-brand-secondary">
                {currentDiagram.steps[animationStep]?.title}
              </h5>
              <p className="text-sm text-text-secondary">
                {currentDiagram.steps[animationStep]?.description}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDiagram = () => {
    switch (diagrams[selectedDiagram].visualType) {
      case 'blooms-taxonomy':
        return renderBloomsTaxonomy();
      case 'mastery-learning':
        return renderMasteryLearning();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-poppins font-bold text-text-brand">
          Learning Principles in Action
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Click below to see animated demonstrations of how Timeback applies key educational theories
        </p>
      </div>

      {/* Diagram Selector Buttons */}
      <div className="flex justify-center space-x-4">
        {diagrams.map((diagram, index) => (
          <button
            key={index}
            onClick={() => handleDiagramClick(index)}
            className={`px-6 py-3 rounded-lg font-medium font-poppins transition-all duration-300 ${
              selectedDiagram === index
                ? 'bg-brand-primary text-white shadow-lg scale-105'
                : 'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary hover:text-text-primary hover:scale-102'
            }`}
          >
            {diagram.title}
          </button>
        ))}
      </div>

      {/* Animation Container - Only visible when a diagram is selected */}
      {selectedDiagram !== null && (
        <Card className="bg-surface-primary border border-border rounded-lg shadow-lg animate-fade-in">
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h4 className="text-xl font-poppins font-bold text-text-primary">
                {diagrams[selectedDiagram].title}
              </h4>
              <p className="text-text-secondary font-poppins">
                {diagrams[selectedDiagram].description}
              </p>
            </div>

            <div className="bg-surface-secondary rounded-lg p-6 border border-border">
              {renderDiagram()}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};