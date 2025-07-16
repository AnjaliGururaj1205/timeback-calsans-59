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
    relatedQuestions: ['2', '3']
  },
  {
    id: '2',
    question: 'What information do you need about my child?',
    answer: 'We only need basic information: your child\'s grade level, subjects they\'re working on, and any specific learning goals. Our initial assessment takes care of the rest. We follow strict privacy guidelines and never collect unnecessary personal data.',
    category: 'Getting Started',
    keywords: ['information', 'data', 'privacy', 'assessment'],
    relatedQuestions: ['1', '15']
  },
  {
    id: '3',
    question: 'How long does the initial setup take?',
    answer: 'The entire setup process takes about 15 minutes. This includes creating your account, adding your child\'s profile, and completing the initial assessment. Your child can start learning immediately after setup.',
    category: 'Getting Started',
    keywords: ['setup', 'time', 'duration', 'assessment'],
    relatedQuestions: ['1', '4']
  },
  {
    id: '4',
    question: 'Can I try Timeback before committing to a subscription?',
    answer: 'Absolutely! We offer a 14-day free trial with full access to all features. No credit card required. This gives you and your child plenty of time to experience the difference Timeback makes.',
    category: 'Getting Started',
    keywords: ['trial', 'free', 'test', 'subscription'],
    relatedQuestions: ['19', '20']
  },

  // Academic Results
  {
    id: '5',
    question: 'How quickly will I see improvement in my child\'s grades?',
    answer: 'Most parents notice improved confidence and engagement within 1-2 weeks. Grade improvements typically appear within 4-6 weeks. Our data shows an average of 2.3 grade levels improvement within the first semester.',
    category: 'Academic Results',
    keywords: ['grades', 'improvement', 'results', 'time'],
    relatedQuestions: ['6', '7']
  },
  {
    id: '6',
    question: 'What subjects does Timeback cover?',
    answer: 'Timeback covers all core subjects: Math, Reading, Science, and Social Studies for grades K-12. We also offer specialized programs for test prep (SAT, ACT), foreign languages, and advanced placement courses.',
    category: 'Academic Results',
    keywords: ['subjects', 'math', 'reading', 'science', 'coverage'],
    relatedQuestions: ['5', '8']
  },
  {
    id: '7',
    question: 'How does Timeback adapt to my child\'s learning style?',
    answer: 'Our AI analyzes how your child learns best through their interactions, response times, and success patterns. It then adapts the teaching style, pace, and content presentation. Visual learners get more diagrams, auditory learners get explanations, kinesthetic learners get interactive elements.',
    category: 'Academic Results',
    keywords: ['adapt', 'learning style', 'personalized', 'AI'],
    relatedQuestions: ['8', '9']
  },
  {
    id: '8',
    question: 'Can Timeback help with homework and test preparation?',
    answer: 'Yes! Timeback excels at homework support and test prep. It can help explain specific problems, provide practice questions, and create custom study plans. For major tests like SAT/ACT, we have specialized prep modules.',
    category: 'Academic Results',
    keywords: ['homework', 'test prep', 'SAT', 'ACT', 'study'],
    relatedQuestions: ['6', '7']
  },

  // Technology & Safety
  {
    id: '9',
    question: 'Is Timeback safe for my child to use?',
    answer: 'Absolutely. We\'re COPPA certified and follow the strictest child safety standards. All interactions are monitored, content is age-appropriate, and we never collect unnecessary personal information. Our AI is designed specifically for educational purposes.',
    category: 'Technology & Safety',
    keywords: ['safety', 'COPPA', 'child protection', 'monitoring'],
    relatedQuestions: ['10', '15']
  },
  {
    id: '10',
    question: 'What devices does Timeback work on?',
    answer: 'Timeback works on tablets, computers, and smartphones. We have dedicated apps for iOS and Android, plus a web version that works on any modern browser. All progress syncs across devices automatically.',
    category: 'Technology & Safety',
    keywords: ['devices', 'compatibility', 'iOS', 'Android', 'web'],
    relatedQuestions: ['11', '12']
  },
  {
    id: '11',
    question: 'Do we need special equipment or internet requirements?',
    answer: 'No special equipment needed! Any device with internet access works. We recommend a stable internet connection for the best experience, but Timeback works on standard home internet speeds.',
    category: 'Technology & Safety',
    keywords: ['equipment', 'internet', 'requirements', 'connection'],
    relatedQuestions: ['10', '12']
  },
  {
    id: '12',
    question: 'How do you protect my child\'s privacy and data?',
    answer: 'We use bank-level encryption and follow FERPA and COPPA guidelines. Your child\'s data is never sold or shared. We collect only what\'s needed for learning and delete inactive accounts according to legal requirements.',
    category: 'Technology & Safety',
    keywords: ['privacy', 'data protection', 'encryption', 'FERPA'],
    relatedQuestions: ['9', '15']
  },

  // Pricing & Plans
  {
    id: '13',
    question: 'How much does Timeback cost?',
    answer: 'Plans start at $29/month per child for our Basic plan, $49/month for Premium (most popular), and $79/month for our Family plan (up to 4 children). All plans include unlimited subjects and 24/7 AI tutoring.',
    category: 'Pricing & Plans',
    keywords: ['cost', 'price', 'plans', 'monthly', 'subscription'],
    relatedQuestions: ['14', '16']
  },
  {
    id: '14',
    question: 'Are there any additional fees or hidden costs?',
    answer: 'No hidden fees! The monthly subscription includes everything: all subjects, unlimited AI tutoring, progress tracking, parent dashboard, and customer support. The only optional add-on is our 1-on-1 human tutor sessions.',
    category: 'Pricing & Plans',
    keywords: ['fees', 'hidden costs', 'additional', 'subscription'],
    relatedQuestions: ['13', '17']
  },
  {
    id: '15',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime with no penalty. Your child retains access until the end of the current billing period. We also offer pause options if you need a temporary break.',
    category: 'Pricing & Plans',
    keywords: ['cancel', 'subscription', 'refund', 'billing'],
    relatedQuestions: ['16', '19']
  },
  {
    id: '16',
    question: 'Do you offer discounts for multiple children?',
    answer: 'Yes! Our Family plan covers up to 4 children for $79/month (normally $116). We also offer sibling discounts and financial assistance programs for qualifying families.',
    category: 'Pricing & Plans',
    keywords: ['discount', 'multiple children', 'family plan', 'siblings'],
    relatedQuestions: ['13', '17']
  },

  // Implementation
  {
    id: '17',
    question: 'How much time should my child spend on Timeback daily?',
    answer: 'We recommend 20-30 minutes daily for elementary students and 30-45 minutes for middle/high school students. The key is consistency rather than long sessions. Our AI optimizes learning in shorter, focused bursts.',
    category: 'Implementation',
    keywords: ['time', 'daily', 'duration', 'schedule'],
    relatedQuestions: ['18', '21']
  },
  {
    id: '18',
    question: 'How involved do I need to be as a parent?',
    answer: 'Timeback is designed to be independent for most children, but parent involvement enhances results. You\'ll receive weekly progress reports and can set learning goals. Many parents spend 5-10 minutes weekly reviewing progress.',
    category: 'Implementation',
    keywords: ['parent involvement', 'independent', 'progress', 'supervision'],
    relatedQuestions: ['17', '22']
  },
  {
    id: '19',
    question: 'What if my child doesn\'t like using Timeback?',
    answer: 'We have a 30-day satisfaction guarantee. If your child doesn\'t love Timeback within the first month, we\'ll refund your subscription. Our engagement rate is over 95%, so this rarely happens!',
    category: 'Implementation',
    keywords: ['engagement', 'satisfaction', 'refund', 'guarantee'],
    relatedQuestions: ['4', '15']
  },
  {
    id: '20',
    question: 'Can Timeback replace traditional tutoring?',
    answer: 'For many families, yes! Timeback provides 24/7 personalized instruction that adapts to your child\'s pace. However, we also offer hybrid options with human tutors for families who want both AI and human support.',
    category: 'Implementation',
    keywords: ['tutoring', 'replace', 'traditional', 'human tutor'],
    relatedQuestions: ['21', '22']
  }
];

