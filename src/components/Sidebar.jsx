import { useNotes } from "@/context/NotesContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "./SearchBar";
import TagFilter from "./TagFilter";
import NoteCard from "./NoteCard";
import { NoNotes, NoResults } from "./EmptyState";
import { FilePlus } from "lucide-react";

export default function Sidebar({ onNoteSelect }) {
  const { filteredNotes, notes, addNote, searchQuery, selectedTag } =
    useNotes();

  const hasNotes = notes.length > 0;
  const hasResults = filteredNotes.length > 0;
  const isFiltering = searchQuery !== "" || selectedTag !== null;

  return (
    <aside className="w-[280px] shrink-0 border-r border-border flex flex-col h-full bg-background">
      {/* Sidebar header */}
      <div className="px-3 pt-3 pb-2 space-y-2 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Notes
          </span>
          <Button
            onClick={addNote}
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            title="New note (Alt+N)"
          >
            <FilePlus size={15} />
          </Button>
        </div>
        <SearchBar />
        <TagFilter />
      </div>

      {/* Note list */}
      <ScrollArea className="flex-1 px-2 pb-2">
        {!hasNotes ? (
          <NoNotes />
        ) : !hasResults && isFiltering ? (
          <NoResults />
        ) : (
          <div className="space-y-1 pt-1">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onSelect={onNoteSelect} />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Sidebar footer */}
      <div className="px-4 py-2 border-t border-border shrink-0">
        <p className="text-[10px] font-mono text-muted-foreground">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </p>
      </div>
    </aside>
  );
}
