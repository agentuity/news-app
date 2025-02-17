import { Card } from "@/components/ui/card";
import { AgentHeader } from "./AgentHeader";
import { DigestContent } from "./DigestContent";
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
			<Card className="p-6 mb-8 bg-card shadow-lg transition-all duration-300 hover:shadow-xl border-2 border-accent/20 hover:border-accent/40 backdrop-blur-sm">
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
