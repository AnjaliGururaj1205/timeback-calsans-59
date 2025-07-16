import React from 'react';
import { Card } from '@/components/ui/card';

interface BeforeAfterCardProps {
  title: string;
  beforeValue: string;
  afterValue: string;
  description: string;
  icon: React.ReactNode;
}

export const BeforeAfterCard: React.FC<BeforeAfterCardProps> = ({
  title,
  beforeValue,
  afterValue,
  description,
  icon
}) => {
  return (
    <Card className="group bg-surface-primary border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="text-center space-y-6">
        <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-brand-primary/15 transition-colors duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-poppins font-semibold text-text-primary">
          {title}
        </h3>
        
        <div className="space-y-4">
          <div className="bg-surface-secondary border border-border rounded-lg p-4">
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-2 font-poppins">Before</div>
            <div className="text-2xl font-poppins font-bold text-destructive">{beforeValue}</div>
          </div>
          
          <div className="w-8 h-0.5 bg-brand-primary mx-auto rounded-full"></div>
          
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-lg p-4">
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-2 font-poppins">After</div>
            <div className="text-2xl font-poppins font-bold text-brand-primary">{afterValue}</div>
          </div>
        </div>
        
        <p className="text-base text-text-secondary leading-relaxed font-poppins">
          {description}
        </p>
      </div>
    </Card>
  );
};