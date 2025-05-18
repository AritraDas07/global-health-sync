import React from 'react';
import { MoodEntry, MoodType } from '../../store/slices/moodTrackerSlice';

interface MoodCalendarProps {
  entries: MoodEntry[];
}

export const MoodCalendar: React.FC<MoodCalendarProps> = ({ entries }) => {
  // Get current month days
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Create calendar days array
  const calendarDays = Array.from({ length: firstDayOfMonth }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Map mood colors
  const moodColors: Record<MoodType, string> = {
    verySad: 'bg-red-500',
    sad: 'bg-orange-400',
    neutral: 'bg-yellow-400',
    happy: 'bg-green-400',
    veryHappy: 'bg-blue-500',
  };
  
  // Get mood entry for a specific day
  const getMoodForDay = (day: number | null): MoodEntry | undefined => {
    if (day === null) return undefined;
    
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.find(entry => entry.date === dateString);
  };
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get emoji for mood
  const getEmojiForMood = (mood: MoodType): string => {
    switch (mood) {
      case 'verySad': return '😢';
      case 'sad': return '😔';
      case 'neutral': return '😐';
      case 'happy': return '😊';
      case 'veryHappy': return '😁';
    }
  };

  return (
    <div className="calendar-container">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const moodEntry = getMoodForDay(day);
          const isToday = day === now.getDate();
          
          return (
            <div 
              key={index} 
              className={`aspect-w-1 aspect-h-1 p-1 ${
                day === null ? 'pointer-events-none' : ''
              }`}
            >
              {day !== null && (
                <div 
                  className={`w-full h-full flex items-center justify-center text-sm rounded-full 
                    ${isToday ? 'ring-2 ring-primary-500' : ''} 
                    ${moodEntry ? `${moodColors[moodEntry.mood]} text-white` : 'bg-gray-100 text-gray-700'}`}
                  title={moodEntry ? `${getEmojiForMood(moodEntry.mood)} ${moodEntry.note || ''}` : ''}
                >
                  {day}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};