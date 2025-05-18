import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateMockHealthData } from '../../utils/mockDataGenerator';

export interface HealthMetric {
  timestamp: string;
  value: number;
}

export interface HealthMetricsState {
  heartRate: HealthMetric[];
  steps: {
    today: number;
    goal: number;
    history: HealthMetric[];
  };
  sleep: {
    lastNight: {
      duration: number;
      quality: number;
      startTime: string;
      endTime: string;
    };
    history: Array<{
      date: string;
      duration: number;
      quality: number;
    }>;
  };
  loading: boolean;
  error: string | null;
}

const initialState: HealthMetricsState = {
  heartRate: generateMockHealthData('heartRate', 30),
  steps: {
    today: Math.floor(Math.random() * 5000) + 3000,
    goal: 10000,
    history: generateMockHealthData('steps', 30),
  },
  sleep: {
    lastNight: {
      duration: 7.2,
      quality: 0.78,
      startTime: '2025-05-17T23:30:00Z',
      endTime: '2025-05-18T06:42:00Z',
    },
    history: Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: Math.random() * 3 + 5,
      quality: Math.random() * 0.4 + 0.5,
    })),
  },
  loading: false,
  error: null,
};

const healthMetricsSlice = createSlice({
  name: 'healthMetrics',
  initialState,
  reducers: {
    updateHeartRate: (state, action: PayloadAction<HealthMetric>) => {
      state.heartRate.push(action.payload);
      if (state.heartRate.length > 100) {
        state.heartRate.shift();
      }
    },
    updateSteps: (state, action: PayloadAction<number>) => {
      state.steps.today = action.payload;
      state.steps.history.push({
        timestamp: new Date().toISOString(),
        value: action.payload,
      });
      if (state.steps.history.length > 30) {
        state.steps.history.shift();
      }
    },
    setStepsGoal: (state, action: PayloadAction<number>) => {
      state.steps.goal = action.payload;
    },
    updateSleep: (state, action: PayloadAction<{
      duration: number;
      quality: number;
      startTime: string;
      endTime: string;
    }>) => {
      state.sleep.lastNight = action.payload;
      state.sleep.history.push({
        date: new Date().toISOString().split('T')[0],
        duration: action.payload.duration,
        quality: action.payload.quality,
      });
      if (state.sleep.history.length > 14) {
        state.sleep.history.shift();
      }
    },
  },
});

export const { updateHeartRate, updateSteps, setStepsGoal, updateSleep } = healthMetricsSlice.actions;
export default healthMetricsSlice.reducer;