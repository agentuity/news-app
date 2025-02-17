import { Bot } from "lucide-react";

export const AgentHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 rounded-full bg-accent/10">
        <Bot className="h-6 w-6 text-accent" />
      </div>
      <h2 className="text-xl font-bold font-mono bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
        Agent&apos;s Daily Digest
      </h2>
    </div>
  );
};