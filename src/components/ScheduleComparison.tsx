import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimeBlock {
  time: string;
  activity: string;
  color: string;
}

interface ScheduleComparisonProps {
  title: string;
  timeBlocks: TimeBlock[];
  problems?: string[];
  benefits?: string[];
}

export const ScheduleComparison: React.FC<ScheduleComparisonProps> = ({
  title,
  timeBlocks,
  problems,
  benefits
}) => {
  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-cal text-center" style={{ color: '#0033cc' }}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline */}
        <div className="space-y-3">
          {timeBlocks.map((block, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="text-sm font-semibold text-gray-600 w-20">
                {block.time}
              </div>
              <div 
                className="flex-1 p-3 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: block.color }}
              >
                {block.activity}
              </div>
            </div>
          ))}
        </div>

        {/* Problems or Benefits */}
        {(problems || benefits) && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm" style={{ color: problems ? '#dc2626' : '#16a34a' }}>
              {problems ? 'Problems:' : 'Benefits:'}
            </h4>
            <ul className="space-y-1">
              {(problems || benefits)?.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: problems ? '#dc2626' : '#16a34a' }}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};