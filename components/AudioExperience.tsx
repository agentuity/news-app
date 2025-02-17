"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { AudioPlayer } from "./AudioPlayer";
import { NewsCard } from "./NewsCard";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import type { NewsItem } from "@/lib/types";
import type { PodcastTranscript } from "@/lib/podcast";

interface AudioExperienceProps {
	audioUrl: string;
	currentTime: number;
	duration: number;
	onTimeUpdate: (time: number) => void;
	onDurationChange: (duration: number) => void;
	onPause: () => void;
	onResume: () => void;
	onStop: () => void;
	transcript: PodcastTranscript;
	activeNewsItem: NewsItem | null;
}

export function AudioExperience({
	audioUrl,
	currentTime,
	duration,
	onTimeUpdate,
	onDurationChange,
	onPause,
	onResume,
	onStop,
	transcript,
	activeNewsItem,
}: AudioExperienceProps) {
	const audioRef = useRef<HTMLAudioElement>(null);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto"
		>
			<div className="container py-8 relative">
				<Button
					variant="outline"
					size="icon"
					className="absolute top-4 right-4 z-20"
					onClick={onStop}
				>
					<X className="h-4 w-4" />
				</Button>

				<div className="max-w-2xl mx-auto">
					<div className="sticky top-8 space-y-8 z-10">
						<div className="bg-card p-6 rounded-lg border shadow-lg">
							<h2 className="text-xl font-bold mb-4">Today's Audio Digest</h2>
							<p className="text-muted-foreground mb-6">{transcript.intro}</p>

							<AudioPlayer
								ref={audioRef}
								audioUrl={audioUrl}
								onTimeUpdate={onTimeUpdate}
								onDurationChange={onDurationChange}
								isPlaying={true}
								onPause={onPause}
								onPlay={onResume}
								onStop={onStop}
								className="border-t pt-4"
							/>
						</div>
					</div>

					<div className="relative mt-8">
						<p className="text-muted-foreground mb-4">News ticker</p>
						<AnimatePresence mode="wait">
							{activeNewsItem && (
								<motion.div
									key={activeNewsItem.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.2 }}
								>
									<NewsCard {...activeNewsItem} />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
