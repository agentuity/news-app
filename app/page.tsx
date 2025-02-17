import { ClientNewsFeed } from "@/components/ClientNewsFeed";
import { Header } from "@/components/Header";
import { mapStoriesToNewsItems } from "@/lib/mappers";
import type { PodcastTranscript } from "@/lib/podcast";
import { podcast } from "@/lib/podcast";
import { stories } from "@/lib/stories";
import type { NewsItem } from "@/lib/types";

async function getNews(): Promise<NewsItem[]> {
	// Get published stories from the last 14 days
	const fourteenDaysAgo = new Date();
	fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

	try {
		const publishedStories = await stories.getLastNDays(14, {
			publishedOnly: true,
		});
		return mapStoriesToNewsItems(publishedStories);
	} catch (error) {
		console.error("Failed to fetch news:", error);
		return [];
	}
}

async function getPodcast(): Promise<PodcastTranscript | undefined> {
	try {
		const result = await podcast.getLatest();
		return result || undefined;
	} catch (error) {
		console.error("Failed to fetch podcast:", error);
		return undefined;
	}
}

export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
	const [initialNews, latestPodcast] = await Promise.all([
		getNews(),
		getPodcast(),
	]);

	return (
		<div className="min-h-screen bg-background">
			<div className="container w-full lg:w-3/4 py-8">
				<Header />
				<ClientNewsFeed initialNews={initialNews} podcast={latestPodcast} />
			</div>
		</div>
	);
}
