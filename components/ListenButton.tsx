import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

interface ListenButtonProps {
  onAudioStart: () => void;
}

export const ListenButton = ({ onAudioStart }: ListenButtonProps) => {
  return (
    <div className="pt-2 border-t border-accent/20">
      <Button 
        variant="outline"
        className="w-full justify-center mt-2 border-accent/20 hover:border-accent/40 hover:bg-accent/5"
        onClick={onAudioStart}
      >
        <Headphones className="mr-2 h-4 w-4" />
        Listen to Daily Digest
      </Button>
    </div>
  );
};