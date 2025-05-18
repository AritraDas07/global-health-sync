export type MetricType = 'heartRate' | 'steps' | 'sleep' | 'nutrition';

export interface MockDataPoint {
  timestamp: string;
  value: number;
}

export function generateMockHealthData(
  metricType: MetricType,
  days: number = 30
): MockDataPoint[] {
  const now = new Date();
  const data: MockDataPoint[] = [];

  // Generate data for specified number of days (default 30)
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // For each day, generate points (depending on metric type)
    switch (metricType) {
      case 'heartRate':
        // Generate heart rate data points for different times of day
        for (let hour = 0; hour < 24; hour += 2) {
          const pointDate = new Date(date);
          pointDate.setHours(hour, Math.floor(Math.random() * 60), 0, 0);
          
          // Heart rate typically between 60-100 BPM at rest, higher during activity periods
          let baseValue = 65 + Math.random() * 15;
          
          // Simulate higher heart rates during typical activity hours
          if (hour >= 7 && hour <= 9) baseValue += 20; // Morning activity
          if (hour >= 17 && hour <= 19) baseValue += 25; // Evening activity
          
          // Add some noise
          const value = Math.floor(baseValue + (Math.random() * 10 - 5));
          
          data.push({
            timestamp: pointDate.toISOString(),
            value: value,
          });
        }
        break;
        
      case 'steps':
        // One step count per day
        const stepsBase = 5000 + Math.random() * 7000;
        // Weekend variation
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const stepsValue = Math.floor(stepsBase * (isWeekend ? 0.7 : 1.2));
        
        data.push({
          timestamp: date.toISOString(),
          value: stepsValue,
        });
        break;
        
      case 'sleep':
        // One sleep duration per day (in hours)
        const sleepBase = 6 + Math.random() * 3;
        // Weekend variation
        const sleepDayOfWeek = date.getDay();
        const isSleepWeekend = sleepDayOfWeek === 0 || sleepDayOfWeek === 6;
        const sleepValue = sleepBase * (isSleepWeekend ? 1.2 : 0.95);
        
        data.push({
          timestamp: date.toISOString(),
          value: parseFloat(sleepValue.toFixed(1)),
        });
        break;
        
      case 'nutrition':
        // Calories consumed per day
        const caloriesBase = 1800 + Math.random() * 800;
        const nutritionDayOfWeek = date.getDay();
        const isNutritionWeekend = nutritionDayOfWeek === 0 || nutritionDayOfWeek === 6;
        const caloriesValue = Math.floor(caloriesBase * (isNutritionWeekend ? 1.15 : 1));
        
        data.push({
          timestamp: date.toISOString(),
          value: caloriesValue,
        });
        break;
    }
  }

  return data;
}

export function updateMockHeartRate(): number {
  // Generate a realistic heart rate between 60-100 BPM
  const baseHeartRate = 70;
  const variance = 15;
  return Math.floor(baseHeartRate + (Math.random() * variance * 2) - variance);
}

export function simulateDeviceConnection(callback: () => void, interval: number = 30000): () => void {
  const intervalId = setInterval(callback, interval);
  return () => clearInterval(intervalId);
}