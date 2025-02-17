import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useState } from "react";

interface StarButtonProps {
  initialStars: number;
  postTitle: string;
}

export function StarButton({ initialStars, postTitle }: StarButtonProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(initialStars);

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStarCount(prev => isStarred ? prev - 1 : prev + 1);
    console.log(`Post "${postTitle}" ${isStarred ? 'unstarred' : 'starred'}`);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleStar}
      className={`${isStarred ? 'text-accent' : 'text-muted-foreground'}`}
    >
      <StarIcon className="h-4 w-4" />
      <span className="ml-1 text-xs">{starCount}</span>
    </Button>
  );
}