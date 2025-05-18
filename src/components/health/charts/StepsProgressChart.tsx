import React from 'react';
import { HealthMetric } from '../../../store/slices/healthMetricsSlice';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface StepsProgressChartProps {
  data: HealthMetric[];
}

export const StepsProgressChart: React.FC<StepsProgressChartProps> = ({ data }) => {
  // Format date for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { weekday: 'short' });
  };

  // Prepare data for chart
  const chartData = data.map((item) => ({
    day: formatDate(item.timestamp),
    steps: item.value,
    timestamp: item.timestamp,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
          <p className="font-medium text-gray-900">{`${payload[0].value.toLocaleString()} steps`}</p>
          <p className="text-gray-600">{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          dataKey="day" 
          tick={{ fontSize: 10 }} 
          tickLine={false} 
          axisLine={false}
        />
        <YAxis 
          tick={{ fontSize: 10 }} 
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="steps" 
          fill="#3B82F6" 
          radius={[4, 4, 0, 0]}
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};