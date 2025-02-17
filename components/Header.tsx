import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="flex justify-between md:items-center mb-8">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold font-mono mb-2">
          <span className="text-[#F97316]">
            Agentuity
          </span>{" "}
          <span className="text-foreground">News</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Latest updates from the world of AI agents and autonomous systems
        </p>
      </div>

      <ThemeToggle />
    </header>
  );
};