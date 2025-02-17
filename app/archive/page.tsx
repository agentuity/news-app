import { ArchiveContent } from "@/components/ArchiveContent";
import { Header } from "@/components/Header";
import { podcast } from "@/lib/podcast";
import type { PodcastTranscript } from "@/lib/podcast";

async function getArchivePodcasts(): Promise<PodcastTranscript[]> {
	try {
		// Get the last 30 days of podcasts
		const podcasts = await podcast.getLastNDays(30);
		return podcasts;
	} catch (error) {
		console.error("Failed to fetch archive podcasts:", error);
		return [];
	}
}

export const revalidate = 3600; // Revalidate every hour

export default async function ArchivePage() {
	const archivePodcasts = await getArchivePodcasts();

	return (
		<div className="min-h-screen bg-background">
			<div className="container w-full lg:w-3/4 py-8">
				<Header />
				<ArchiveContent podcasts={archivePodcasts} />
			</div>
		</div>
	);
}
