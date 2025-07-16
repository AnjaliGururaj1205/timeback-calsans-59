import React, { useState, useEffect } from 'react';
import { HelpCircle, X, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FloatingFAQHelper: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show after scrolling 2 screen heights
      setIsVisible(scrollPosition > windowHeight * 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      setIsExpanded(false);
    }
  };

  const quickQuestions = [
    'How much does Timeback cost?',
    'Is there a free trial?',
    'How quickly will I see results?',
    'Is Timeback safe for children?'
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 w-80 animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-gray-800 font-semibold">Quick Questions</h4>
            <Button
              onClick={() => setIsExpanded(false)}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={scrollToFAQ}
                className="block w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              onClick={scrollToFAQ}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white text-sm"
            >
              View All FAQs
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {isExpanded ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <HelpCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};