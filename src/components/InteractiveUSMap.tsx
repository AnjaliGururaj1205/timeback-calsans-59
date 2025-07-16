import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, Award } from 'lucide-react';

interface SchoolDistrictData {
  city: string;
  state: string;
  districtName: string;
  mapScore: number;
  alphaScore: number;
  improvement: number;
  studentCount: number;
}

const schoolDistrictData: SchoolDistrictData[] = [
  {
    city: 'Austin',
    state: 'TX', 
    districtName: 'Austin ISD',
    mapScore: 205,
    alphaScore: 235,
    improvement: 30,
    studentCount: 850
  },
  {
    city: 'Dallas',
    state: 'TX',
    districtName: 'Dallas ISD', 
    mapScore: 198,
    alphaScore: 232,
    improvement: 34,
    studentCount: 1200
  },
  {
    city: 'Houston',
    state: 'TX',
    districtName: 'Houston ISD',
    mapScore: 201,
    alphaScore: 238,
    improvement: 37,
    studentCount: 980
  },
  {
    city: 'San Antonio',
    state: 'TX',
    districtName: 'San Antonio ISD',
    mapScore: 196,
    alphaScore: 229,
    improvement: 33,
    studentCount: 720
  }
];

export const InteractiveUSMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<SchoolDistrictData | null>(null);

  const handleCityClick = (district: SchoolDistrictData) => {
    setSelectedDistrict(district);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
          See How Alpha Students Compare
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Click on any city below to see how Alpha students perform compared to local school districts on standardized MAP assessments
        </p>
      </div>

      {/* Simplified Interactive Map - City Buttons */}
      <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/50 rounded-3xl p-8 shadow-lg">
        <div className="relative bg-brand-secondary/5 rounded-2xl p-8 min-h-[400px]">
          <div className="text-center mb-8">
            <h4 className="text-xl font-cal font-semibold text-text-brand mb-2">Texas School Districts</h4>
            <p className="text-text-secondary">Click on a city to compare MAP test results</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {schoolDistrictData.map((district) => (
              <Button
                key={`${district.city}-${district.state}`}
                onClick={() => handleCityClick(district)}
                className="group h-16 bg-brand-accent/10 hover:bg-brand-accent text-text-brand hover:text-brand-secondary border border-brand-accent/20 hover:border-brand-accent rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                variant="outline"
              >
                <div className="text-center">
                  <div className="font-cal font-semibold">{district.city}</div>
                  <div className="text-sm opacity-80">{district.state}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Comparison Popup */}
      {selectedDistrict && (
        <Card className="bg-gradient-to-br from-brand-accent/5 to-brand-secondary/5 border border-brand-accent/20 rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-cal font-bold text-text-brand">
                  {selectedDistrict.city}, {selectedDistrict.state}
                </h3>
                <p className="text-text-secondary">{selectedDistrict.districtName}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedDistrict(null)}
                className="hover:bg-surface-secondary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Local District Performance */}
              <div className="bg-surface-secondary/50 rounded-2xl p-6 border border-border/30">
                <h4 className="text-lg font-cal font-semibold text-text-brand mb-4">
                  {selectedDistrict.districtName}
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average MAP Score</span>
                    <span className="text-2xl font-cal font-bold text-text-brand">
                      {selectedDistrict.mapScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Students Tested</span>
                    <span className="font-semibold text-text-brand">
                      {selectedDistrict.studentCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alpha Performance */}
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-secondary/10 rounded-2xl p-6 border border-brand-accent/20">
                <h4 className="text-lg font-cal font-semibold text-text-brand mb-4">
                  Alpha School Students
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average MAP Score</span>
                    <span className="text-2xl font-cal font-bold text-brand-secondary">
                      {selectedDistrict.alphaScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Performance Gap</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-500">
                        +{selectedDistrict.improvement} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-brand-accent/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-6 h-6 text-green-500" />
                <h4 className="text-lg font-cal font-semibold text-text-brand">Performance Summary</h4>
              </div>
              <p className="text-text-brand leading-relaxed">
                Alpha students in {selectedDistrict.city} outperform local district students by{' '}
                <span className="font-bold text-brand-secondary">{selectedDistrict.improvement} points</span>{' '}
                on MAP assessments, representing a{' '}
                <span className="font-bold text-brand-secondary">
                  {Math.round((selectedDistrict.improvement / selectedDistrict.mapScore) * 100)}%
                </span>{' '}
                improvement over traditional education methods.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};