const categories = [
  { id: 'Getting Started', icon: BookOpen, color: 'text-blue-400' },
  { id: 'Academic Results', icon: GraduationCap, color: 'text-green-400' },
  { id: 'Technology & Safety', icon: Shield, color: 'text-purple-400' },
  { id: 'Pricing & Plans', icon: CreditCard, color: 'text-yellow-400' },
  { id: 'Implementation', icon: Settings, color: 'text-pink-400' }
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
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-300 text-lg">Everything parents want to know about Timeback</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-full"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => setSelectedCategory(null)}
          variant={selectedCategory === null ? 'default' : 'outline'}
          className={`transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-brand-primary text-white'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          All Questions
        </Button>
        {categories.map(({ id, icon: Icon, color }) => (
          <Button
            key={id}
            onClick={() => setSelectedCategory(id)}
            variant={selectedCategory === id ? 'default' : 'outline'}
            className={`transition-all duration-300 ${
              selectedCategory === id
                ? 'bg-brand-primary text-white'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Icon className={`w-4 h-4 mr-2 ${color}`} />
            {id}
          </Button>
        ))}
      </div>

      {/* FAQ Results Count */}
      <div className="text-center">
        <p className="text-gray-400">
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
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                >
                  <AccordionTrigger
                    onClick={() => handleAccordionChange(faq.id)}
                    className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="flex items-start space-x-4 text-left">
                      {category && (
                        <category.icon className={`w-5 h-5 mt-1 ${category.color} flex-shrink-0`} />
                      )}
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{faq.question}</h3>
                        <Badge className="mt-2 bg-white/10 text-gray-300 border-white/20">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      
                      {relatedQuestions.length > 0 && (
                        <div className="border-t border-white/10 pt-4">
                          <h4 className="text-white font-medium mb-3">Related Questions:</h4>
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
                                className="flex items-center space-x-2 text-brand-primary hover:text-brand-secondary transition-colors duration-200 text-sm"
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
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No questions found</h3>
            <p className="text-gray-400">
              Try adjusting your search terms or browse different categories
            </p>
          </div>
        )}
      </div>

      {/* Contact Options */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-300">We're here to help! Choose how you'd like to connect with us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Live Chat</h4>
            <p className="text-gray-300 text-sm mb-4">Get instant answers from our support team</p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Start Chat
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Email Support</h4>
            <p className="text-gray-300 text-sm mb-4">Detailed responses within 24 hours</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Send Email
            </Button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Phone Consultation</h4>
            <p className="text-gray-300 text-sm mb-4">Free 15-minute consultation call</p>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};