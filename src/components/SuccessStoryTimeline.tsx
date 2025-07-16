import React from 'react';
import { Calendar, TrendingUp, Award, Clock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  metric: string;
  studentName: string;
  grade: string;
  subject: string;
  beforeScore?: string;
  afterScore?: string;
  timeframe: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'January 2024',
    title: 'Maya\'s Math Transformation',
    description: 'Started with basic arithmetic struggles, fear of word problems, and homework taking 2+ hours nightly.',
    metric: 'Test Scores: 45% → 92%',
    studentName: 'Maya Rodriguez',
    grade: '4th Grade',
    subject: 'Mathematics',
    beforeScore: '45%',
    afterScore: '92%',
    timeframe: '4 months'
  },
  {
    id: '2',
    date: 'March 2024',
    title: 'Alex Discovers Science',
    description: 'Transformed from passive learner to science enthusiast, conducting experiments and asking advanced questions.',
    metric: 'Grade Improvement: C- → A',
    studentName: 'Alex Thompson',
    grade: '6th Grade',
    subject: 'Science',
    beforeScore: 'C-',
    afterScore: 'A',
    timeframe: '3 months'
  },
  {
    id: '3',
    date: 'April 2024',
    title: 'Emma\'s Reading Revolution',
    description: 'Went from reluctant reader to consuming 2-3 books per week, improved comprehension and vocabulary.',
    metric: 'Reading Level: +2.5 grades',
    studentName: 'Emma Chen',
    grade: '5th Grade',
    subject: 'Reading',
    beforeScore: '3rd grade level',
    afterScore: '6th grade level',
    timeframe: '5 months'
  },
  {
    id: '4',
    date: 'June 2024',
    title: 'Jordan Conquers Algebra',
    description: 'Overcame math anxiety and fear of equations to become peer tutor, helping classmates understand concepts.',
    metric: 'Grade Jump: D → B+',
    studentName: 'Jordan Kim',
    grade: '8th Grade',
    subject: 'Algebra',
    beforeScore: 'D',
    afterScore: 'B+',
    timeframe: '6 months'
  },
  {
    id: '5',
    date: 'August 2024',
    title: 'Sofia\'s Writing Breakthrough',
    description: 'Developed from basic sentences to creative storytelling, won school writing contest.',
    metric: 'Writing Assessment: Below Basic → Proficient',
    studentName: 'Sofia Martinez',
    grade: '7th Grade',
    subject: 'English',
    beforeScore: 'Below Basic',
    afterScore: 'Proficient',
    timeframe: '7 months'
  }
];

export const SuccessStoryTimeline: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">Student Success Journey</h3>
        <p className="text-gray-300 text-lg">Follow real students as they transform their learning experience</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-primary"></div>

      <div className="space-y-12">
        {timelineEvents.slice(0, 3).map((event, index) => (
            <div key={event.id} className="relative flex items-start space-x-8">
              {/* Timeline Node */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center border-4 border-surface-primary">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-surface-primary text-brand-primary text-xs font-semibold px-2 py-1 rounded border border-brand-primary/30">
                    {event.timeframe}
                  </span>
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{event.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.studentName}</span>
                        <span>•</span>
                        <span>{event.grade}</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                        {event.subject}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Before/After Scores */}
                    <div className="bg-gradient-to-r from-red-500/20 to-green-500/20 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-red-300 text-sm font-medium">Before</p>
                          <p className="text-white text-2xl font-bold">{event.beforeScore}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-400" />
                        <div className="text-center">
                          <p className="text-green-300 text-sm font-medium">After</p>
                          <p className="text-white text-2xl font-bold">{event.afterScore}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Metric */}
                    <div className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-lg p-4 border border-brand-primary/30">
                      <div className="flex items-center space-x-3">
                        <Award className="w-8 h-8 text-brand-primary" />
                        <div>
                          <p className="text-brand-primary text-sm font-medium">Achievement</p>
                          <p className="text-white font-semibold">{event.metric}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Badge */}
                  <div className="mt-4 flex items-center space-x-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Completed in {event.timeframe}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Continuation Indicator */}
        <div className="relative flex items-center justify-center mt-12">
          <div className="absolute left-8 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center border-4 border-surface-primary opacity-50">
            <TrendingUp className="w-6 h-6 text-gray-400" />
          </div>
          <div className="ml-24 bg-gray-800/50 rounded-lg px-6 py-3 border border-gray-600">
            <p className="text-gray-400 text-sm">More success stories being written every day...</p>
          </div>
        </div>
      </div>
    </div>
  );
};