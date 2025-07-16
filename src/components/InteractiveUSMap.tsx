import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, TrendingUp, Award, Search, MapPin, ZoomIn, ZoomOut } from 'lucide-react';

interface SchoolDistrictData {
  city: string;
  state: string;
  districtName: string;
  mapScore: number;
  alphaScore: number;
  improvement: number;
  studentCount: number;
  lat: number;
  lng: number;
}

const schoolDistrictData: SchoolDistrictData[] = [
  { city: 'Austin', state: 'TX', districtName: 'Austin ISD', mapScore: 205, alphaScore: 235, improvement: 30, studentCount: 850, lat: 30.2672, lng: -97.7431 },
  { city: 'Dallas', state: 'TX', districtName: 'Dallas ISD', mapScore: 198, alphaScore: 232, improvement: 34, studentCount: 1200, lat: 32.7767, lng: -96.7970 },
  { city: 'Houston', state: 'TX', districtName: 'Houston ISD', mapScore: 201, alphaScore: 238, improvement: 37, studentCount: 980, lat: 29.7604, lng: -95.3698 },
  { city: 'San Antonio', state: 'TX', districtName: 'San Antonio ISD', mapScore: 196, alphaScore: 229, improvement: 33, studentCount: 720, lat: 29.4241, lng: -98.4936 },
  { city: 'Phoenix', state: 'AZ', districtName: 'Phoenix Union High School District', mapScore: 190, alphaScore: 225, improvement: 35, studentCount: 950, lat: 33.4484, lng: -112.0740 },
  { city: 'Los Angeles', state: 'CA', districtName: 'Los Angeles USD', mapScore: 195, alphaScore: 230, improvement: 35, studentCount: 1500, lat: 34.0522, lng: -118.2437 },
  { city: 'Miami', state: 'FL', districtName: 'Miami-Dade County Public Schools', mapScore: 188, alphaScore: 228, improvement: 40, studentCount: 1100, lat: 25.7617, lng: -80.1918 },
  { city: 'Chicago', state: 'IL', districtName: 'Chicago Public Schools', mapScore: 185, alphaScore: 222, improvement: 37, studentCount: 1300, lat: 41.8781, lng: -87.6298 },
  { city: 'New York', state: 'NY', districtName: 'New York City Department of Education', mapScore: 192, alphaScore: 228, improvement: 36, studentCount: 1800, lat: 40.7128, lng: -74.0060 },
  { city: 'Atlanta', state: 'GA', districtName: 'Atlanta Public Schools', mapScore: 187, alphaScore: 224, improvement: 37, studentCount: 900, lat: 33.7490, lng: -84.3880 },
  { city: 'Denver', state: 'CO', districtName: 'Denver Public Schools', mapScore: 203, alphaScore: 240, improvement: 37, studentCount: 800, lat: 39.7392, lng: -104.9903 },
  { city: 'Seattle', state: 'WA', districtName: 'Seattle Public Schools', mapScore: 208, alphaScore: 245, improvement: 37, studentCount: 750, lat: 47.6062, lng: -122.3321 }
];

