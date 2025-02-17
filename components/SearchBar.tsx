import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
	return (
		<div className="relative mb-8">
			<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Search news..."
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
				className="pl-10"
			/>
		</div>
	);
};
