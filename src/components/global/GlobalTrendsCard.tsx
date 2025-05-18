import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Globe, ChevronDown } from 'lucide-react';
import { RootState } from '../../store';
import { GlobalComparisonChart } from './GlobalComparisonChart';

export const GlobalTrendsCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'steps' | 'sleep' | 'heartRate'>('steps');
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const metrics = [
    { id: 'steps', name: 'Daily Steps' },
    { id: 'sleep', name: 'Sleep Duration' },
    { id: 'heartRate', name: 'Resting Heart Rate' },
  ];
  
  // Regional comparison data (mock data)
  const regions = [
    { id: 'local', name: 'Your Region' },
    { id: 'country', name: 'Your Country' },
    { id: 'global', name: 'Global Average' },
  ];
  
  const regionalData = {
    steps: {
      your: 8752,
      local: 7845,
      country: 6932,
      global: 5834,
    },
    sleep: {
      your: 7.2,
      local: 6.8,
      country: 7.1,
      global: 6.9,
    },
    heartRate: {
      your: 68,
      local: 72,
      country: 70,
      global: 71,
    },
  };
  
  const formatMetricValue = (metric: 'steps' | 'sleep' | 'heartRate', value: number) => {
    switch (metric) {
      case 'steps':
        return value.toLocaleString();
      case 'sleep':
        const hours = Math.floor(value);
        const minutes = Math.round((value - hours) * 60);
        return `${hours}h ${minutes}m`;
      case 'heartRate':
        return `${value} BPM`;
    }
  };

  return (
    <div className="card overflow-hidden transition-all duration-300" 
      style={{ maxHeight: expanded ? '800px' : '120px' }}
    >
      <div 
        className="flex items-center justify-between p-5 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
            <Globe className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Global Health Trends</h3>
            <p className="text-sm text-gray-500">See how you compare to others</p>
          </div>
        </div>
        <ChevronDown 
          className={`transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          size={20} 
        />
      </div>
      
      {expanded && (
        <div className="px-5 pb-5">
          <div className="flex space-x-3 mb-5 overflow-x-auto pb-2">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id as 'steps' | 'sleep' | 'heartRate')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedMetric === metric.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {metric.name}
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Your {metrics.find(m => m.id === selectedMetric)?.name} Comparison</h4>
            
            <div className="h-64 mb-4">
              <GlobalComparisonChart 
                data={[
                  { name: 'You', value: regionalData[selectedMetric].your },
                  { name: 'Local', value: regionalData[selectedMetric].local },
                  { name: 'Country', value: regionalData[selectedMetric].country },
                  { name: 'Global', value: regionalData[selectedMetric].global },
                ]}
                metric={selectedMetric}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-sm font-medium text-gray-500">You</div>
                <div className="text-lg font-semibold text-teal-600">
                  {formatMetricValue(selectedMetric, regionalData[selectedMetric].your)}
                </div>
              </div>
              {regions.map((region) => (
                <div key={region.id} className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-sm font-medium text-gray-500">{region.name}</div>
                  <div className="text-lg font-semibold text-gray-700">
                    {formatMetricValue(selectedMetric, regionalData[selectedMetric][region.id as keyof typeof regionalData[typeof selectedMetric]])}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">About This Data</h4>
            <p className="text-sm text-gray-600">
              Data is aggregated from anonymized users in your region and globally. 
              All comparisons are from users in your demographic group. Updated weekly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};