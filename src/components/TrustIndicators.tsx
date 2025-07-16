import React from 'react';
import { Star, Shield, Users, Award, TrendingUp } from 'lucide-react';

interface TrustMetric {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const trustMetrics: TrustMetric[] = [
  {
    id: '1',
    label: 'Average Rating',
    value: '4.9/5',
    icon: <Star className="w-6 h-6" />,
    description: 'Based on 2,847 verified reviews'
  },
  {
    id: '2',
    label: 'Students Served',
    value: '50,000+',
    icon: <Users className="w-6 h-6" />,
    description: 'Across 48 states and growing'
  },
  {
    id: '3',
    label: 'Avg. Grade Improvement',
    value: '2.3 grades',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Within first 6 months of use'
  },
  {
    id: '4',
    label: 'Safety Certified',
    value: 'COPPA',
    icon: <Shield className="w-6 h-6" />,
    description: 'Child privacy protection compliant'
  }
];

interface ReviewPlatform {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: string;
  url: string;
}

const reviewPlatforms: ReviewPlatform[] = [
  {
    id: '1',
    name: 'Google Reviews',
    logo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    rating: 4.8,
    reviewCount: '1,240',
    url: '#'
  },
  {
    id: '2',
    name: 'Trustpilot',
    logo: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    rating: 4.9,
    reviewCount: '890',
    url: '#'
  },
  {
    id: '3',
    name: 'App Store',
    logo: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    rating: 4.7,
    reviewCount: '567',
    url: '#'
  },
  {
    id: '4',
    name: 'Common Sense Media',
    logo: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    rating: 5.0,
    reviewCount: '150',
    url: '#'
  }
];

export const TrustIndicators: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <div className="space-y-12">
      {/* Trust Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trustMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              {metric.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-brand-primary font-semibold text-sm mb-2">{metric.label}</div>
            <div className="text-gray-400 text-xs leading-relaxed">{metric.description}</div>
          </div>
        ))}
      </div>

      {/* Review Platforms */}
      <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h4 className="text-2xl font-bold text-white mb-2">Trusted by Parents Everywhere</h4>
          <p className="text-gray-300">See what families are saying on these platforms</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewPlatforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              className="group bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              
              <h5 className="text-white font-semibold text-sm mb-2">{platform.name}</h5>
              
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(platform.rating)}
                <span className="text-white text-sm font-medium ml-1">{platform.rating}</span>
              </div>
              
              <p className="text-gray-400 text-xs">{platform.reviewCount} reviews</p>
            </a>
          ))}
        </div>

        {/* Aggregate Rating Display */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-full px-6 py-3 border border-brand-primary/30">
            <Award className="w-6 h-6 text-brand-primary" />
            <div className="text-left">
              <div className="text-white font-bold">4.8 Overall Rating</div>
              <div className="text-gray-300 text-sm">From 2,847 verified families</div>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance Badges */}
      <div className="flex flex-wrap justify-center items-center gap-6 py-6">
        <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <Shield className="w-5 h-5 text-green-400" />
          <span className="text-white text-sm font-medium">COPPA Compliant</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-white text-sm font-medium">SOC 2 Certified</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <Shield className="w-5 h-5 text-purple-400" />
          <span className="text-white text-sm font-medium">FERPA Compliant</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <Award className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-sm font-medium">EdTech Privacy Certified</span>
        </div>
      </div>
    </div>
  );
};