import { NewsCard } from "@/components/NewsCard";
import type { NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NewsFeedProps {
	news: NewsItem[];
	activeNewsItem?: NewsItem | null;
	isAudioMode?: boolean;
}

export const NewsFeed = ({
	news,
	activeNewsItem,
	isAudioMode = false,
}: NewsFeedProps) => {
	return (
		<div className="space-y-6 mt-6">
			{news.map((item) => {
				const isActive = isAudioMode && activeNewsItem?.id === item.id;

				return (
					<div
						key={item.id}
						className={cn(
							"transition-all duration-500",
							isAudioMode && !isActive && "opacity-50",
						)}
					>
						<NewsCard {...item} />
					</div>
				);
			})}
		</div>
	);
};
