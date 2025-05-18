import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateHeartRate } from '../store/slices/healthMetricsSlice';
import { simulateDeviceConnection, updateMockHeartRate } from '../utils/mockDataGenerator';
import { HeartRateCard } from '../components/health/HeartRateCard';
import { StepsCard } from '../components/health/StepsCard';
import { SleepCard } from '../components/health/SleepCard';
import { MoodTrackerCard } from '../components/mood/MoodTrackerCard';
import { GlobalTrendsCard } from '../components/global/GlobalTrendsCard';
import { InsightsCard } from '../components/insights/InsightsCard';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.userSettings);

  // Simulate real-time heart rate updates
  useEffect(() => {
    const simulateHeartRateUpdate = () => {
      const newHeartRate = updateMockHeartRate();
      dispatch(updateHeartRate({
        timestamp: new Date().toISOString(),
        value: newHeartRate
      }));
    };

    // Initial update
    simulateHeartRateUpdate();
    
    // Set up interval for updates (every 5 seconds for demo purposes)
    const cleanupFunction = simulateDeviceConnection(simulateHeartRateUpdate, 5000);
    
    return cleanupFunction;
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Welcome back, {name}
        </h1>
        <p className="text-gray-600 mt-1">
          Here's your health overview for today
        </p>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <HeartRateCard />
        <StepsCard />
        <SleepCard />
      </div>

      {/* Mood and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MoodTrackerCard />
        <InsightsCard />
      </div>

      {/* Global Data */}
      <div className="mb-8">
        <GlobalTrendsCard />
      </div>
    </div>
  );
};