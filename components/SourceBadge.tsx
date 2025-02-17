import { Badge } from "@/components/ui/badge";
import { GithubIcon, GlobeIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

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
		default:
			return <GlobeIcon className="h-4 w-4" />;
	}
};

export function SourceBadge({ source, sourceType }: SourceBadgeProps) {
	return (
		<Badge variant="outline" className="flex items-center gap-2 cursor-default">
			<SourceIcon type={sourceType} />
			{source}
		</Badge>
	);
}
