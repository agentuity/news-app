import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="space-y-2">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-2xl md:text-4xl font-bold font-mono">
					<Link href="/">
						<span className="text-[#F97316]">Agentuity</span>{" "}
						<span className="text-foreground">News</span>
					</Link>
				</h1>

				<div className="flex items-center gap-4">
					<nav>
						<Link
							href="/archive"
							className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
						>
							Archive
						</Link>
					</nav>
					<ThemeToggle />
				</div>
			</div>

			<p className="text-sm pb-5 md:text-base text-muted-foreground">
				Latest updates from the world of AI agents and autonomous systems
			</p>
		</header>
	);
};
