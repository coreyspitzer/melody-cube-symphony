
export interface Note {
  name: string;
  octave: number;
}

export interface CubeFace {
  position: [number, number, number];
  color: string;
  note: string;
}

export interface MusicRule {
  name: string;
  description: string;
  checkRule: (noteSequence: string[], nextNote: string) => boolean;
}
