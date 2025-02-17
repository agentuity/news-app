import { Badge } from "@/components/ui/badge";
import { TwitterIcon, LinkedinIcon, GlobeIcon, GithubIcon } from "lucide-react";

interface SourceBadgeProps {
  source: string;
  sourceType: string;
}

const SourceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "twitter":
      return <TwitterIcon className="h-4 w-4" />;
    case "linkedin":
      return <LinkedinIcon className="h-4 w-4" />;
    case "github":
      return <GithubIcon className="h-4 w-4" />;
    case "website":
    default:
      return <GlobeIcon className="h-4 w-4" />;
  }
};

export function SourceBadge({ source, sourceType }: SourceBadgeProps) {
  return (
    <Badge variant="outline" className="font-mono flex items-center gap-2">
      <SourceIcon type={sourceType} />
      {source}
    </Badge>
  );
}