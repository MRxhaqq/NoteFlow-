import { useNotes } from "@/context/NotesContext";
import { Button } from "@/components/ui/button";
import { FilePlus, FileText } from "lucide-react";

export function NoNotes() {
  const { addNote } = useNotes();
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
        <FileText size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">No notes yet</p>
        <p className="text-xs text-muted-foreground font-sans">
          Create your first note to get started
        </p>
      </div>
      <Button
        onClick={addNote}
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs"
      >
        <FilePlus size={13} className="mr-1.5" />
        New note
      </Button>
    </div>
  );
}

export function NoSelection() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
        <FileText size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">No note selected</p>
        <p className="text-xs text-muted-foreground font-sans">
          Select a note from the sidebar or create a new one
        </p>
      </div>
    </div>
  );
}

export function NoResults() {
  const { setSearch, setTagFilter } = useNotes();
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">No results found</p>
        <p className="text-xs text-muted-foreground font-sans">
          Try a different search term or tag
        </p>
      </div>
      <button
        onClick={() => {
          setSearch("");
          setTagFilter(null);
        }}
        className="text-xs text-primary hover:underline font-mono"
      >
        Clear filters
      </button>
    </div>
  );
}
