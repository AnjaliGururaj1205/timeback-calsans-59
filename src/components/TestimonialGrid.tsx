import React, { useState } from 'react';
import { Star, MapPin, User, GraduationCap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  photo: string;
  category: 'parent' | 'student' | 'educator';
  subject?: string;
  grade?: string;
  improvement: string;
  timeWithTimeback: string;
}

const testimonialData: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Parent',
    location: 'Austin, TX',
    rating: 5,
    quote: 'My daughter\'s confidence in math has skyrocketed. She went from failing tests to getting A\'s consistently.',
    photo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    category: 'parent',
    grade: '4th Grade',
    improvement: 'F to A in Math',
    timeWithTimeback: '6 months'
  },
  {
    id: '2',
    name: 'Marcus Davis',
    role: 'Student',
    location: 'Chicago, IL',
    rating: 5,
    quote: 'Timeback made learning fun. I actually look forward to doing homework now!',
    photo: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    category: 'student',
    subject: 'Science',
    grade: '6th Grade',
    improvement: 'C to A Average',
    timeWithTimeback: '4 months'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    role: 'Math Teacher',
    location: 'Los Angeles, CA',
    rating: 5,
    quote: 'I\'ve never seen students so engaged. Timeback has transformed my classroom dynamics completely.',
    photo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    category: 'educator',
    subject: 'Mathematics',
    improvement: '40% Class Average Increase',
    timeWithTimeback: '1 year'
  },
  {
    id: '4',
    name: 'Lisa Chen',
    role: 'Parent',
    location: 'San Francisco, CA',
    rating: 5,
    quote: 'Homework time went from 3 hours of tears to 45 minutes of focused learning.',
    photo: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    category: 'parent',
    grade: '3rd Grade',
    improvement: '75% Time Reduction',
    timeWithTimeback: '8 months'
  },
  {
    id: '5',
    name: 'Jordan Kim',
    role: 'Student',
    location: 'New York, NY',
    rating: 5,
    quote: 'I finally understand algebra! The AI explains things in a way that makes sense to me.',
    photo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    category: 'student',
    subject: 'Algebra',
    grade: '8th Grade',
    improvement: 'D to B+ in Algebra',
    timeWithTimeback: '5 months'
  },
  {
    id: '6',
    name: 'Principal Williams',
    role: 'School Principal',
    location: 'Denver, CO',
    rating: 5,
    quote: 'Our school\'s test scores improved across all subjects. Parents are thrilled with the results.',
    photo: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    category: 'educator',
    improvement: '35% School-wide Improvement',
    timeWithTimeback: '2 years'
  }
];

export const TestimonialGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'parent' | 'student' | 'educator'>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredTestimonials = testimonialData.filter(
    testimonial => selectedCategory === 'all' || testimonial.category === selectedCategory
  );

  const displayedTestimonials = showAll ? filteredTestimonials : filteredTestimonials.slice(0, 6);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'parent':
        return <Heart className="w-4 h-4" />;
      case 'student':
        return <User className="w-4 h-4" />;
      case 'educator':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'parent':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'student':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'educator':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">Success Stories</h3>
        <p className="text-gray-300 text-lg mb-8">Real results from real families</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {[
          { key: 'all', label: 'All Stories', icon: <User className="w-4 h-4" /> },
          { key: 'parent', label: 'Parents', icon: <Heart className="w-4 h-4" /> },
          { key: 'student', label: 'Students', icon: <User className="w-4 h-4" /> },
          { key: 'educator', label: 'Educators', icon: <GraduationCap className="w-4 h-4" /> }
        ].map(({ key, label, icon }) => (
          <Button
            key={key}
            onClick={() => setSelectedCategory(key as any)}
            variant={selectedCategory === key ? 'default' : 'outline'}
            className={`transition-all duration-300 ${
              selectedCategory === key
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            {icon}
            <span className="ml-2">{label}</span>
          </Button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
          >
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-gray-300 text-sm">{testimonial.role}</p>
                <div className="flex items-center text-gray-400 text-xs mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {testimonial.location}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4">
              {renderStars(testimonial.rating)}
            </div>

            {/* Quote */}
            <blockquote className="text-white text-sm leading-relaxed mb-4 italic">
              "{testimonial.quote}"
            </blockquote>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge className={`${getCategoryColor(testimonial.category)} border`}>
                  {getCategoryIcon(testimonial.category)}
                  <span className="ml-1 capitalize">{testimonial.category}</span>
                </Badge>
                <span className="text-gray-400 text-xs">{testimonial.timeWithTimeback}</span>
              </div>
              
              {testimonial.subject && (
                <p className="text-gray-300 text-xs">Subject: {testimonial.subject}</p>
              )}
              
              {testimonial.grade && (
                <p className="text-gray-300 text-xs">Grade: {testimonial.grade}</p>
              )}
              
              <div className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-lg p-3 mt-4">
                <p className="text-brand-primary font-semibold text-sm">Key Improvement:</p>
                <p className="text-white text-sm">{testimonial.improvement}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {filteredTestimonials.length > 6 && (
        <div className="text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            {showAll ? 'Show Less' : `View All ${filteredTestimonials.length} Stories`}
          </Button>
        </div>
      )}
    </div>
  );
};