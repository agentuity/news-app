"use client";

import { AgentSummary } from "@/components/AgentSummary";
import { AudioExperience } from "@/components/AudioExperience";
import { NewsFeed } from "@/components/NewsFeed";
import { SearchBar } from "@/components/SearchBar";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePodcast } from "@/lib/hooks/usePodcast";
import type { PodcastTranscript } from "@/lib/podcast";
import type { NewsItem } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ClientNewsFeedProps {
	initialNews: NewsItem[];
	podcast?: PodcastTranscript;
}

export function ClientNewsFeed({ initialNews, podcast }: ClientNewsFeedProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedSources, setSelectedSources] = useState<string[]>([]);
	const [news, setNews] = useState<NewsItem[]>(initialNews);
	const [daysLoaded, setDaysLoaded] = useState(1);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const {
		isPlaying,
		currentTime,
		duration,
		activeNewsItem,
		controls: {
			start: startPodcast,
			stop: stopPodcast,
			pause: pausePodcast,
			resume: resumePodcast,
			updateTime,
			updateDuration,
		},
	} = usePodcast({ news: initialNews, podcast });

	const loadMore = async () => {
		setIsLoadingMore(true);
		try {
			const nextDaysToLoad = daysLoaded + 1; // Load next 1 days
			const response = await fetch(`/api/news?days=${nextDaysToLoad}`);
			const moreNews = await response.json();
			setNews(moreNews);
			setDaysLoaded(nextDaysToLoad);
		} catch (error) {
			console.error("Failed to load more news:", error);
		}
		setIsLoadingMore(false);
	};

	const filteredNews = news.filter((news) => {
		const matchesSearch =
			news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			news.description.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesTags =
			selectedTags.length === 0 ||
			news.tags.some((tag) => selectedTags.includes(tag));

		const matchesSource =
			selectedSources.length === 0 || selectedSources.includes(news.source);

		return matchesSearch && matchesTags && matchesSource;
	});

	// Sort by date, most recent first
	const sortedNews = [...filteredNews].sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return (
		<TooltipProvider>
			<Toaster />
			<Sonner />

			<div className="flex flex-col md:flex-row md:gap-8">
				<div className="flex-1">
					<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

					<div className="block md:hidden">
						<TrendingSidebar
							news={news}
							onTagSelect={(tag: string) => {
								setSelectedTags((prev) =>
									prev.includes(tag)
										? prev.filter((t) => t !== tag)
										: [...prev, tag],
								);
							}}
							onSourceSelect={(source) => {
								setSelectedSources((prev) =>
									prev.includes(source)
										? prev.filter((s) => s !== source)
										: [...prev, source],
								);
							}}
							selectedTags={selectedTags}
							selectedSources={selectedSources}
						/>
					</div>

					<AgentSummary
						news={sortedNews}
						onAudioStart={startPodcast}
						showListenButton={!!podcast?.audio_url}
					/>

					<NewsFeed
						news={sortedNews}
						activeNewsItem={activeNewsItem}
						isAudioMode={isPlaying}
					/>

					{/* Load More Button */}
					<div className="mt-8 flex justify-center">
						<Button
							variant="outline"
							onClick={loadMore}
							disabled={isLoadingMore}
							className="w-full max-w-xs"
						>
							{isLoadingMore ? (
								<>
									<span className="mr-2">Loading...</span>
								</>
							) : (
								"Load More Stories"
							)}
						</Button>
					</div>
				</div>

				<div className="hidden md:block">
					<TrendingSidebar
						news={news}
						onTagSelect={(tag: string) => {
							setSelectedTags((prev) =>
								prev.includes(tag)
									? prev.filter((t) => t !== tag)
									: [...prev, tag],
							);
						}}
						onSourceSelect={(source) => {
							setSelectedSources((prev) =>
								prev.includes(source)
									? prev.filter((s) => s !== source)
									: [...prev, source],
							);
						}}
						selectedTags={selectedTags}
						selectedSources={selectedSources}
					/>
				</div>
			</div>

			{isPlaying && podcast?.audio_url && (
				<AudioExperience
					audioUrl={podcast.audio_url}
					currentTime={currentTime}
					duration={duration}
					onTimeUpdate={updateTime}
					onDurationChange={updateDuration}
					onPause={pausePodcast}
					onResume={resumePodcast}
					onStop={stopPodcast}
					transcript={podcast}
					activeNewsItem={activeNewsItem}
				/>
			)}
		</TooltipProvider>
	);
}
