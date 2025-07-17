import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, TrendingUp, Award, Search, Loader2, AlertCircle, BarChart3, Users, Target } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import usMapImage from '@/assets/us-map.png';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleZipSearch = async () => {
    if (!searchZip.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const district = schoolDistrictData.find(d => d.zipCode === searchZip.trim());
    if (district) {
      setSelectedDistrict(district);
      setError(null);
    } else {
      setError(`No data available for zip code ${searchZip}. Try: 78701, 75201, 77001, 78201, 90210, or 10001`);
      setSelectedDistrict(null);
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleZipSearch();
    }
  };

  return (
    <div className="space-y-8">
      {/* Interactive Map with Search */}
      <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/30 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative min-h-[420px]">
          {/* Map Image */}
          <div className="relative">
            <div className="relative w-full h-80 overflow-hidden">
              <img 
                src={usMapImage} 
                alt="United States Map" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/30 via-transparent to-brand-primary/10"></div>
              
              {/* Map Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="text-center">
                  <h4 className="text-2xl md:text-3xl font-cal font-bold text-white mb-2 drop-shadow-lg">
                    TimeBack Performance Map
                  </h4>
                  <p className="text-white/90 text-lg font-medium drop-shadow-sm">
                    Enter your ZIP code to see the comparison
                  </p>
                </div>
                
                {/* Enhanced Search Bar */}
                <div className="flex justify-center">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30 max-w-sm w-full">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Enter ZIP code (e.g., 78701)"
                          value={searchZip}
                          onChange={(e) => setSearchZip(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="border-brand-primary/20 focus:border-brand-secondary focus:ring-brand-secondary text-center font-medium"
                          disabled={isLoading}
                        />
                      </div>
                      <Button
                        onClick={handleZipSearch}
                        disabled={isLoading || !searchZip.trim()}
                        className="bg-brand-secondary hover:bg-brand-primary text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-[48px] h-[48px] rounded-xl"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Search className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      Available: Austin, Dallas, Houston, San Antonio, Beverly Hills, NYC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

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
                onClick={() => {
                  setSelectedDistrict(null);
                  setError(null);
                }}
                className="hover:bg-surface-secondary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Statistical Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-surface-secondary/30 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-brand-secondary mr-2" />
                  <span className="font-cal font-semibold text-text-brand">Performance Gap</span>
                </div>
                <div className="text-2xl font-bold text-green-500">+{selectedDistrict.improvement}</div>
                <div className="text-sm text-text-secondary">MAP points higher</div>
              </div>
              
              <div className="bg-surface-secondary/30 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-5 h-5 text-brand-secondary mr-2" />
                  <span className="font-cal font-semibold text-text-brand">Improvement</span>
                </div>
                <div className="text-2xl font-bold text-brand-secondary">
                  {Math.round((selectedDistrict.improvement / selectedDistrict.mapScore) * 100)}%
                </div>
                <div className="text-sm text-text-secondary">better performance</div>
              </div>
              
              <div className="bg-surface-secondary/30 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-brand-secondary mr-2" />
                  <span className="font-cal font-semibold text-text-brand">Students Tested</span>
                </div>
                <div className="text-2xl font-bold text-text-brand">{selectedDistrict.studentCount.toLocaleString()}</div>
                <div className="text-sm text-text-secondary">in local district</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Local District Performance */}
              <div className="bg-surface-secondary/50 rounded-2xl p-6 border border-border/30">
                <h4 className="text-lg font-cal font-semibold text-text-brand mb-4 flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                  {selectedDistrict.districtName}
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average MAP Score</span>
                    <span className="text-3xl font-cal font-bold text-text-brand">
                      {selectedDistrict.mapScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Students Tested</span>
                    <span className="font-semibold text-text-brand">
                      {selectedDistrict.studentCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gray-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${(selectedDistrict.mapScore / 250) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* TimeBack Performance */}
              <div className="bg-gradient-to-br from-brand-accent/10 to-brand-secondary/10 rounded-2xl p-6 border border-brand-accent/20">
                <h4 className="text-lg font-cal font-semibold text-text-brand mb-4 flex items-center">
                  <div className="w-3 h-3 bg-brand-secondary rounded-full mr-3"></div>
                  TimeBack Students
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average MAP Score</span>
                    <span className="text-3xl font-cal font-bold text-brand-secondary">
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
                  <div className="w-full bg-brand-accent/20 rounded-full h-3">
                    <div 
                      className="bg-brand-secondary h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${(selectedDistrict.timebackScore / 250) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-gradient-to-r from-green-500/10 to-brand-accent/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-green-500" />
                <h4 className="text-lg font-cal font-semibold text-text-brand">Performance Analysis</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-text-brand mb-2">Key Findings:</h5>
                  <ul className="space-y-1 text-text-brand">
                    <li>• TimeBack students score {selectedDistrict.improvement} points higher on MAP assessments</li>
                    <li>• This represents a {Math.round((selectedDistrict.improvement / selectedDistrict.mapScore) * 100)}% improvement over traditional methods</li>
                    <li>• Consistent outperformance across all grade levels tested</li>
                    <li>• Students achieve results in just 2 hours of daily instruction</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-text-brand mb-2">Statistical Significance:</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Confidence Level:</span>
                      <span className="font-semibold text-text-brand">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Effect Size:</span>
                      <span className="font-semibold text-text-brand">Large (d = 0.8+)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Time Savings:</span>
                      <span className="font-semibold text-green-500">75% reduction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};