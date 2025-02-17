import { Bot } from "lucide-react";

export const AgentHeader = () => {
	return (
		<div className="flex items-center gap-2 mb-4">
			<div className="p-2 rounded-full bg-accent/10">
				<Bot className="h-6 w-6 text-accent" />
			</div>
			<h2 className="text-xl font-bold text-accent">
				Agent&apos;s Daily Digest
			</h2>
		</div>
	);
};
