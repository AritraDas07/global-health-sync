import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Edit, Save } from 'lucide-react';
import { RootState } from '../../store';
import { addMoodEntry, MoodType } from '../../store/slices/moodTrackerSlice';
import { MoodEmoji } from './MoodEmoji';
import { MoodCalendar } from './MoodCalendar';

export const MoodTrackerCard: React.FC = () => {
  const dispatch = useDispatch();
  const { entries, todaysMood } = useSelector((state: RootState) => state.moodTracker);
  
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(todaysMood);
  const [note, setNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const moodOptions: { type: MoodType; label: string; emoji: string }[] = [
    { type: 'verySad', label: 'Very Sad', emoji: '😢' },
    { type: 'sad', label: 'Sad', emoji: '😔' },
    { type: 'neutral', label: 'Neutral', emoji: '😐' },
    { type: 'happy', label: 'Happy', emoji: '😊' },
    { type: 'veryHappy', label: 'Very Happy', emoji: '😁' },
  ];
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };
  
  const handleSaveMood = () => {
    if (selectedMood) {
      const today = new Date().toISOString().split('T')[0];
      dispatch(addMoodEntry({
        date: today,
        mood: selectedMood,
        note: note.trim() || undefined,
      }));
      setIsEditing(false);
    }
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <Calendar className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Mood Tracker</h3>
            <p className="text-sm text-gray-500">How are you feeling today?</p>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {isEditing ? <Save size={20} /> : <Edit size={20} />}
        </button>
      </div>
      
      {isEditing ? (
        <div className="mb-4">
          <div className="flex justify-between items-center my-4">
            {moodOptions.map((option) => (
              <MoodEmoji
                key={option.type}
                type={option.type}
                emoji={option.emoji}
                label={option.label}
                isSelected={selectedMood === option.type}
                onSelect={handleMoodSelect}
              />
            ))}
          </div>
          
          <div className="mt-4">
            <label htmlFor="moodNote" className="block text-sm font-medium text-gray-700 mb-1">
              Add a note (optional)
            </label>
            <textarea
              id="moodNote"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="How are you feeling today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          
          <button
            onClick={handleSaveMood}
            disabled={!selectedMood}
            className="mt-3 btn btn-primary bg-purple-600 hover:bg-purple-700 w-full"
          >
            Save Today's Mood
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex items-center justify-center py-4">
            {todaysMood ? (
              <div className="text-center">
                <div className="text-5xl mb-2">
                  {moodOptions.find(m => m.type === todaysMood)?.emoji}
                </div>
                <p className="text-gray-700 font-medium">
                  {moodOptions.find(m => m.type === todaysMood)?.label}
                </p>
                
                {entries.find(e => e.date === new Date().toISOString().split('T')[0])?.note && (
                  <p className="text-sm text-gray-600 mt-2 italic">
                    "{entries.find(e => e.date === new Date().toISOString().split('T')[0])?.note}"
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">You haven't logged your mood today</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 btn btn-primary bg-purple-600 hover:bg-purple-700"
                >
                  Log Today's Mood
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-4">
        <h4 className="font-medium text-gray-700 mb-3">Your Mood History</h4>
        <MoodCalendar entries={entries} />
      </div>
    </div>
  );
};