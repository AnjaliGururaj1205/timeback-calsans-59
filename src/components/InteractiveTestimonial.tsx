import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Quote } from 'lucide-react';

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  fullTestimonial: string;
  rating: number;
  avatar: string;
}

const testimonials: TestimonialData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Parent',
    location: 'Austin, TX',
    quote: 'My daughter went from struggling with math to excelling in just 3 months.',
    fullTestimonial: 'My daughter went from struggling with math to excelling in just 3 months. The personalized approach really works - she actually looks forward to her learning sessions now. Her confidence has grown tremendously and her standardized test scores improved by 40 percentile points.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Educator',
    location: 'Dallas, TX',
    quote: 'The most effective learning platform I\'ve seen in 20 years of teaching.',
    fullTestimonial: 'The most effective learning platform I\'ve seen in 20 years of teaching. The AI really understands how each student learns and adapts accordingly. I\'ve watched students who were falling behind catch up and even surpass their grade level expectations.',
    rating: 5,
    avatar: '👨‍🏫'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    role: 'Parent',
    location: 'Houston, TX',
    quote: 'Amazing results - my son is now 2 years ahead in reading.',
    fullTestimonial: 'Amazing results - my son is now 2 years ahead in reading. What impressed me most is how the system identified his learning style and adjusted. He went from dreading reading time to asking for extra sessions. The progress tracking helped me see exactly where he was improving.',
    rating: 5,
    avatar: '👩‍💻'
  }
];

export const InteractiveTestimonial: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialData | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card 
            key={testimonial.id}
            className="group cursor-pointer bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedTestimonial(testimonial)}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-cal font-semibold text-text-brand">{testimonial.name}</h4>
                  <p className="text-sm text-text-secondary">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="absolute top-0 left-0 w-6 h-6 text-brand-secondary/20 -translate-x-1 -translate-y-1" />
                <p className="text-text-secondary italic pl-4 group-hover:text-text-brand transition-colors">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-brand-secondary hover:text-brand-primary hover:bg-brand-secondary/10"
              >
                Read full story →
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedTestimonial && (
        <Card className="bg-gradient-to-br from-brand-accent/5 to-brand-secondary/5 border border-brand-accent/20 rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedTestimonial.avatar}</div>
                <div>
                  <h3 className="text-xl font-cal font-bold text-text-brand">{selectedTestimonial.name}</h3>
                  <p className="text-text-secondary">{selectedTestimonial.role} • {selectedTestimonial.location}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedTestimonial(null)}
                className="hover:bg-surface-secondary"
              >
                ✕
              </Button>
            </div>
            
            <div className="flex items-center space-x-1">
              {[...Array(selectedTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <div className="relative">
              <Quote className="absolute top-0 left-0 w-8 h-8 text-brand-secondary/20 -translate-x-2 -translate-y-2" />
              <p className="text-lg text-text-brand leading-relaxed pl-6 italic">
                "{selectedTestimonial.fullTestimonial}"
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};