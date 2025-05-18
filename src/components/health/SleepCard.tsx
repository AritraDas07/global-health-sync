import React from 'react';
import { useSelector } from 'react-redux';
import { Moon } from 'lucide-react';
import { RootState } from '../../store';
import { SleepQualityChart } from './charts/SleepQualityChart';

export const SleepCard: React.FC = () => {
  const sleepData = useSelector((state: RootState) => state.healthMetrics.sleep);
  const { lastNight, history } = sleepData;
  
  // Format sleep duration hours and minutes
  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };
  
  // Calculate sleep quality text
  const getSleepQualityText = (quality: number) => {
    if (quality >= 0.9) return 'Excellent';
    if (quality >= 0.7) return 'Good';
    if (quality >= 0.5) return 'Average';
    if (quality >= 0.3) return 'Fair';
    return 'Poor';
  };
  
  // Calculate average sleep duration for the last 7 days
  const last7DaysSleep = history.slice(-7);
  const averageDuration = last7DaysSleep.length > 0
    ? last7DaysSleep.reduce((sum, day) => sum + day.duration, 0) / last7DaysSleep.length
    : 0;

  return (
    <div className="card p-5">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
          <Moon className="h-5 w-5 text-indigo-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Sleep</h3>
          <p className="text-sm text-gray-500">Last night's sleep</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center my-3">
        <div className="text-center">
          <div className="stat-value text-indigo-500">{formatDuration(lastNight.duration)}</div>
          <p className="stat-label">Duration</p>
        </div>
      </div>
      
      <div className="mt-4 h-40">
        <SleepQualityChart data={history.slice(-7)} />
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">{formatDuration(averageDuration)}</p>
          <p className="stat-label">Average</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">{getSleepQualityText(lastNight.quality)}</p>
          <p className="stat-label">Quality</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">
            {new Date(lastNight.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="stat-label">Bedtime</p>
        </div>
      </div>
    </div>
  );
};