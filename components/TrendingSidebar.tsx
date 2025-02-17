import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobeIcon, ChevronDown, ChevronUp } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TagIcon, FilterIcon } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

interface TrendingSidebarProps {
	news: NewsItem[];
	onTagSelect: (tag: string) => void;
	onSourceSelect: (source: string) => void;
	selectedTags: string[];
	selectedSources: string[];
}

interface SourceInfo {
	name: string;
	type: string;
}

function cleanSourceName(source: string): string {
	// Remove protocol and www
	let cleaned = source.replace(/^(https?:\/\/)?(www\.)?/, "");
	// Keep only the domain and TLD
	cleaned = cleaned.split("/")[0];
	return cleaned;
}

export function TrendingSidebar({
	news,
	onTagSelect,
	onSourceSelect,
	selectedTags,
	selectedSources,
}: TrendingSidebarProps) {
	const [isTagsExpanded, setIsTagsExpanded] = useState(false);
	const [shouldShowMoreTags, setShouldShowMoreTags] = useState(false);
	const tagsContainerRef = useRef<HTMLDivElement>(null);

	// Get unique tags from all articles
	const uniqueTags = Array.from(
		new Set(news.flatMap((item) => item.tags)),
	).sort();

	// Get unique sources from all articles
	const uniqueSources = Array.from(
		new Map(
			news.map((item) => [
				item.source,
				{
					name: cleanSourceName(item.source),
					type: item.source,
				},
			]),
		).values(),
	).sort((a, b) => a.name.localeCompare(b.name));

	const checkTagsOverflow = useCallback(() => {
		if (tagsContainerRef.current) {
			setShouldShowMoreTags(tagsContainerRef.current.scrollHeight > 400);
		}
	}, []);

	useEffect(() => {
		checkTagsOverflow();
		// Add resize listener to handle window size changes
		window.addEventListener("resize", checkTagsOverflow);
		return () => window.removeEventListener("resize", checkTagsOverflow);
	}, [checkTagsOverflow]);

	const TagsContent = () => (
		<div className="space-y-4">
			<div
				ref={tagsContainerRef}
				className={cn(
					"flex flex-wrap gap-2 transition-all duration-300",
					!isTagsExpanded && "max-h-[400px] overflow-hidden",
				)}
			>
				{uniqueTags.map((tag) => (
					<Badge
						key={tag}
						variant={
							selectedTags.includes(tag.toLowerCase()) ? "default" : "outline"
						}
						className="font-mono cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
						onClick={() => onTagSelect(tag.toLowerCase())}
					>
						#{tag.toLowerCase()}
					</Badge>
				))}
			</div>
			{shouldShowMoreTags && (
				<>
					{!isTagsExpanded && <div className="h-[1px] bg-border mt-2 mb-4" />}
					<Button
						variant="ghost"
						className="w-full hover:bg-accent/10"
						onClick={() => setIsTagsExpanded(!isTagsExpanded)}
					>
						{isTagsExpanded ? (
							<>
								Show Less <ChevronUp className="ml-2 h-4 w-4" />
							</>
						) : (
							<>
								Show More <ChevronDown className="ml-2 h-4 w-4" />
							</>
						)}
					</Button>
				</>
			)}
		</div>
	);

	const SourcesContent = () => (
		<div className="space-y-2">
			{uniqueSources.map(({ name, type }) => (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					key={type}
					className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
						selectedSources.includes(type)
							? "bg-accent text-accent-foreground"
							: "hover:bg-accent/10"
					}`}
					onClick={() => onSourceSelect(type)}
				>
					<GlobeIcon className="h-4 w-4" />
					<span>{name}</span>
				</div>
			))}
		</div>
	);

	return (
		<>
			<div className="md:hidden flex gap-2 mb-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="flex items-center gap-2">
							<TagIcon className="h-4 w-4" />
							Tags
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[280px] p-4 z-10 bg-background border-none">
						<TagsContent />
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="flex items-center gap-2">
							<FilterIcon className="h-4 w-4" />
							Sources
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[280px] p-4 z-10 bg-background border-none">
						<SourcesContent />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="hidden md:block space-y-6 w-80 flex-shrink-0">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg font-mono">Tags</CardTitle>
					</CardHeader>
					<CardContent>
						<TagsContent />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg font-mono">
							Filter by Source
						</CardTitle>
					</CardHeader>
					<CardContent>
						<SourcesContent />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