export const InteractiveUSMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<SchoolDistrictData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const filteredDistricts = schoolDistrictData.filter(district =>
    district.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    district.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    district.districtName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityClick = (district: SchoolDistrictData) => {
    setSelectedDistrict(district);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate position for each district marker based on lat/lng
  const getMarkerPosition = (lat: number, lng: number) => {
    // Simple projection for US map (not geographically accurate but visually appealing)
    const x = ((lng + 125) / 58) * 100; // Normalize longitude to 0-100%
    const y = ((50 - lat) / 25) * 100;  // Normalize latitude to 0-100%
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPanX(e.clientX - dragStart.x);
        setPanY(e.clientY - dragStart.y);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="space-y-8 animate-on-scroll">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-text-brand">
          Interactive Performance Map
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Explore how Alpha students perform compared to local school districts across the United States
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by city, state, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-surface-secondary border-brand-primary/20 focus:border-brand-primary"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            className="border-brand-primary/20 hover:bg-brand-primary/10"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-text-secondary min-w-[60px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className="border-brand-primary/20 hover:bg-brand-primary/10"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Interactive Map */}
      <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-brand-primary/20 rounded-3xl p-4 shadow-lg overflow-hidden">
        <div 
          ref={mapRef}
          className="relative bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ height: '500px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* US Map Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-brand-light/20 to-brand-primary/10 transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel}) translate(${panX / zoomLevel}px, ${panY / zoomLevel}px)`,
              backgroundImage: `
                radial-gradient(circle at 20% 80%, hsl(var(--brand-primary) / 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, hsl(var(--brand-secondary) / 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, hsl(var(--brand-glow) / 0.05) 0%, transparent 50%)
              `
            }}
          >
            {/* State Outlines (simplified) */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-20" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid slice"
            >
              <path 
                d="M10,20 L90,20 L90,80 L10,80 Z M30,30 L70,30 L70,70 L30,70 Z" 
                fill="none" 
                stroke="hsl(var(--brand-primary))" 
                strokeWidth="0.5"
                className="opacity-30"
              />
            </svg>

            {/* District Markers */}
            {filteredDistricts.map((district) => {
              const { x, y } = getMarkerPosition(district.lat, district.lng);
              return (
                <div
                  key={`${district.city}-${district.state}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <Button
                    onClick={() => handleCityClick(district)}
                    className="w-4 h-4 min-w-4 min-h-4 rounded-full bg-brand-accent border-2 border-brand-primary hover:bg-brand-primary hover:scale-150 transition-all duration-300 p-0 shadow-md hover:shadow-lg relative"
                    variant="ghost"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-text-primary text-text-inverse text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {district.city}, {district.state}
                    </div>
                  </Button>
                  
                  {/* Ripple effect for better visibility */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-brand-primary rounded-full animate-ping opacity-30"></div>
                </div>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-surface-primary/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-brand-primary/20">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-brand-primary border border-brand-secondary"></div>
              <span className="text-text-secondary">School Districts</span>
            </div>
            <div className="text-xs text-text-muted mt-1">
              Click markers to compare results
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="absolute bottom-4 right-4 bg-surface-primary/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-brand-primary/20">
            <div className="text-xs text-text-muted">
              Drag to pan • Use zoom controls
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Access Grid for Mobile */}
      <div className="block md:hidden">
        <h4 className="text-lg font-semibold text-text-brand mb-4">Quick Access</h4>
        <div className="grid grid-cols-2 gap-3">
          {filteredDistricts.slice(0, 6).map((district) => (
            <Button
              key={`${district.city}-${district.state}`}
              onClick={() => handleCityClick(district)}
              variant="outline"
              className="h-auto p-3 text-left border-brand-primary/20 hover:bg-brand-primary/10"
            >
              <div>
                <div className="font-semibold text-sm">{district.city}</div>
                <div className="text-xs text-text-muted">{district.state}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Comparison Results */}
      {selectedDistrict && (
        <Card className="bg-gradient-to-br from-brand-accent/95 to-surface-secondary border border-brand-primary/30 rounded-3xl p-6 md:p-8 shadow-xl animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  <h3 className="text-xl md:text-2xl font-bold text-text-brand">
                    {selectedDistrict.city}, {selectedDistrict.state}
                  </h3>
                </div>
                <p className="text-text-secondary font-medium">{selectedDistrict.districtName}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedDistrict(null)}
                className="hover:bg-surface-secondary text-text-secondary hover:text-text-brand"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Local District Performance */}
              <div className="bg-surface-secondary/70 rounded-2xl p-6 border border-brand-primary/10">
                <h4 className="text-lg font-bold text-text-brand mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-text-secondary rounded-full"></div>
                  Local District
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-medium">Average MAP Score</span>
                    <span className="text-2xl md:text-3xl font-bold text-text-brand">
                      {selectedDistrict.mapScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-medium">Students Tested</span>
                    <span className="font-bold text-text-brand">
                      {selectedDistrict.studentCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alpha Performance */}
              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl p-6 border border-brand-primary/30">
                <h4 className="text-lg font-bold text-text-brand mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-primary rounded-full"></div>
                  Alpha Students
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-medium">Average MAP Score</span>
                    <span className="text-2xl md:text-3xl font-bold text-brand-primary">
                      {selectedDistrict.alphaScore}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-medium">Performance Gap</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="font-bold text-success">
                        +{selectedDistrict.improvement} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-success/10 to-brand-primary/10 rounded-2xl p-6 border border-success/20">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-text-brand mb-2">Performance Summary</h4>
                  <p className="text-text-brand leading-relaxed">
                    Alpha students in {selectedDistrict.city} outperform local district students by{' '}
                    <span className="font-bold text-brand-primary">{selectedDistrict.improvement} points</span>{' '}
                    on MAP assessments, representing a{' '}
                    <span className="font-bold text-brand-primary">
                      {Math.round((selectedDistrict.improvement / selectedDistrict.mapScore) * 100)}%
                    </span>{' '}
                    improvement over traditional education methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};