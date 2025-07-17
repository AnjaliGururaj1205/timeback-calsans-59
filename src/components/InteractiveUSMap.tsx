import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, TrendingUp, Award, Search } from 'lucide-react';

interface SchoolDistrictData {
  zipCode: string;
  city: string;
  state: string;
  districtName: string;
  mapScore: number;
  timebackScore: number;
  improvement: number;
  studentCount: number;
}

const schoolDistrictData: SchoolDistrictData[] = [
  {
    zipCode: '78701',
    city: 'Austin',
    state: 'TX', 
    districtName: 'Austin ISD',
    mapScore: 205,
    timebackScore: 235,
    improvement: 30,
    studentCount: 850
  },
  {
    zipCode: '75201',
    city: 'Dallas',
    state: 'TX',
    districtName: 'Dallas ISD', 
    mapScore: 198,
    timebackScore: 232,
    improvement: 34,
    studentCount: 1200
  },
  {
    zipCode: '77001',
    city: 'Houston',
    state: 'TX',
    districtName: 'Houston ISD',
    mapScore: 201,
    timebackScore: 238,
    improvement: 37,
    studentCount: 980
  },
  {
    zipCode: '78201',
    city: 'San Antonio',
    state: 'TX',
    districtName: 'San Antonio ISD',
    mapScore: 196,
    timebackScore: 229,
    improvement: 33,
    studentCount: 720
  },
  {
    zipCode: '90210',
    city: 'Beverly Hills',
    state: 'CA',
    districtName: 'Beverly Hills USD',
    mapScore: 218,
    timebackScore: 248,
    improvement: 30,
    studentCount: 640
  },
  {
    zipCode: '10001',
    city: 'New York',
    state: 'NY',
    districtName: 'New York City DOE',
    mapScore: 203,
    timebackScore: 241,
    improvement: 38,
    studentCount: 1500
  }
];

export const InteractiveUSMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<SchoolDistrictData | null>(null);
  const [searchZip, setSearchZip] = useState('');

  const handleZipSearch = () => {
    const district = schoolDistrictData.find(d => d.zipCode === searchZip);
    if (district) {
      setSelectedDistrict(district);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleZipSearch();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
          See How TimeBack Students Compare
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Enter your zip code to see how TimeBack students perform compared to your local school district on standardized MAP assessments
        </p>
      </div>

      {/* Interactive Map with Search */}
      <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/50 rounded-3xl p-8 shadow-lg">
        <div className="relative bg-brand-secondary/5 rounded-2xl p-8 min-h-[400px]">
          {/* Map Image */}
          <div className="relative mb-8">
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center border border-blue-200/50">
              <div className="text-center space-y-2">
                <div className="text-6xl">🗺️</div>
                <h4 className="text-xl font-cal font-semibold text-text-brand">United States School Districts</h4>
                <p className="text-text-secondary">Enter your zip code to compare results</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Enter zip code"
                  value={searchZip}
                  onChange={(e) => setSearchZip(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-32 text-sm"
                />
                <Button
                  onClick={handleZipSearch}
                  size="sm"
                  className="bg-brand-secondary hover:bg-brand-accent text-white"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Comparison Results */}
      {selectedDistrict && (
        <Card className="bg-gradient-to-br from-brand-accent/5 to-brand-secondary/5 border border-brand-accent/20 rounded-3xl p-8 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-cal font-bold text-text-brand">
                  {selectedDistrict.city}, {selectedDistrict.state} ({selectedDistrict.zipCode})
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

              {/* TimeBack Performance */}
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-secondary/10 rounded-2xl p-6 border border-brand-accent/20">
                <h4 className="text-lg font-cal font-semibold text-text-brand mb-4">
                  TimeBack Students
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average MAP Score</span>
                    <span className="text-2xl font-cal font-bold text-brand-secondary">
                      {selectedDistrict.timebackScore}
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
                TimeBack students in {selectedDistrict.city} outperform local district students by{' '}
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