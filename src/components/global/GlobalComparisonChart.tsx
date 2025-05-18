import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ComparisonData {
  name: string;
  value: number;
}

interface GlobalComparisonChartProps {
  data: ComparisonData[];
  metric: 'steps' | 'sleep' | 'heartRate';
}

export const GlobalComparisonChart: React.FC<GlobalComparisonChartProps> = ({ 
  data,
  metric
}) => {
  const getBarColor = (entry: any) => {
    return entry.name === 'You' ? '#0D9488' : '#94A3B8';
  };
  
  // Format the units based on metric type
  const formatYAxis = (value: number) => {
    switch (metric) {
      case 'steps':
        return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value;
      case 'sleep':
        return `${value}h`;
      case 'heartRate':
        return value;
    }
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const formattedValue = (() => {
        switch (metric) {
          case 'steps':
            return `${payload[0].value.toLocaleString()} steps`;
          case 'sleep':
            const hours = Math.floor(payload[0].value);
            const minutes = Math.round((payload[0].value - hours) * 60);
            return `${hours}h ${minutes}m`;
          case 'heartRate':
            return `${payload[0].value} BPM`;
        }
      })();
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-gray-600">{formattedValue}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          tickLine={false} 
          axisLine={false}
        />
        <YAxis 
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="value" 
          radius={[4, 4, 0, 0]}
          barSize={40}
          fill="#94A3B8"
          stroke="none"
          fillOpacity={0.9}
          style={{ stroke: 'none' }}
        >
          {data.map((entry, index) => (
            <cell key={`cell-${index}`} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};