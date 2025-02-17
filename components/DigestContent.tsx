import type { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils/dates";

interface DigestContentProps {
	news: NewsItem[];
}

export const DigestContent = ({ news }: DigestContentProps) => {
	if (!news.length) return null;

	// Get unique tags from all news items
	const allTags = Array.from(new Set(news.flatMap((item) => item.tags)));
	const trendingTopics = allTags.slice(0, 5); // Show top 5 tags

	const latestPost = news[0];

	return (
		<div className="space-y-4 text-sm">
			<p className="leading-relaxed">
				🎯 <span className="font-semibold">Latest Updates</span>
				{trendingTopics.length > 0 && (
					<span>
						{" "}
						Trending topics include{" "}
						<span className="text-accent font-semibold">
							{trendingTopics.join(", ")}
						</span>
						.
					</span>
				)}
			</p>

			{latestPost.title && (
				<p className="leading-relaxed">
					📢 <span className="font-semibold">Latest Story:</span>{" "}
					<a
						href={latestPost.link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-accent hover:underline"
					>
						{latestPost.title}
					</a>{" "}
					<span className="text-muted-foreground">
						({formatDate(latestPost.date)})
					</span>
				</p>
			)}

			<p className="text-muted-foreground text-xs pt-2">
				Curated and summarized by your friendly neighborhood AI agent 🤖
			</p>
		</div>
	);
};
