import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container py-8">
				<Header />

				<div className="mt-8 space-y-6">
					{/* Search bar skeleton */}
					<div className="flex gap-4">
						<Skeleton className="h-10 flex-1" />
						<Skeleton className="h-10 w-32" />
					</div>

					{/* News items skeleton */}
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="p-6 rounded-lg border bg-card">
							<Skeleton className="h-6 w-3/4 mb-4" />
							<Skeleton className="h-4 w-full mb-2" />
							<Skeleton className="h-4 w-full mb-2" />
							<Skeleton className="h-4 w-2/3" />
							<div className="flex gap-2 mt-4">
								<Skeleton className="h-6 w-16" />
								<Skeleton className="h-6 w-16" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
