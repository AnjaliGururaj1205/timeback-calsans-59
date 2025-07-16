import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  photo: string;
  category: 'parent' | 'student' | 'educator';
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Martinez',
    role: 'Parent of 3rd Grader',
    location: 'Phoenix, AZ',
    rating: 5,
    quote: 'My son went from crying over homework to asking for extra math problems. Timeback made learning fun again.',
    photo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    category: 'parent'
  },
  {
    id: '2',
    name: 'Alex Thompson',
    role: '7th Grade Student',
    location: 'Seattle, WA',
    rating: 5,
    quote: 'I used to hate reading, but now I finish books in days. The AI helps me understand everything better.',
    photo: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    category: 'student'
  },
  {
    id: '3',
    name: 'Dr. Lisa Park',
    role: 'Elementary Principal',
    location: 'Portland, OR',
    rating: 5,
    quote: 'Our test scores improved 40% after implementing Timeback. It\'s not just technology, it\'s transformation.',
    photo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    category: 'educator'
  },
  {
    id: '4',
    name: 'Maria Garcia',
    role: 'Parent of 5th Grader',
    location: 'Miami, FL',
    rating: 5,
    quote: 'Homework time went from 3 hours to 45 minutes. My daughter actually enjoys learning now.',
    photo: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    category: 'parent'
  },
  {
    id: '5',
    name: 'Jordan Kim',
    role: '9th Grade Student',
    location: 'Boston, MA',
    rating: 5,
    quote: 'Timeback helped me understand concepts I\'ve been struggling with for years. My grades went from C\'s to A\'s.',
    photo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    category: 'student'
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <div className="relative bg-gradient-to-br from-surface-primary/50 to-surface-secondary/30 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white">What People Are Saying</h3>
        <div className="flex space-x-2">
          <Button
            onClick={prevTestimonial}
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={nextTestimonial}
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Quote Section */}
                <div className="flex-1">
                  <Quote className="w-8 h-8 text-brand-primary mb-4" />
                  <blockquote className="text-xl text-white leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-white/20">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-300 text-sm">{testimonial.role}</p>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    testimonial.category === 'parent' ? 'bg-blue-500/20 text-blue-300' :
                    testimonial.category === 'student' ? 'bg-green-500/20 text-green-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {testimonial.category.charAt(0).toUpperCase() + testimonial.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-brand-primary scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};