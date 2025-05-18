import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UnitSystem = 'metric' | 'imperial';
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ar';

interface UserSettingsState {
  name: string;
  age: number | null;
  gender: string | null;
  weight: number | null;
  height: number | null;
  unitSystem: UnitSystem;
  language: LanguageCode;
  region: string;
  darkMode: boolean;
  dataSharing: boolean;
}

const initialState: UserSettingsState = {
  name: 'Alex Johnson',
  age: 32,
  gender: 'nonbinary',
  weight: 70.5,
  height: 175,
  unitSystem: 'metric',
  language: 'en',
  region: 'US',
  darkMode: false,
  dataSharing: true,
};

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<Partial<UserSettingsState>>) => {
      return { ...state, ...action.payload };
    },
    toggleUnitSystem: (state) => {
      state.unitSystem = state.unitSystem === 'metric' ? 'imperial' : 'metric';
    },
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.language = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleDataSharing: (state) => {
      state.dataSharing = !state.dataSharing;
    },
  },
});

export const {
  updateUserProfile,
  toggleUnitSystem,
  setLanguage,
  toggleDarkMode,
  toggleDataSharing,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;