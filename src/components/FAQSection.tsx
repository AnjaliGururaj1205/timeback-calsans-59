import React, { useState, useEffect } from 'react';
import { Search, HelpCircle, Phone, Mail, MessageCircle, ChevronRight, BookOpen, Shield, GraduationCap, CreditCard, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  relatedQuestions?: string[];
}

const faqData: FAQ[] = [
  // Getting Started
  {
    id: '1',
    question: 'How do I get started with Timeback for my child?',
    answer: 'Getting started is simple! First, create a parent account and add your child\'s profile. We\'ll assess their current level with a quick, fun diagnostic. Then our AI creates a personalized learning plan. Most families see engagement improvements within the first week.',
    category: 'Getting Started',
    keywords: ['start', 'begin', 'setup', 'account', 'profile'],
    relatedQuestions: ['2']
  },
  {
    id: '2',
    question: 'Can I try Timeback before committing to a subscription?',
    answer: 'Absolutely! We offer a 14-day free trial with full access to all features. No credit card required. This gives you and your child plenty of time to experience the difference Timeback makes.',
    category: 'Getting Started',
    keywords: ['trial', 'free', 'test', 'subscription'],
    relatedQuestions: ['1']
  },

  // Academic Results
  {
    id: '3',
    question: 'How quickly will I see improvement in my child\'s grades?',
    answer: 'Most parents notice improved confidence and engagement within 1-2 weeks. Grade improvements typically appear within 4-6 weeks. Our data shows an average of 2.3 grade levels improvement within the first semester.',
    category: 'Academic Results',
    keywords: ['grades', 'improvement', 'results', 'time'],
    relatedQuestions: ['4']
  },
  {
    id: '4',
    question: 'What subjects does Timeback cover?',
    answer: 'Timeback covers all core subjects: Math, Reading, Science, and Social Studies for grades K-12. We also offer specialized programs for test prep (SAT, ACT), foreign languages, and advanced placement courses.',
    category: 'Academic Results',
    keywords: ['subjects', 'math', 'reading', 'science', 'coverage'],
    relatedQuestions: ['3']
  },

  // Technology & Safety
  {
    id: '5',
    question: 'Is Timeback safe for my child to use?',
    answer: 'Absolutely. We\'re COPPA certified and follow the strictest child safety standards. All interactions are monitored, content is age-appropriate, and we never collect unnecessary personal information. Our AI is designed specifically for educational purposes.',
    category: 'Technology & Safety',
    keywords: ['safety', 'COPPA', 'child protection', 'monitoring'],
    relatedQuestions: ['6']
  },
  {
    id: '6',
    question: 'What devices does Timeback work on?',
    answer: 'Timeback works on tablets, computers, and smartphones. We have dedicated apps for iOS and Android, plus a web version that works on any modern browser. All progress syncs across devices automatically.',
    category: 'Technology & Safety',
    keywords: ['devices', 'compatibility', 'iOS', 'Android', 'web'],
    relatedQuestions: ['5']
  },

  // Pricing & Plans
  {
    id: '7',
    question: 'How much does Timeback cost?',
    answer: 'Plans start at $29/month per child for our Basic plan, $49/month for Premium (most popular), and $79/month for our Family plan (up to 4 children). All plans include unlimited subjects and 24/7 AI tutoring.',
    category: 'Pricing & Plans',
    keywords: ['cost', 'price', 'plans', 'monthly', 'subscription'],
    relatedQuestions: ['8']
  },
  {
    id: '8',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime with no penalty. Your child retains access until the end of the current billing period. We also offer pause options if you need a temporary break.',
    category: 'Pricing & Plans',
    keywords: ['cancel', 'subscription', 'refund', 'billing'],
    relatedQuestions: ['7']
  },

  // Implementation
  {
    id: '9',
    question: 'How much time should my child spend on Timeback daily?',
    answer: 'We recommend 20-30 minutes daily for elementary students and 30-45 minutes for middle/high school students. The key is consistency rather than long sessions. Our AI optimizes learning in shorter, focused bursts.',
    category: 'Implementation',
    keywords: ['time', 'daily', 'duration', 'schedule'],
    relatedQuestions: ['10']
  },
  {
    id: '10',
    question: 'What if my child doesn\'t like using Timeback?',
    answer: 'We have a 30-day satisfaction guarantee. If your child doesn\'t love Timeback within the first month, we\'ll refund your subscription. Our engagement rate is over 95%, so this rarely happens!',
    category: 'Implementation',
    keywords: ['engagement', 'satisfaction', 'refund', 'guarantee'],
    relatedQuestions: ['9']
  }
];

const categories = [
  { id: 'Getting Started', icon: BookOpen, color: 'text-brand-primary' },
  { id: 'Academic Results', icon: GraduationCap, color: 'text-brand-secondary' },
  { id: 'Technology & Safety', icon: Shield, color: 'text-brand-primary' },
  { id: 'Pricing & Plans', icon: CreditCard, color: 'text-brand-secondary' },
  { id: 'Implementation', icon: Settings, color: 'text-brand-primary' }
];

