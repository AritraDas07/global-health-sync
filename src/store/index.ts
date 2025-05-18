import { configureStore } from '@reduxjs/toolkit';
import healthMetricsReducer from './slices/healthMetricsSlice';
import moodTrackerReducer from './slices/moodTrackerSlice';
import userSettingsReducer from './slices/userSettingsSlice';

export const store = configureStore({
  reducer: {
    healthMetrics: healthMetricsReducer,
    moodTracker: moodTrackerReducer,
    userSettings: userSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;