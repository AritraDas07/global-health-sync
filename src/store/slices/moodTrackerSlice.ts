import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MoodType = 'verySad' | 'sad' | 'neutral' | 'happy' | 'veryHappy';

export interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
}

interface MoodTrackerState {
  entries: MoodEntry[];
  todaysMood: MoodType | null;
}

const initialState: MoodTrackerState = {
  entries: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    mood: ['verySad', 'sad', 'neutral', 'happy', 'veryHappy'][Math.floor(Math.random() * 5)] as MoodType,
    note: i % 5 === 0 ? 'Sample mood note' : undefined,
  })),
  todaysMood: null,
};

const moodTrackerSlice = createSlice({
  name: 'moodTracker',
  initialState,
  reducers: {
    addMoodEntry: (state, action: PayloadAction<MoodEntry>) => {
      const existingEntryIndex = state.entries.findIndex(
        (entry) => entry.date === action.payload.date
      );

      if (existingEntryIndex >= 0) {
        state.entries[existingEntryIndex] = action.payload;
      } else {
        state.entries.push(action.payload);
      }

      const today = new Date().toISOString().split('T')[0];
      if (action.payload.date === today) {
        state.todaysMood = action.payload.mood;
      }
    },
    deleteMoodEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((entry) => entry.date !== action.payload);
      
      const today = new Date().toISOString().split('T')[0];
      if (action.payload === today) {
        state.todaysMood = null;
      }
    },
  },
});

export const { addMoodEntry, deleteMoodEntry } = moodTrackerSlice.actions;
export default moodTrackerSlice.reducer;