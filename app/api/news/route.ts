import { mapStoriesToNewsItems } from "@/lib/mappers";
import { stories } from "@/lib/stories";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const days = Number.parseInt(searchParams.get("days") || "1", 10);

	try {
		const publishedStories = await stories.getLastNDays(days, {
			publishedOnly: true,
		});
		const newsItems = mapStoriesToNewsItems(publishedStories);
		return NextResponse.json(newsItems);
	} catch (error) {
		console.error("Failed to fetch news:", error);
		return NextResponse.json(
			{ error: "Failed to fetch news" },
			{ status: 500 },
		);
	}
}
