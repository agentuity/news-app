"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlayIcon, PauseIcon, StopCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
	audioUrl?: string;
	onTimeUpdate?: (time: number) => void;
	onDurationChange?: (duration: number) => void;
	isPlaying?: boolean;
	onPlay?: () => void;
	onPause?: () => void;
	onStop?: () => void;
	className?: string;
}

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
	function AudioPlayer(
		{
			audioUrl,
			onTimeUpdate,
			onDurationChange,
			isPlaying = false,
			onPlay,
			onPause,
			onStop,
			className,
		},
		ref,
	) {
		const audioRef = useRef<HTMLAudioElement>(null);
		const progressInterval = useRef<NodeJS.Timeout>();

		useImperativeHandle(ref, () => audioRef.current as HTMLAudioElement);

		useEffect(() => {
			if (!audioRef.current) return;

			if (isPlaying) {
				audioRef.current.play().catch(console.error);
				// Start progress tracking
				progressInterval.current = setInterval(() => {
					if (audioRef.current && onTimeUpdate) {
						onTimeUpdate(audioRef.current.currentTime);
					}
				}, 100);
			} else {
				audioRef.current.pause();
				// Clear progress tracking
				if (progressInterval.current) {
					clearInterval(progressInterval.current);
				}
			}

			return () => {
				if (progressInterval.current) {
					clearInterval(progressInterval.current);
				}
			};
		}, [isPlaying, onTimeUpdate]);

		const handleLoadedMetadata = () => {
			if (audioRef.current && onDurationChange) {
				onDurationChange(audioRef.current.duration);
			}
		};

		const handleSeek = (value: number[]) => {
			if (audioRef.current) {
				audioRef.current.currentTime = value[0];
				if (onTimeUpdate) {
					onTimeUpdate(value[0]);
				}
			}
		};

		const handleStop = () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
				if (onTimeUpdate) {
					onTimeUpdate(0);
				}
				if (onStop) {
					onStop();
				}
			}
		};

		const currentTime = audioRef.current?.currentTime || 0;
		const duration = audioRef.current?.duration || 0;

		return (
			<div className={cn("space-y-2", className)}>
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<audio
					ref={audioRef}
					src={audioUrl}
					onLoadedMetadata={handleLoadedMetadata}
					onEnded={handleStop}
				/>

				<div className="flex items-center gap-2">
					{isPlaying ? (
						<Button
							variant="outline"
							size="icon"
							onClick={onPause}
							className="h-8 w-8"
						>
							<PauseIcon className="h-4 w-4" />
						</Button>
					) : (
						<Button
							variant="outline"
							size="icon"
							onClick={onPlay}
							className="h-8 w-8"
							disabled={!audioUrl}
						>
							<PlayIcon className="h-4 w-4" />
						</Button>
					)}

					<Button
						variant="outline"
						size="icon"
						onClick={handleStop}
						className="h-8 w-8"
						disabled={!audioUrl || (!isPlaying && currentTime === 0)}
					>
						<StopCircleIcon className="h-4 w-4" />
					</Button>

					<div className="flex-1 flex items-center gap-2">
						<span className="text-sm text-muted-foreground w-12">
							{formatTime(currentTime)}
						</span>
						<Slider
							value={[currentTime]}
							max={duration}
							step={0.1}
							onValueChange={handleSeek}
							disabled={!audioUrl}
							className="flex-1"
						/>
						<span className="text-sm text-muted-foreground w-12">
							{formatTime(duration)}
						</span>
					</div>
				</div>
			</div>
		);
	},
);

AudioPlayer.displayName = "AudioPlayer";

function formatTime(seconds: number): string {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
