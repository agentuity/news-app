import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils/dates";
import { CalendarIcon, TagIcon } from "lucide-react";
import { useState } from "react";
import { SourceBadge } from "./SourceBadge";
import { Button } from "./ui/button";

function cleanSourceName(source: string): string {
	// Remove protocol and www
	let cleaned = source.replace(/^(https?:\/\/)?(www\.)?/, "");
	// Keep only the domain and TLD
	cleaned = cleaned.split("/")[0];
	return cleaned;
}

interface NewsCardProps {
	id: string;
	title: string;
	description: string;
	date: string;
	source: string;
	sourceType: string;
	tags: string[];
	link: string;
}

export function NewsCard({
	id,
	title,
	description,
	date,
	source,
	sourceType,
	tags = [],
	link,
}: NewsCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Card id={`news-${id}`} className="news-card flex flex-col">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-accent"
					>
						{title}
					</a>
				</CardTitle>
			</CardHeader>

			<CardContent className="flex-1">
				<p className="text-muted-foreground">
					{isExpanded ? description : `${description.slice(0, 280)}...`}
				</p>
				{description.length > 280 && (
					<Button
						variant="link"
						onClick={() => setIsExpanded(!isExpanded)}
						className="mt-2 p-0 h-auto font-medium"
					>
						{isExpanded ? "Show less" : "Read more"}
					</Button>
				)}
			</CardContent>

			<div className="px-6 pb-4">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t pt-4">
					<div className="flex items-center space-x-1 text-sm text-muted-foreground shrink-0">
						<CalendarIcon className="h-4 w-4" />
						<span>{formatDate(date)}</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className="tag cursor-default"
							>
								<TagIcon className="mr-1 h-3 w-3" />
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</div>

			<CardFooter className="flex justify-between items-center pt-4 border-t">
				<SourceBadge source={cleanSourceName(source)} sourceType={sourceType} />
			</CardFooter>
		</Card>
	);
}
