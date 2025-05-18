import React from 'react';
import { HealthMetric } from '../../../store/slices/healthMetricsSlice';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface HeartRateChartProps {
  data: HealthMetric[];
}

export const HeartRateChart: React.FC<HeartRateChartProps> = ({ data }) => {
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Prepare data for chart
  const chartData = data.map((item) => ({
    time: formatTimestamp(item.timestamp),
    value: item.value,
    timestamp: item.timestamp,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded text-xs">
          <p className="font-medium text-gray-900">{`${payload[0].value} BPM`}</p>
          <p className="text-gray-600">{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 10 }} 
          tickLine={false} 
          axisLine={false} 
          interval="preserveStartEnd"
        />
        <YAxis 
          domain={['dataMin - 10', 'dataMax + 10']} 
          tick={{ fontSize: 10 }} 
          tickLine={false}
          axisLine={false}
          width={25}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#F56565" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};