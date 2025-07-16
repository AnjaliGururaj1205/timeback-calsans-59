import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, Maximize, Clock } from 'lucide-react';

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
}

const demoVideos: DemoVideo[] = [
  {
    id: 'ai-vision-demo',
    title: 'AI Vision in Action',
    description: 'Watch our AI analyze handwritten math problems and provide instant feedback',
    duration: '2:34',
    thumbnail: '👁️',
    category: 'Core Technology'
  },
  {
    id: 'adaptive-learning',
    title: 'Adaptive Learning Paths',
    description: 'See how the system adjusts difficulty and content based on student performance',
    duration: '3:17',
    thumbnail: '🧠',
    category: 'Personalization'
  },
  {
    id: 'student-journey',
    title: 'Student Success Story',
    description: 'Follow a real student\'s 6-month learning transformation',
    duration: '4:12',
    thumbnail: '📈',
    category: 'Results'
  },
  {
    id: 'parent-dashboard',
    title: 'Parent Insights Dashboard',
    description: 'Explore the comprehensive analytics and progress tracking tools',
    duration: '2:58',
    thumbnail: '📊',
    category: 'Analytics'
  }
];

export const DemoVideoPlayer: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleVideoSelect = (video: DemoVideo) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-cal font-bold text-text-brand">
          See Timeback in Action
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Watch real demonstrations of our AI technology and see the impact on student learning
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Library */}
        <div className="lg:col-span-1 space-y-4">
          <h4 className="text-lg font-cal font-semibold text-text-brand">Demo Library</h4>
          <div className="space-y-3">
            {demoVideos.map((video) => (
              <Card
                key={video.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedVideo?.id === video.id
                    ? 'ring-2 ring-brand-accent border-brand-accent/50 bg-gradient-to-r from-brand-accent/5 to-brand-secondary/5'
                    : 'border-border/50 hover:border-border hover:shadow-lg'
                }`}
                onClick={() => handleVideoSelect(video)}
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 rounded-lg flex items-center justify-center text-2xl">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-text-brand truncate">{video.title}</h5>
                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.category}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-surface-primary to-surface-secondary border border-border/50 rounded-3xl overflow-hidden shadow-xl">
            {selectedVideo ? (
              <div className="space-y-4">
                {/* Video Display */}
                <div className="relative bg-black rounded-t-3xl aspect-video flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">{selectedVideo.thumbnail}</div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-cal font-semibold text-white">
                        {selectedVideo.title}
                      </h4>
                      <p className="text-white/80">
                        {selectedVideo.description}
                      </p>
                    </div>
                    <Button
                      onClick={togglePlayPause}
                      className="bg-white hover:bg-brand-secondary text-brand-secondary hover:text-white rounded-full w-16 h-16"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </Button>
                  </div>
                  
                  {/* Video overlay controls */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-lg p-3 space-y-2">
                      {/* Progress bar */}
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div 
                          className="bg-brand-accent h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(currentTime / 180) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{formatTime(currentTime)} / {selectedVideo.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Volume2 className="w-4 h-4" />
                          <Maximize className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xl font-cal font-bold text-text-brand">
                      {selectedVideo.title}
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {selectedVideo.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full">
                        {selectedVideo.category}
                      </span>
                      <span>{selectedVideo.duration}</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-brand-secondary/10 hover:text-brand-secondary hover:border-brand-secondary"
                    >
                      Watch Full Demo
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🎬</div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-cal font-semibold text-text-brand">
                      Select a Demo Video
                    </h4>
                    <p className="text-text-secondary">
                      Choose from our demo library to see Timeback in action
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};