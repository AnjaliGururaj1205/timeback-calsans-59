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
    <Card className="group bg-gradient-to-br from-surface-primary via-surface-secondary to-brand-secondary/5 border border-border/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-cal font-semibold text-text-brand">
          {title}
        </h3>
        
        <div className="space-y-4">
          <div className="bg-surface-secondary/50 rounded-2xl p-4 border border-border/30">
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">Before</div>
            <div className="text-2xl font-cal font-bold text-destructive">{beforeValue}</div>
          </div>
          
          <div className="w-8 h-0.5 bg-gradient-to-r from-brand-accent to-brand-secondary mx-auto rounded-full"></div>
          
          <div className="bg-gradient-to-br from-brand-accent/10 to-brand-secondary/10 rounded-2xl p-4 border border-brand-accent/20">
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">After</div>
            <div className="text-2xl font-cal font-bold text-brand-accent">{afterValue}</div>
          </div>
        </div>
        
        <p className="text-base text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};