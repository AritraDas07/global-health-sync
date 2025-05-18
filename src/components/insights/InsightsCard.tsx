import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Brain, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

export const InsightsCard: React.FC = () => {
  const healthMetrics = useSelector((state: RootState) => state.healthMetrics);
  const moodEntries = useSelector((state: RootState) => state.moodTracker.entries);
  
  // Generate some AI insights based on the data
  const insights = [
    {
      id: 1,
      type: 'correlation',
      icon: <TrendingUp className="w-5 h-5 text-primary-500" />,
      title: 'Sleep & Mood Connection',
      description: 'Your mood tends to be higher on days following 7+ hours of sleep. Consider maintaining consistent sleep hours to stabilize mood.',
      priority: 'medium',
    },
    {
      id: 2,
      type: 'alert',
      icon: <AlertTriangle className="w-5 h-5 text-tertiary-500" />,
      title: 'Heart Rate Variability',
      description: 'Your heart rate showed higher variability than usual today. This could be related to stress or increased physical activity.',
      priority: 'high',
    },
    {
      id: 3,
      type: 'suggestion',
      icon: <Lightbulb className="w-5 h-5 text-secondary-500" />,
      title: 'Step Goal Adjustment',
      description: 'Based on your recent activity patterns, increasing your daily step goal to 12,000 could help improve cardiovascular health.',
      priority: 'low',
    },
  ];
  
  // Priority styling
  const priorityStyles = {
    high: 'border-l-4 border-tertiary-500',
    medium: 'border-l-4 border-primary-500',
    low: 'border-l-4 border-secondary-500',
  };

  return (
    <div className="card p-5">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
          <Brain className="h-5 w-5 text-primary-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">AI Insights</h3>
          <p className="text-sm text-gray-500">Personalized health recommendations</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className={`p-3 bg-white rounded-md shadow-sm ${priorityStyles[insight.priority as keyof typeof priorityStyles]}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-0.5">
                {insight.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{insight.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Pattern analysis from the last 30 days</p>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All Insights
          </button>
        </div>
      </div>
    </div>
  );
};