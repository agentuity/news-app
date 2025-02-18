import { getRedisClient } from "./redisClient";
import { z } from "zod";
import type { Story } from "./stories";

const PREFIX = "podcast";
const redis = getRedisClient();

// Podcast transcript schema and type
export const PodcastTranscriptSchema = z.object({
	intro: z.string(),
	segments: z.array(
		z.object({
			headline: z.string(),
			content: z.string(),
			transition: z.string().optional(),
		}),
	),
	outro: z.string(),
	stories: z
		.array(
			z.object({
				headline: z.string(),
				summary: z.string(),
				link: z.string(),
				date_published: z.string(),
			}),
		)
		.optional(),
	date_created: z.string(),
	audio_url: z.string().optional(),
});

export type PodcastTranscript = z.infer<typeof PodcastTranscriptSchema>;

type PodcastTranscriptInput = {
	intro: string;
	segments: {
		headline: string;
		content: string;
		transition?: string;
	}[];
	outro: string;
	audio_url?: string;
};

// Helper function to normalize dates to UTC midnight
function normalizeDate(date: Date): Date {
	// Get the local date components
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	// Create a new date at local midnight
	return new Date(year, month, day);
}

function getKey(date: Date): string {
	const normalizedDate = normalizeDate(date);
	const dateStr = normalizedDate.toISOString().split("T")[0];
	return `${PREFIX}:${dateStr}`;
}

async function save(
	transcript: PodcastTranscriptInput,
	stories: Story[],
): Promise<PodcastTranscript> {
	const key = getKey(normalizeDate(new Date()));

	const podcastData: PodcastTranscript = {
		...transcript,
		stories: stories.map((story) => ({
			headline: story.headline,
			summary: story.summary,
			link: story.link,
			date_published: story.date_published || new Date().toISOString(),
		})),
		date_created: new Date().toISOString(),
	};

	await redis.set(key, JSON.stringify(podcastData));

	return podcastData;
}

async function getByDate(date: Date): Promise<PodcastTranscript | null> {
	const key = getKey(normalizeDate(date));
	const data = await redis.get<string>(key);

	if (!data) return null;

	try {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let parsed: z.SafeParseReturnType<any, PodcastTranscript>;
		if (typeof data === "object" && data !== null) {
			parsed = PodcastTranscriptSchema.safeParse(data);
		} else if (typeof data === "string") {
			parsed = PodcastTranscriptSchema.safeParse(JSON.parse(data));
		} else {
			console.error("Unexpected data type:", typeof data);
			return null;
		}
		return parsed.success ? parsed.data : null;
	} catch (error) {
		console.error("Failed to parse podcast data:", error);
		return null;
	}
}

async function getLatest(): Promise<PodcastTranscript | null> {
	return getByDate(new Date());
}

async function getLastNDays(days: number): Promise<PodcastTranscript[]> {
	const keys = [];
	const now = normalizeDate(new Date());

	for (let i = 0; i < days; i++) {
		const date = new Date(now);
		date.setUTCDate(date.getUTCDate() - i);
		keys.push(getKey(date));
	}

	const pipeline = redis.pipeline();
	for (const key of keys) {
		pipeline.get(key);
	}

	const responses = await pipeline.exec();
	if (!responses) {
		console.log("No responses from Redis pipeline");
		return [];
	}

	console.log("Raw Redis responses:", JSON.stringify(responses, null, 2));

	const validResponses = responses.filter((response) => {
		if (response === null) {
			console.log("Response is null");
			return false;
		}
		return true;
	});

	console.log("Valid responses count:", validResponses.length);

	return validResponses
		.map((data) => {
			try {
				console.log(
					`Processing data: ${typeof data === "string" ? data.slice(0, 100) : "non-string"}...`,
				);

				let parsed: unknown;
				try {
					parsed = typeof data === "string" ? JSON.parse(data) : data;
					console.log("Parsed data type:", typeof parsed);
				} catch (parseError) {
					console.error("JSON parse error:", parseError);
					return null;
				}

				if (!parsed || typeof parsed !== "object") {
					console.log("Invalid parsed data:", parsed);
					return null;
				}

				const result = PodcastTranscriptSchema.safeParse(parsed);

				if (!result.success) {
					console.error(
						"Validation error for data:",
						JSON.stringify(result.error.issues, null, 2),
					);
					return null;
				}

				return result.data;
			} catch (error) {
				console.error("Processing error:", error);
				return null;
			}
		})
		.filter(
			(transcript): transcript is PodcastTranscript => transcript !== null,
		)
		.sort(
			(a, b) =>
				new Date(b.date_created).getTime() - new Date(a.date_created).getTime(),
		);
}

async function updateAudioUrl(date: Date, audioUrl: string): Promise<void> {
	const key = getKey(date);
	const transcript = await getByDate(date);

	if (!transcript) {
		throw new Error("No podcast transcript found for the specified date");
	}

	const updatedTranscript: PodcastTranscript = {
		...transcript,
		audio_url: audioUrl,
	};

	await redis.set(key, JSON.stringify(updatedTranscript));
}

export const podcast = {
	save,
	getByDate,
	getLatest,
	getLastNDays,
	updateAudioUrl,
};
