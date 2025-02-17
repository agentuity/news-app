"use client";

import { AudioExperience } from "@/components/AudioExperience";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { usePodcast } from "@/lib/hooks/usePodcast";
import type { PodcastTranscript } from "@/lib/podcast";
import type { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils/dates";
import { PlayIcon } from "lucide-react";
import { useState } from "react";

interface ArchiveContentProps {
	podcasts: PodcastTranscript[];
}

function mapPodcastStoriesToNewsItems(
	stories: PodcastTranscript["stories"] = [],
): NewsItem[] {
	return stories.map((story) => ({
		id: story.link,
		title: story.headline,
		description: story.summary,
		date: story.date_published,
		source: story.link,
		sourceType: "website",
		tags: [],
		link: story.link,
	}));
}

export function ArchiveContent({ podcasts }: ArchiveContentProps) {
	const [activePodcast, setActivePodcast] = useState<PodcastTranscript | null>(
		null,
	);

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
	} = usePodcast({
		news: activePodcast
			? mapPodcastStoriesToNewsItems(activePodcast.stories)
			: [],
		podcast: activePodcast || undefined,
	});

	const handlePlayPodcast = (podcast: PodcastTranscript) => {
		setActivePodcast(podcast);
		startPodcast();
	};

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold mb-8">News Archive</h1>

			<div className="space-y-4">
				{podcasts.map((podcast) => {
					const dateStr = formatDate(podcast.date_created);

					return (
						<Card key={podcast.date_created}>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-xl">{dateStr}</CardTitle>
									{podcast.audio_url && (
										<Button
											variant="outline"
											size="icon"
											onClick={() => handlePlayPodcast(podcast)}
											title="Play audio digest"
										>
											<PlayIcon className="h-4 w-4" />
										</Button>
									)}
								</div>
							</CardHeader>
						</Card>
					);
				})}
			</div>

			{isPlaying && activePodcast?.audio_url && (
				<AudioExperience
					audioUrl={activePodcast.audio_url}
					currentTime={currentTime}
					duration={duration}
					onTimeUpdate={updateTime}
					onDurationChange={updateDuration}
					onPause={pausePodcast}
					onResume={resumePodcast}
					onStop={stopPodcast}
					transcript={activePodcast}
					activeNewsItem={activeNewsItem}
				/>
			)}
		</div>
	);
}
