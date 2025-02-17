import type { Story } from "./stories";
import type { NewsItem } from "./types";

export function mapStoryToNewsItem(story: Story): NewsItem {
	return {
		id: story.link, // Using the link as a unique identifier
		title: story.headline,
		description: story.summary,
		date: story.date_published || story.date_added,
		source: story.source,
		sourceType: "website", // Default to website since we're simplifying types
		tags: story.tags || [],
		link: story.link,
	};
}

export function mapStoriesToNewsItems(stories: Story[]): NewsItem[] {
	return stories.map(mapStoryToNewsItem);
}
