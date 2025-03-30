
import { Button } from "@/components/ui/button";
import { useMusicRules } from "@/context/MusicRulesContext";
import { Play, Pause, RotateCcw } from "lucide-react";

interface MusicControlsProps {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const MusicControls = ({ isPlaying, setIsPlaying }: MusicControlsProps) => {
  const { resetSequence } = useMusicRules();

  return (
    <div className="mt-6 flex gap-4">
      <Button 
        variant="outline" 
        className="bg-transparent border-white/20 text-white hover:bg-white/10"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
        {isPlaying ? "Pause" : "Play"}
      </Button>
      
      <Button 
        variant="outline" 
        className="bg-transparent border-white/20 text-white hover:bg-white/10"
        onClick={resetSequence}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
};

export default MusicControls;
