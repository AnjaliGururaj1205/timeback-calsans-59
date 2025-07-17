import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  videoUrl: string;
  thumbnail: string;
  quote: string;
  duration: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Parent',
    location: 'San Francisco, CA',
    videoUrl: '/videos/testimonial-sarah.mp4',
    thumbnail: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    quote: 'My daughter went from struggling with math to loving it in just 3 months.',
    duration: '2:34'
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    role: 'Principal',
    location: 'Austin, TX',
    videoUrl: '/videos/testimonial-michael.mp4',
    thumbnail: '/lovable-uploads/5faf787d-d6d8-4378-8afd-217044d5ccca.png',
    quote: 'Timeback has revolutionized how our students approach learning.',
    duration: '3:15'
  },
  {
    id: '3',
    name: 'Emma Johnson',
    role: 'Student',
    location: 'Denver, CO',
    videoUrl: '/videos/testimonial-emma.mp4',
    thumbnail: '/lovable-uploads/5914131b-3128-49af-af97-d359cb8d0d5f.png',
    quote: 'I actually look forward to studying now. It\'s like having a personal tutor.',
    duration: '1:58'
  }
];

export const VideoTestimonials: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);

  const handlePlayVideo = (videoId: string) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  return (
    <div className="space-y-8">

      <div className="grid md:grid-cols-3 gap-6">
        {videoTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="group relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={testimonial.thumbnail}
                alt={`${testimonial.name} testimonial`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button
                  onClick={() => handlePlayVideo(testimonial.id)}
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-16 h-16 transition-all duration-300 hover:scale-110"
                >
                  {activeVideo === testimonial.id ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded">
                {testimonial.duration}
              </div>

              {/* Mute Button */}
              {activeVideo === testimonial.id && (
                <Button
                  onClick={() => setMuted(!muted)}
                  size="sm"
                  className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8"
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <blockquote className="text-white mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-300 text-sm">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
            </div>

            {/* Video Player (when active) */}
            {activeVideo === testimonial.id && (
              <div className="absolute inset-0 bg-black">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={muted}
                  controls
                  poster={testimonial.thumbnail}
                >
                  <source src={testimonial.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};