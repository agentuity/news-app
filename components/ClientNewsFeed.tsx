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

interface ClientNewsFeedProps {
	initialNews: NewsItem[];
	podcast?: PodcastTranscript;
}

export function ClientNewsFeed({ initialNews, podcast }: ClientNewsFeedProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedSources, setSelectedSources] = useState<string[]>([]);

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

	const filteredNews = initialNews.filter((news) => {
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
							news={initialNews}
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
				</div>

				<div className="hidden md:block">
					<TrendingSidebar
						news={initialNews}
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
