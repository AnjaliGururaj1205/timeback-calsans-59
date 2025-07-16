import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, Menu, X, Home, Users, BarChart3, HelpCircle, Star } from 'lucide-react';

interface FloatingNavigationProps {
  sections: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

export const FloatingNavigation: React.FC<FloatingNavigationProps> = ({ sections }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past hero section
      setIsVisible(window.scrollY > 300);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Navigation */}
      <div className="fixed top-4 right-4 z-50 transition-all duration-300">
        <div className="floating-nav rounded-2xl p-2 shadow-lg">
          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-xl hover:bg-brand-primary/10"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-col gap-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-brand-primary text-text-inverse hover:bg-brand-primary/90'
                    : 'hover:bg-brand-primary/10 text-text-secondary hover:text-brand-primary'
                }`}
                title={section.label}
              >
                {section.icon}
              </Button>
            ))}
            
            {/* Scroll to Top */}
            <div className="w-full h-px bg-brand-primary/20 my-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl hover:bg-brand-primary/10 text-text-secondary hover:text-brand-primary"
              title="Back to top"
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="block md:hidden mt-2 floating-nav rounded-2xl p-3 shadow-lg min-w-[180px]">
            <div className="space-y-1">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full justify-start gap-3 h-10 rounded-xl transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-brand-primary text-text-inverse hover:bg-brand-primary/90'
                      : 'hover:bg-brand-primary/10 text-text-secondary hover:text-brand-primary'
                  }`}
                >
                  {section.icon}
                  <span className="text-sm font-medium">{section.label}</span>
                </Button>
              ))}
              
              <div className="w-full h-px bg-brand-primary/20 my-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="w-full justify-start gap-3 h-10 rounded-xl hover:bg-brand-primary/10 text-text-secondary hover:text-brand-primary"
              >
                <ChevronUp className="w-5 h-5" />
                <span className="text-sm font-medium">Back to top</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-secondary/50 z-40">
        <div 
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300"
          style={{ 
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%` 
          }}
        />
      </div>
    </>
  );
};