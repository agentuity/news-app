import { useState, useEffect } from "react";
import type { NewsItem } from "@/lib/types";
import type { PodcastTranscript } from "../podcast";

interface UsePodcastProps {
	news: NewsItem[];
	podcast?: PodcastTranscript;
}

export function usePodcast({ news, podcast }: UsePodcastProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [activeNewsIndex, setActiveNewsIndex] = useState(-1);

	// Calculate which news item should be active based on current time
	useEffect(() => {
		if (!isPlaying || !podcast) return;

		// Assuming each news item gets roughly equal time
		const itemDuration = duration / news.length;
		const currentIndex = Math.floor(currentTime / itemDuration);

		if (currentIndex !== activeNewsIndex && currentIndex < news.length) {
			setActiveNewsIndex(currentIndex);
		}
	}, [currentTime, duration, news.length, isPlaying, podcast, activeNewsIndex]);

	const start = () => {
		setIsPlaying(true);
		setActiveNewsIndex(0);
	};

	const stop = () => {
		setIsPlaying(false);
		setCurrentTime(0);
		setActiveNewsIndex(-1);
	};

	const pause = () => {
		setIsPlaying(false);
	};

	const resume = () => {
		setIsPlaying(true);
	};

	const updateTime = (time: number) => {
		setCurrentTime(time);
	};

	const updateDuration = (newDuration: number) => {
		setDuration(newDuration);
	};

	return {
		isPlaying,
		currentTime,
		duration,
		activeNewsIndex,
		activeNewsItem: activeNewsIndex >= 0 ? news[activeNewsIndex] : null,
		controls: {
			start,
			stop,
			pause,
			resume,
			updateTime,
			updateDuration,
		},
	};
}
