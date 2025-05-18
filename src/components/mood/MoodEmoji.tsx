import React from 'react';
import { MoodType } from '../../store/slices/moodTrackerSlice';

interface MoodEmojiProps {
  type: MoodType;
  emoji: string;
  label: string;
  isSelected: boolean;
  onSelect: (type: MoodType) => void;
}

export const MoodEmoji: React.FC<MoodEmojiProps> = ({
  type,
  emoji,
  label,
  isSelected,
  onSelect,
}) => {
  const colors = {
    verySad: 'bg-red-100 border-red-300 ring-red-200',
    sad: 'bg-orange-100 border-orange-300 ring-orange-200',
    neutral: 'bg-yellow-100 border-yellow-300 ring-yellow-200',
    happy: 'bg-green-100 border-green-300 ring-green-200',
    veryHappy: 'bg-blue-100 border-blue-300 ring-blue-200',
  };

  return (
    <button
      onClick={() => onSelect(type)}
      className={`flex flex-col items-center transition-all duration-200 ease-in-out ${
        isSelected
          ? `border-2 ${colors[type]} rounded-lg p-2 ring-4 ring-opacity-50 transform scale-110`
          : 'border-2 border-transparent p-2 hover:bg-gray-50 rounded-lg'
      }`}
    >
      <span className="text-2xl mb-1">{emoji}</span>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
};