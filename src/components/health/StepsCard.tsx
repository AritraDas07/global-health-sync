import React from 'react';
import { useSelector } from 'react-redux';
import { FootprintsIcon } from 'lucide-react';
import { RootState } from '../../store';
import { StepsProgressChart } from './charts/StepsProgressChart';

export const StepsCard: React.FC = () => {
  const { today: todaySteps, goal: stepsGoal, history } = useSelector(
    (state: RootState) => state.healthMetrics.steps
  );
  
  // Calculate percentage of goal completed
  const goalPercentage = Math.min(Math.round((todaySteps / stepsGoal) * 100), 100);
  
  // Calculate steps remaining
  const stepsRemaining = Math.max(stepsGoal - todaySteps, 0);
  
  // Calculate average steps for the last 7 days
  const last7DaysData = history.slice(-7);
  const averageSteps = last7DaysData.length > 0
    ? Math.round(last7DaysData.reduce((sum, data) => sum + data.value, 0) / last7DaysData.length)
    : 0;

  return (
    <div className="card p-5">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <FootprintsIcon className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Steps</h3>
          <p className="text-sm text-gray-500">Daily activity</p>
        </div>
      </div>
      
      <div className="mt-3 mb-5">
        <div className="flex justify-between items-end mb-1">
          <span className="stat-value text-blue-500">{todaySteps.toLocaleString()}</span>
          <span className="text-gray-600 text-sm">Goal: {stepsGoal.toLocaleString()}</span>
        </div>
        
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-blue-600">
                {goalPercentage}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-gray-600">
                {stepsRemaining.toLocaleString()} steps to go
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-blue-100">
            <div 
              style={{ width: `${goalPercentage}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 h-40">
        <StepsProgressChart data={history.slice(-7)} />
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4 text-center">
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">{averageSteps.toLocaleString()}</p>
          <p className="stat-label">7-Day Average</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="stat-value text-gray-700 text-xl">
            {goalPercentage >= 100 ? '✓' : (goalPercentage + '%')}
          </p>
          <p className="stat-label">Today's Goal</p>
        </div>
      </div>
    </div>
  );
};