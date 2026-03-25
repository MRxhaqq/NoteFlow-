import { useNotes } from "@/context/NotesContext";
import { getTagColor, formatDate } from "@/lib/utils";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NoteCard({ note, onSelect }) {
  const { activeNoteId, setActiveNote } = useNotes();
  const isActive = activeNoteId === note.id;
  const firstTag = note.tags[0];
  const accentColor = firstTag ? getTagColor(firstTag) : "hsl(var(--border))";

  const handleClick = () => {
    setActiveNote(note.id);
    onSelect?.();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left px-3 py-3 rounded-md transition-all relative group",
        "border-l-[3px] animate-slide-in-left",
        isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
      )}
      style={{ borderLeftColor: accentColor }}
    >
      {/* Pin indicator */}
      {note.pinned && (
        <Pin
          size={10}
          className="absolute top-2 right-2 text-primary fill-primary"
        />
      )}

      {/* Title */}
      <p
        className={cn(
          "font-serif-italic text-base leading-snug truncate pr-4",
          isActive ? "text-foreground" : "text-foreground/80",
        )}
      >
        {note.title || "Untitled"}
      </p>

      {/* Content preview */}
      <p className="text-xs text-muted-foreground mt-0.5 truncate font-sans leading-relaxed">
        {note.content
          ? note.content
              .replace(/[#*`>\[\]]/g, "")
              .slice(0, 60)
              .trim() + "..."
          : "Empty note"}
      </p>

      {/* Footer: date + tags */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-muted-foreground font-mono">
          {formatDate(note.updatedAt)}
        </span>
        <div className="flex gap-1">
          {note.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-secondary"
              style={{ color: getTagColor(tag) }}
            >
              #{tag}
            </span>
          ))}
          {note.tags.length > 2 && (
            <span className="text-[10px] font-mono text-muted-foreground">
              +{note.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
