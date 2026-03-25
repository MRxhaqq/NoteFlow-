import { useNotes } from "@/context/NotesContext";
import { getTagColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function TagFilter() {
  const { allTags, selectedTag, setTagFilter } = useNotes();

  if (allTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {allTags.map((tag) => {
        const color = getTagColor(tag);
        const isActive = selectedTag === tag;
        return (
          <button
            key={tag}
            onClick={() => setTagFilter(tag)}
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-mono transition-all",
              isActive
                ? "text-background font-medium"
                : "text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80",
            )}
            style={
              isActive
                ? { backgroundColor: color, color: "#0e0e0e" }
                : { borderLeft: `2px solid ${color}` }
            }
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}
