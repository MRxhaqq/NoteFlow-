import { useNotes } from "@/context/NotesContext";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const { searchQuery, setSearch } = useNotes();

  return (
    <div className="relative">
      <Search
        size={13}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-secondary border border-border rounded-md pl-8 pr-8 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-sans"
      />
      {searchQuery && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
