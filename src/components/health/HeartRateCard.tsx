import React from 'react';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { RootState } from '../../store';
import { HeartRateChart } from './charts/HeartRateChart';

export const HeartRateCard: React.FC = () => {
  const heartRateData = useSelector((state: RootState) => state.healthMetrics.heartRate);
  
  // Get the latest heart rate value
  const currentHeartRate = heartRateData.length > 0 
    ? heartRateData[heartRateData.length - 1].value 
    : 0;
  
  // Calculate average heart rate from today's data
  const todayData = heartRateData.filter(data => {
    const dataDate = new Date(data.timestamp).toDateString();
    const today = new Date().toDateString();
    return dataDate === today;
  });
  
  const averageHeartRate = todayData.length > 0
    ? Math.round(todayData.reduce((sum, data) => sum + data.value, 0) / todayData.length)
    : 0;
  
  // Get min and max heart rates for the day
  const minHeartRate = todayData.length > 0
    ? Math.min(...todayData.map(data => data.value))
    : 0;
  
  const maxHeartRate = todayData.length > 0
    ? Math.max(...todayData.map(data => data.value))
    : 0;

  return (
    <div className="card p-5">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
          <Heart className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Heart Rate</h3>
          <p className="text-sm text-gray-500">Beats per minute</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center my-3">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <span className="stat-value text-red-500">{currentHeartRate}</span>
            <span className="ml-1 text-gray-500 text-lg">BPM</span>
            <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
          <p className="stat-label">Current</p>
        </div>
      </div>
      
      <div className="mt-4 h-40">
        <HeartRateChart data={heartRateData.slice(-20)} />
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">{averageHeartRate}</p>
          <p className="stat-label">Average</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">{minHeartRate}</p>
          <p className="stat-label">Minimum</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">{maxHeartRate}</p>
          <p className="stat-label">Maximum</p>
        </div>
      </div>
    </div>
  );
};