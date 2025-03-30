
import { createContext, useContext, useState, ReactNode } from 'react';

interface MusicRulesContextType {
  noteSequence: string[];
  addNote: (note: string) => void;
  canPlayNote: (note: string) => boolean;
  resetSequence: () => void;
}

const MusicRulesContext = createContext<MusicRulesContextType | undefined>(undefined);

export const MusicRulesProvider = ({ children }: { children: ReactNode }) => {
  const [noteSequence, setNoteSequence] = useState<string[]>([]);

  // Add a note to the sequence
  const addNote = (note: string) => {
    setNoteSequence((prev) => [...prev, note]);
  };

  // Check if a note can be played based on rules
  const canPlayNote = (note: string) => {
    // For simple demonstration, we're implementing very basic rules:
    // 1. Always allow the first 3 notes
    if (noteSequence.length < 3) {
      return true;
    }

    // 2. Don't allow the same note to be played twice in a row
    if (noteSequence[noteSequence.length - 1] === note) {
      return false;
    }

    // 3. Basic musical harmony rules could be implemented here
    // For now, just preventing repetition of the exact same pattern
    if (
      noteSequence.length >= 3 &&
      noteSequence[noteSequence.length - 3] === note &&
      noteSequence[noteSequence.length - 2] === noteSequence[noteSequence.length - 1]
    ) {
      return false;
    }

    // Default: allow the note
    return true;
  };

  // Reset the sequence
  const resetSequence = () => {
    setNoteSequence([]);
  };

  return (
    <MusicRulesContext.Provider value={{ noteSequence, addNote, canPlayNote, resetSequence }}>
      {children}
    </MusicRulesContext.Provider>
  );
};

export const useMusicRules = () => {
  const context = useContext(MusicRulesContext);
  if (context === undefined) {
    throw new Error('useMusicRules must be used within a MusicRulesProvider');
  }
  return context;
};
