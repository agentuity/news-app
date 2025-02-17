'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
			<div className="flex items-center gap-2 text-destructive">
				<AlertCircle className="h-5 w-5" />
				<h2 className="text-lg font-semibold">Something went wrong!</h2>
			</div>
			<p className="text-muted-foreground text-sm max-w-[500px] text-center">
				{error.message || 'An error occurred while loading the news feed. Please try again.'}
			</p>
			<Button
				variant="outline"
				onClick={reset}
			>
				Try again
			</Button>
		</div>
	);
} 