export const FAQSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);

  useEffect(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredFAQs(filtered);
  }, [searchTerm, selectedCategory]);

  const handleAccordionChange = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const getRelatedQuestions = (faq: FAQ) => {
    if (!faq.relatedQuestions) return [];
    return faq.relatedQuestions
      .map(id => faqData.find(f => f.id === id))
      .filter(Boolean) as FAQ[];
  };

  return (
    <div className="space-y-12 bg-surface-primary py-12 px-4">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold mb-4" style={{ color: '#0033cc' }}>Frequently Asked Questions</h2>
        <p className="text-lg md:text-xl font-poppins" style={{ color: '#66b2ff' }}>Everything parents want to know about Timeback</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <Input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-surface-secondary border-border text-text-primary placeholder:text-text-secondary h-12 rounded-full font-poppins"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => setSelectedCategory(null)}
          variant={selectedCategory === null ? 'default' : 'outline'}
          className={`transition-all duration-300 font-poppins ${
            selectedCategory === null
              ? 'bg-brand-primary text-white hover:bg-brand-secondary'
              : 'bg-surface-secondary text-text-primary border-border hover:bg-surface-tertiary'
          }`}
        >
          All Questions
        </Button>
        {categories.map(({ id, icon: Icon, color }) => (
          <Button
            key={id}
            onClick={() => setSelectedCategory(id)}
            variant={selectedCategory === id ? 'default' : 'outline'}
            className={`transition-all duration-300 font-poppins ${
              selectedCategory === id
                ? 'bg-brand-primary text-white hover:bg-brand-secondary'
                : 'bg-surface-secondary text-text-primary border-border hover:bg-surface-tertiary'
            }`}
          >
            <Icon className={`w-4 h-4 mr-2 ${color}`} />
            {id}
          </Button>
        ))}
      </div>

      {/* FAQ Results Count */}
      <div className="text-center">
        <p className="text-text-secondary font-poppins">
          Showing {filteredFAQs.length} of {faqData.length} questions
          {selectedCategory && ` in "${selectedCategory}"`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto">
        {filteredFAQs.length > 0 ? (
          <Accordion type="multiple" value={openItems} className="space-y-4">
            {filteredFAQs.map((faq) => {
              const category = categories.find(cat => cat.id === faq.category);
              const relatedQuestions = getRelatedQuestions(faq);
              
              return (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-surface-secondary border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger
                    onClick={() => handleAccordionChange(faq.id)}
                    className="px-6 py-4 hover:no-underline hover:bg-surface-tertiary transition-colors duration-300"
                  >
                    <div className="flex items-start space-x-4 text-left">
                      {category && (
                        <category.icon className={`w-5 h-5 mt-1 ${category.color} flex-shrink-0`} />
                      )}
                      <div className="flex-1">
                        <h3 className="text-text-primary font-poppins font-semibold text-lg">{faq.question}</h3>
                        <Badge className="mt-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20 font-poppins">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-text-secondary leading-relaxed font-poppins">{faq.answer}</p>
                      
                      {relatedQuestions.length > 0 && (
                        <div className="border-t border-border pt-4">
                          <h4 className="text-text-primary font-poppins font-medium mb-3">Related Questions:</h4>
                          <div className="space-y-2">
                            {relatedQuestions.map((related) => (
                              <button
                                key={related.id}
                                onClick={() => {
                                  if (!openItems.includes(related.id)) {
                                    handleAccordionChange(related.id);
                                  }
                                  // Scroll to the related question
                                  setTimeout(() => {
                                    const element = document.querySelector(`[data-state="open"][data-value="${related.id}"]`);
                                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  }, 100);
                                }}
                                className="flex items-center space-x-2 text-brand-primary hover:text-brand-secondary transition-colors duration-200 text-sm font-poppins"
                              >
                                <ChevronRight className="w-3 h-3" />
                                <span>{related.question}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-text-primary text-xl font-poppins font-semibold mb-2">No questions found</h3>
            <p className="text-text-secondary font-poppins">
              Try adjusting your search terms or browse different categories
            </p>
          </div>
        )}
      </div>

      {/* Contact Options */}
      <div className="bg-surface-secondary border border-border rounded-lg p-8 shadow-sm">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-poppins font-bold text-text-primary mb-2">Still have questions?</h3>
          <p className="text-text-secondary font-poppins">We're here to help! Choose how you'd like to connect with us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-text-primary font-poppins font-semibold mb-2">Live Chat</h4>
            <p className="text-text-secondary font-poppins text-sm mb-4">Get instant answers from our support team</p>
            <Button className="bg-brand-primary hover:bg-brand-secondary text-white font-poppins">
              Start Chat
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-text-primary font-poppins font-semibold mb-2">Email Support</h4>
            <p className="text-text-secondary font-poppins text-sm mb-4">Detailed responses within 24 hours</p>
            <Button className="bg-brand-secondary hover:bg-brand-primary text-white font-poppins">
              Send Email
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-text-primary font-poppins font-semibold mb-2">Phone Consultation</h4>
            <p className="text-text-secondary font-poppins text-sm mb-4">Free 15-minute consultation call</p>
            <Button className="bg-brand-primary hover:bg-brand-secondary text-white font-poppins">
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};