
import * as Tone from 'tone';

// Initialize synth
let synth: Tone.Synth | null = null;

// Initialize Tone.js when first needed
const initializeAudio = async () => {
  if (!synth) {
    await Tone.start();
    synth = new Tone.Synth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
  }
};

// Play a note with the given name (e.g., "C4", "G3")
export const playNote = async (noteName: string) => {
  await initializeAudio();
  
  if (synth) {
    synth.triggerAttackRelease(noteName, "8n");
    console.log(`Playing note: ${noteName}`);
  }
};

// Advanced: This could be expanded to play chords or sequences
export const playChord = async (notes: string[]) => {
  await initializeAudio();
  
  if (synth && notes.length > 0) {
    // For a true chord, you'd use PolySynth instead
    notes.forEach((note, index) => {
      setTimeout(() => {
        synth?.triggerAttackRelease(note, "8n");
      }, index * 100);
    });
  }
};
