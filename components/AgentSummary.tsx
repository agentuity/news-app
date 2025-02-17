import { Card } from "@/components/ui/card";
import { AgentHeader } from "./AgentHeader";
import { ListenButton } from "./ListenButton";

import type { NewsItem } from "@/lib/types";

interface AgentSummaryProps {
	news: NewsItem[];
	onTimeUpdate?: (time: number) => void;
	onAudioStart?: () => void;
	showListenButton?: boolean;
}

export const AgentSummary = ({
	news = [],
	onAudioStart,
	showListenButton = true,
}: AgentSummaryProps) => {
	if (!news.length) {
		return null;
	}

	return (
		<div className="top-8 z-10">
			<Card className="p-6 mb-8 bg-card border border-accent/20">
				<AgentHeader />

				<div className="space-y-4">
					{showListenButton && onAudioStart && (
						<ListenButton onAudioStart={onAudioStart} />
					)}
				</div>
			</Card>
		</div>
	);
};
