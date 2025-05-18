import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface SleepData {
  date: string;
  duration: number;
  quality: number;
}

interface SleepQualityChartProps {
  data: SleepData[];
}

export const SleepQualityChart: React.FC<SleepQualityChartProps> = ({ data }) => {
  // Format date for display
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString([], { weekday: 'short' });
  };

  // Prepare data for chart
  const chartData = data.map((item) => ({
    day: formatDate(item.date),
    duration: item.duration,
    quality: Math.round(item.quality * 100),
    date: item.date,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const duration = payload[0].value;
      const quality = payload[1].value;
      
      const hours = Math.floor(duration);
      const minutes = Math.round((duration - hours) * 60);
      const formattedDuration = `${hours}h ${minutes}m`;
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
          <p className="font-medium text-gray-900">{formattedDuration}</p>
          <p className="text-gray-600">Quality: {quality}%</p>
          <p className="text-gray-600">{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
          width={25}
          domain={[0, 12]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="duration" 
          stroke="#6366F1" 
          fill="url(#sleepGradient)" 
          strokeWidth={2}
        />
        <Area 
          type="monotone" 
          dataKey="quality" 
          stroke="#8884d8" 
          fill="#8884d8"
          strokeWidth={0}
          fillOpacity={0}
        />
        <defs>
          <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};